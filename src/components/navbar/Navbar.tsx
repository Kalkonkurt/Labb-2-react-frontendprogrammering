import { Link } from 'react-router-dom';
import './navbar.scss';

export default function navbar() {
	return (
		<div className="navbar">
			<Link to="/" className="navbar__logo">
				Felkollen
			</Link>
			<nav className="navbar__links">
				<Link to="/" className="navbar__link">
					Hem
				</Link>
				<Link to="/allComplaints" className="navbar__link">
					Se alla klagomål
				</Link>
				<Link to="/submit" className="navbar__link">
					Rapportera fel
				</Link>
				<Link to="/profile" className="navbar__link">
					Profil
				</Link>
			</nav>
		</div>
	);
}
