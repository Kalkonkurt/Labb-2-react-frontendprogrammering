import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Complaint } from '../types/complaint';
import './allComplaints.scss';
import ComplaintCard from '../components/complaintCard/ComplaintCard';

export default function AllComplaints() {
	const [complaints, setComplaints] = useState<Complaint[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchComplaints = async () => {
			try {
				const res = await axios.get('https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints');
				setComplaints(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setTimeout(() => setLoading(false), 750);
			}
		};
		fetchComplaints();
	}, []);

	if (loading) return <p className="all-complaints__loading">Laddar klagomål...</p>;

	return (
		<>
			<div className="all-complaints">
				<h1>Alla inskickade klagomål</h1>
				{loading ? (
					<p className="all-complaints__loading">Laddar klagomål...</p>
				) : (
					complaints.map((complaint) => (
						<ComplaintCard
							key={complaint.id}
							complaint={complaint}
							onClick={() => navigate(`/complaints/${complaint.id}`)}
						/>
					))
				)}
			</div>
		</>
	);
}
