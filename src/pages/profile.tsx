import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Complaint } from '../types/complaint';
import ComplaintCard from '../components/complaintCard/ComplaintCard';
import './profile.scss';

export default function Profile() {
	const [complaints, setComplaints] = useState<Complaint[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
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

	const handleEdit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!editingComplaint) return;

		await axios.put(
			`https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints/${editingComplaint.id}`,
			editingComplaint
		);

		setComplaints((prev) => prev.map((c) => (c.id === editingComplaint.id ? editingComplaint : c)));
		setEditingComplaint(null);
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
						<div key={complaint.id}>
							<ComplaintCard
								complaint={complaint}
								noHover
								className="profile-card"
								onEdit={() => setEditingComplaint(complaint)}
							/>
							{editingComplaint?.id === complaint.id && (
								<div className="profile__modal">
									<form onSubmit={handleEdit}>
										<input
											value={editingComplaint.title}
											onChange={(e) =>
												setEditingComplaint({
													...editingComplaint,
													title: e.target.value
												})
											}
										/>
										<textarea
											value={editingComplaint.description}
											onChange={(e) =>
												setEditingComplaint({
													...editingComplaint,
													description: e.target.value
												})
											}
										/>
										<button type="submit">Spara</button>
										<button type="button" onClick={() => setEditingComplaint(null)}>
											Avbryt
										</button>
									</form>
								</div>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
}
