import React from 'react';
import productJSON from '../../data/products.json';
import { useParams } from 'react-router-dom';
function SingleProduct() {
	const { index } = useParams();

	const result = productJSON[index];

	if (result === undefined) {
		return <div>Product is not available</div>;
	}

	return (
		<div>
			<img style={{ width: '100px' }} src={result.image} alt='' /> <br />
			<span style={{ fontWeight: 'bold' }}>ID -</span> {result.id} <br />
			<span style={{ fontWeight: 'bold' }}>Title -</span> {result.title} <br />
			<span style={{ fontWeight: 'bold' }}>Price -</span> {result.price} €{' '}
			<br />
			<span style={{ fontWeight: 'bold' }}>Description -</span>{' '}
			{result.description} <br />
			<span style={{ fontWeight: 'bold' }}>Category -</span> {result.category}{' '}
			<br />
			<span style={{ fontWeight: 'bold' }}>Rate - </span>
			{result.rating.rate} <br />
			<span style={{ fontWeight: 'bold' }}>Count -</span> {result.rating.count}{' '}
			<br />
		</div>
	);
}

export default SingleProduct;
