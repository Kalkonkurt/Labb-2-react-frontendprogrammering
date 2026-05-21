import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Complaint } from '../types/complaint';
import ComplaintCard from '../components/complaintCard/ComplaintCard';
import './profile.scss';

export default function Profile() {
	const [complaints, setComplaints] = useState<Complaint[]>([]);
	const [loading, setLoading] = useState(true);
	const userId = localStorage.getItem('userId');

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

	if (loading) return <p>Laddar...</p>;

	return (
		<div className="profile">
			<h1>Mina klagomål</h1>
			<div className="profile__cards">
				{complaints.length === 0 ? (
					<p>Du har inga klagomål än.</p>
				) : (
					complaints.map((complaint) => (
						<ComplaintCard key={complaint.id} complaint={complaint} noHover />
					))
				)}
			</div>
		</div>
	);
}
