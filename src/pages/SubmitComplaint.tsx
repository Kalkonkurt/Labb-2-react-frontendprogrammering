import { useState, useRef } from 'react';
import axios from 'axios';
import './submitComplaint.scss';

export default function SubmitComplaint() {
	const [formData, setFormData] = useState({ title: '', description: '' });
	const [imageFile, setImageFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const resetForm = () => {
		setFormData({ title: '', description: '' });
		setImageFile(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const imageData = new FormData();
			imageData.append('image', imageFile!);
			const uploadRes = await axios.post('http://localhost:3001/upload', imageData);
			const imageUrl = uploadRes.data.imageUrl;

			let userId = localStorage.getItem('userId');
			if (!userId) {
				userId = crypto.randomUUID();
				localStorage.setItem('userId', userId);
			}
			await axios.post('https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints', {
				title: formData.title,
				description: formData.description,
				imageUrl,
				userId,
				createdAt: new Date().toISOString()
			});

			resetForm();
			window.alert('Klagomålet skickades in!');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section className="submit-complaint">
			<form className="submit-complaint__form" onSubmit={handleSubmit}>
				<h1>Skicka in ditt klagomål</h1>
				<label htmlFor="title">Rubrik</label>
				<input
					id="title"
					type="text"
					name="title"
					value={formData.title}
					onChange={(e) => handleChange(e)}
					placeholder="Rubrik"
				/>

				<label htmlFor="description">Beskrivning</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={(e) => handleChange(e)}
					placeholder="Beskriv ditt ärende"
				/>

				<label htmlFor="image" className="submit-complaint__file-label">Välj bild</label>
				<input
					id="image"
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="submit-complaint__file-input"
					onChange={(e) => setImageFile(e.target.files?.[0] || null)}
				/>
				<button type="submit">Skicka</button>
			</form>
		</section>
	);
}
