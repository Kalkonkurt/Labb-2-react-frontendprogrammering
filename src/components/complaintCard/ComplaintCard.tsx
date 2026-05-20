import type { Complaint } from '../../types/complaint';
import './complaintCard.scss';

interface Props {
	complaint: Complaint;
	onClick?: () => void;
	className?: string;
	noHover?: boolean;
}

export default function ComplaintCard({ complaint, onClick, className, noHover }: Props) {
	return (
		<div
			className={`complaint-card ${className ?? ''} ${noHover ? 'complaint-card--no-hover' : ''}`}
			onClick={onClick}
		>
			<h2>{complaint.title}</h2>
			<p>{complaint.description}</p>
			<img src={complaint.imageUrl} alt={complaint.title} />
		</div>
	);
}
