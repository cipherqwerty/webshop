import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Button as BB } from 'react-bootstrap';
// name: "", latitude: 23, longitude: 12, openTime: ""
function MaintainShops() {
	const [shop, setShops] = useState([]);
	const nameRef = useRef();
	const latitudeRef = useRef();
	const longitudeRef = useRef();
	const openTimeRef = useRef();
	useEffect(() => {
		fetch(process.env.REACT_APP_SHOPS_URL)
			.then((res) => res.json())
			.then((data) => setShops(data || []));
	}, []);

	const addNewShop = () => {
		const addShop = {
			name: nameRef.current.value,
			latitude: Number(latitudeRef.current.value),
			longitude: Number(longitudeRef.current.value),
			openHours: Number(openTimeRef.current.value),
		};
		shop.push(addShop);
		setShops(shop.slice());
		fetch(process.env.REACT_APP_SHOPS_URL, {
			method: 'PUT',
			body: JSON.stringify(shop),
		});
	};

	const delNewShop = (e) => {
		shop.splice(e, 1);
		setShops(shop.slice());
		fetch(process.env.REACT_APP_SHOPS_URL, {
			method: 'PUT',
			body: JSON.stringify(shop),
		});
	};
	return (
		<div>
			<br />
			<TextField
				label='Name'
				variant='outlined'
				inputRef={nameRef}
			></TextField>{' '}
			<br /> <br />
			<TextField
				label='Latitude'
				variant='outlined'
				inputRef={latitudeRef}
			></TextField>{' '}
			<br /> <br />
			<TextField
				label='Longitude'
				variant='outlined'
				inputRef={longitudeRef}
			></TextField>{' '}
			<br /> <br />
			<TextField
				label='Open Hours'
				variant='outlined'
				inputRef={openTimeRef}
			></TextField>
			<br /> <br />
			<Button variant='outlined' onClick={addNewShop}>
				Add
			</Button>
			{shop.map((shops, e) => (
				<div key={e}>
					<div>
						{shops.name}
						{shops.latitude}
						{shops.longitude}
						{shops.openHours}

						<BB variant='danger' onClick={() => delNewShop(e)}>
							x
						</BB>
					</div>
				</div>
			))}
		</div>
	);
}

export default MaintainShops;
