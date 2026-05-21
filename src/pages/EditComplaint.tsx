import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditComplaint() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(true);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const fetchComplaint = async () => {
			const res = await axios.get(`https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints/${id}`);
			setFormData({
				title: res.data.title,
				description: res.data.description,
				imageUrl: res.data.imageUrl
			});
			setLoading(false);
		};
		fetchComplaint();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		let imageUrl = formData.imageUrl;

		if (imageFile) {
			const imageData = new FormData();
			imageData.append('image', imageFile);
			const uploadRes = await axios.post('http://localhost:3001/upload', imageData);
			imageUrl = uploadRes.data.imageUrl;
		}

		await axios.put(`https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints/${id}`, {
			...formData,
			imageUrl
		});

		navigate('/profile');
	};

	if (loading) return <p>Laddar...</p>;

	return (
		<section className="submit-complaint">
			<form className="submit-complaint__form" onSubmit={handleSubmit}>
				<h1>Redigera ett klagomål</h1>
				<label htmlFor="title">Rubrik</label>
				<input id="title" type="text" name="title" value={formData.title} onChange={handleChange} />
				<label htmlFor="description">Beskrivning</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
				<label htmlFor="image" className="submit-complaint__file-label">
					Byt bild
				</label>
				<input
					id="image"
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="submit-complaint__file-input"
					onChange={(e) => setImageFile(e.target.files?.[0] || null)}
				/>
				{formData.imageUrl && (
					<img src={formData.imageUrl} alt="Nuvarande bild" style={{ width: '200px' }} />
				)}
				<button type="submit">Spara</button>
				<button type="button" onClick={() => navigate('/profile')}>
					Avbryt
				</button>
			</form>
		</section>
	);
}
