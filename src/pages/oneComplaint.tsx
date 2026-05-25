import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Complaint } from '../types/complaint';
import ComplaintCard from '../components/complaintCard/ComplaintCard';

import '../scss/oneComplaint.scss';

export default function oneComplaint() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [complaint, setComplaint] = useState<Complaint | null>(null);

	useEffect(() => {
		const fetchComplaint = async () => {
			const res = await axios.get(`https://6a035fe72afe8349b4b5252a.mockapi.io/api/complaints/${id}`);
			setComplaint(res.data);
		};
		fetchComplaint();
	}, [id]);

	return (
		<div>
			<button className="one-complaint__back-button" onClick={() => navigate(-1)}>
				Tillbaka
			</button>
			{complaint && <ComplaintCard complaint={complaint} className={'one-complaint__card'} noHover />}
		</div>
	);
}
