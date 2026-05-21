import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Complaint } from '../types/complaint';
import ComplaintCard from '../components/complaintCard/ComplaintCard';
import './profile.scss';

export default function Profile() {
	const [complaints, setComplaints] = useState<Complaint[]>([]);
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem('userId');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchComplaints = async () => {
			try {
				const res = await axios.get('https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints');
				const userComplaints = res.data.filter((c: Complaint) => c.userId === userId);
				setComplaints(userComplaints);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchComplaints();
	}, []);

	const handleDelete = async (id: string) => {
		await axios.delete(`https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints/${id}`);
		setComplaints((prev) => prev.filter((c) => c.id !== id));
	};

	if (loading) return <p>Laddar...</p>;

	return (
		<div className="profile">
			<h1>Mina klagomål</h1>
			<div className="profile__cards">
				{complaints.length === 0 ? (
					<p>Du har inga klagomål än.</p>
				) : (
					complaints.map((complaint) => (
						<div key={complaint.id} className="profile__card-wrapper">
							<ComplaintCard complaint={complaint} noHover className="profile-card" />
							<button
								className="profile__edit-button"
								onClick={() => navigate(`/edit/${complaint.id}`)}
							>
								Redigera
							</button>
							<button
								className="profile__delete-button bg-danger"
								onClick={() => handleDelete(complaint.id)}
							>
								Radera
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
}
