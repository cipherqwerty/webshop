import { useEffect, useState } from 'react';
import Map from '../../components/Map';
import { Button } from '@mui/material';
import { Spinner } from 'react-bootstrap';

function Shops() {
	const [coordinaates, setCoordinates] = useState({
		lngLat: [59.4378, 24.7574],
		zoom: 11,
	});

	const [shops, setShops] = useState([]);
	const [isLoading, setLoading] = useState(true);

	// uef = votta poed andmebaasist

	useEffect(() => {
		fetch(process.env.REACT_APP_SHOPS_URL)
			.then((res) => res.json())
			.then((data) => {
				setShops(data || []);
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<div>
				<Spinner /> Loading...
			</div>
		);
	}
	return (
		<div>
			<Button
				onClick={() => setCoordinates({ lngLat: [58.9208, 25.5005], zoom: 7 })}
			>
				Kõik poed
			</Button>
			<Button
				onClick={() => setCoordinates({ lngLat: [59.4378, 24.7574], zoom: 11 })}
			>
				Kõik Tallinna poed
			</Button>
			<br />
			{shops.map((shop) => (
				<span>
					<Button>{shop.name}</Button>
				</span>
			))}

			<Map mapCoordinaates={coordinaates} />
		</div>
	);
}

export default Shops;
