import React from 'react';
import { Button } from '@mui/material';

function SortButtons(props) {
	const sortAZ = () => {
		props.product.sort((a, b) => a.title.localeCompare(b.title));
		props.setProduct(props.product.slice());
	};

	const sortPriceAsc = () => {
		props.product.sort((a, b) => a.price - b.price);
		props.setProduct(props.product.slice());
	};

	const sortPriceDesc = () => {
		props.product.sort((a, b) => b.price - a.price);
		props.setProduct(props.product.slice());
	};

	const sortRate = () => {
		props.product.sort((a, b) => b.rating.rate - a.rating.rate);
		props.setProduct(props.product.slice());
	};
	return (
		<div>
			<Button variant='outlined' onClick={sortAZ}>
				Sort A-Z
			</Button>
			<Button variant='outlined' onClick={sortPriceAsc}>
				Lower € first
			</Button>
			<Button variant='outlined' onClick={sortPriceDesc}>
				Higher € first
			</Button>
			<Button variant='outlined' onClick={sortRate}>
				Rating
			</Button>
		</div>
	);
}

export default SortButtons;
