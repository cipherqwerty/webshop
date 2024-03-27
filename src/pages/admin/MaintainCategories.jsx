import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Button as BB } from 'react-bootstrap';

function MaintainCategories() {
	const [categories, setCategories] = useState([]);
	const categoryRef = useRef();
	useEffect(() => {
		fetch(process.env.REACT_APP_CATEGORIES_URL)
			.then((res) => res.json())
			.then((data) => setCategories(data || []));
	}, []);

	const add = () => {
		const newCategory = { name: categoryRef.current.value };
		categories.push(newCategory);
		setCategories(categories.slice());
		fetch(process.env.REACT_APP_CATEGORIES_URL, {
			method: 'PUT',
			body: JSON.stringify(categories),
		});
	};

	const del = (index) => {
		categories.splice(index, 1);
		setCategories(categories.slice());
		fetch(process.env.REACT_APP_CATEGORIES_URL, {
			method: 'PUT',
			body: JSON.stringify(categories),
		});
	};
	return (
		<div>
			<TextField label='Category' inputRef={categoryRef}></TextField> <br />
			<Button variant='contained' onClick={add}>
				Sisesta
			</Button>
			{categories.map((category, index) => (
				<div key={index}>
					<span>{category.name}</span>
					<BB variant='danger' onClick={() => del(index)}>
						x
					</BB>
				</div>
			))}
		</div>
	);
}

export default MaintainCategories;
