import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
function SingleProduct() {
	const [isLoading, setLoading] = useState(true);
	const [origProduct, setOrigProduct] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_PRODUCTS_URL)
			.then((res) => res.json())
			.then((data) => {
				setOrigProduct(data || []);
				setLoading(false);
			});
	}, []);

	const { productId } = useParams();

	const result = origProduct.find(
		(product) => product.id === Number(productId)
	);

	if (isLoading) {
		return (
			<div>
				<Spinner />
				Loading...
			</div>
		);
	}

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
