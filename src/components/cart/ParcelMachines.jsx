import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
function ParcelMachines() {
	const [parcelMachines, setParcelMachines] = useState([]);
	const [originalPM, setOriginalPM] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('EE');
	const searchRef = useRef();

	useEffect(() => {
		fetch('https://www.omniva.ee/locations.json')
			.then((res) => res.json())
			.then((body) => {
				setParcelMachines(body);
				setOriginalPM(body);
			});
	}, []);

	const parcelSelect = (e) => {
		setSelectedCountry(e);
	};

	const searchPM = () => {
		const result = originalPM.filter((e) =>
			e.NAME.toLowerCase().includes(searchRef.current.value.toLowerCase())
		);
		setParcelMachines(result);
	};
	return (
		<div>
			<div>
				<Button variant='outlined' onClick={() => parcelSelect('EE')}>
					EE
				</Button>
				<Button variant='outlined' onClick={() => parcelSelect('LV')}>
					LV
				</Button>
				<Button variant='outlined' onClick={() => parcelSelect('LT')}>
					LT
				</Button>
			</div>
			<input ref={searchRef} type='text' onChange={searchPM} />
			<span>
				{parcelMachines.filter((pm) => pm.A0_NAME === selectedCountry).length}{' '}
				pcs
			</span>
			{parcelMachines.length === 0 ? (
				<div>Loading...</div>
			) : (
				<select>
					{parcelMachines
						.filter((pm) => pm.A0_NAME === selectedCountry)
						.map((pm, index) => (
							<option key={index}>{pm.NAME}</option>
						))}
				</select>
			)}
		</div>
	);
}

export default ParcelMachines;
