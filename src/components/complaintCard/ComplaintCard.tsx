import type { Complaint } from '../../types/complaint';
import './complaintCard.scss';

interface Props {
	complaint: Complaint;
	onClick?: () => void;
	className?: string;
	noHover?: boolean;
	onEdit?: () => void;
}

export default function ComplaintCard({ complaint, onClick, className, noHover, onEdit }: Props) {
	return (
		<div
			className={`complaint-card ${className ?? ''} ${noHover ? 'complaint-card--no-hover' : ''}`}
			onClick={onClick}
		>
			<h2>{complaint.title}</h2>
			<p>{complaint.description}</p>
			<img src={complaint.imageUrl} alt={complaint.title} />
			{onEdit && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						onEdit();
					}}
				>
					Redigera
				</button>
			)}
		</div>
	);
}
