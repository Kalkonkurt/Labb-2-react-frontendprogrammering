import { Link } from 'react-router-dom';
import '../scss/home.scss';

export default function Home() {
	return (
		<div className="home">
			<h1>Felkollen, en sida där du kan felanmäla och klaga på vad du vill</h1>
			<Link to="/submit">Rapportera fel</Link>
		</div>
	);
}
