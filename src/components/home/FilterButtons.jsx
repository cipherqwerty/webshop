import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Spinner } from 'react-bootstrap';

function FilterButtons(props) {
	const [categories, setCategories] = useState([]); // 20 - mitu tk kokku

	useEffect(() => {
		fetch(process.env.REACT_APP_CATEGORIES_URL)
			.then((res) => res.json())
			.then((data) => setCategories(data || []));

		fetch(process.env.REACT_APP_PRODUCTS_URL)
			.then((res) => res.json())
			.then((data) => {
				props.setProduct(data.slice(0, 3) || []);
				props.setOrigProduct(data || []);
				props.setCatProduct(data || []);
				props.setLoading(false);
				// const totalPages = Math.ceil(data.length / 3);
				// const pagesArray = Array.from(
				// 	{ length: totalPages },
				// 	(_, index) => index + 1
				// );
				const totalPages = Math.ceil(data.length / 3);
				const pagesArray = [];
				for (let i = 1; i <= totalPages; i++) {
					pagesArray.push(i);
				}
				props.setPageNumbers(pagesArray);
			});
	}, []);

	if (props.isLoading) {
		return (
			<div>
				<Spinner />
				Loading...
			</div>
		);
	}

	const filterCategories = (categories) => {
		let result;
		if (categories === 'all') {
			result = props.origProduct;
		} else {
			result = props.origProduct.filter(
				(product) => product.category === categories
			);
		}
		props.setCatProduct(result); // 6 toodet
		props.setProduct(result.slice(0, 3)); // sellest 6st esimesed 3 displayb DOMIs
		const totalPages = Math.ceil(result.length / 3);
		const pagesArray = [];
		for (let i = 1; i <= totalPages; i++) {
			pagesArray.push(i);
		}
		props.setPageNumbers(pagesArray);

		props.setActivePage(1);
	};
	console.log(categories);
	return (
		<div>
			<Button onClick={() => filterCategories('all')} variant='contained'>
				All
			</Button>
			{categories.map((category) => (
				<Button
					key={category.name}
					onClick={() => filterCategories(category.name)}
					variant='contained'
				>
					{category.name}
				</Button>
			))}
		</div>
	);
}
// FILTER KODUS
export default FilterButtons;
