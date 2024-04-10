import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

function MaintainPictures() {
	const [pictures, setPictures] = useState([]);

	const srcRef = useRef();
	const altRef = useRef();
	const headerRef = useRef();
	const textRef = useRef();

	useEffect(() => {
		fetch(process.env.REACT_APP_PICTURES_URL)
			.then((res) => res.json())
			.then((data) => setPictures(data || []));
	}, []);

	const addPicture = () => {
		const getPicture = {
			src: srcRef.current.value,
			alt: altRef.current.value,
			header: headerRef.current.value,
			text: textRef.current.value,
		};

		srcRef.current.value = '';
		altRef.current.value = '';
		headerRef.current.value = '';
		textRef.current.value = '';

		pictures.push(getPicture);
		setPictures(pictures.slice());
		fetch(process.env.REACT_APP_PICTURES_URL, {
			method: 'PUT',
			body: JSON.stringify(pictures),
		});
	};

	const deletePicture = (index) => {
		pictures.splice(index, 1);
		setPictures(pictures.slice());
		fetch(process.env.REACT_APP_PICTURES_URL, {
			method: 'PUT',
			body: JSON.stringify(pictures),
		});
	};

	return (
		<div>
			<br />
			<TextField label='URL' variant='outlined' inputRef={srcRef} /> <br />{' '}
			<br />
			<TextField label='ALT' variant='outlined' inputRef={altRef} /> <br />{' '}
			<br />
			<TextField label='HEADER' variant='outlined' inputRef={headerRef} />{' '}
			<br /> <br />
			<TextField
				label='TEXT'
				variant='outlined'
				inputRef={textRef}
			/> <br /> <br />
			<Button variant='outlined' onClick={addPicture}>
				Submit
			</Button>
			{pictures.map((picture, index) => (
				<div key={index}>
					{picture.src} <br />
					{picture.alt} <br />
					{picture.header} <br />
					{picture.text} <br />
					<button onClick={() => deletePicture(index)}>x</button>
				</div>
			))}
		</div>
	);
}

export default MaintainPictures;
