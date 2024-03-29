import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productJSON from '../../data/products.json';
// check ID unique
function EditProduct() {
	const { productId } = useParams();

	const [idUnique, setIdUnique] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [origProduct, setOrigProduct] = useState([]);
	const [product, setProduct] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_PRODUCTS_URL)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data || []);
				setOrigProduct(data || []);
				setLoading(false);
			});
	}, []);

	const result = productJSON.find((result) => result.id === Number(productId));
	const navigate = useNavigate();

	const idRef = useRef();
	const titleRef = useRef();
	const priceRef = useRef();
	const descRef = useRef();
	const catRef = useRef();
	const imgRef = useRef();
	const rateRef = useRef();
	const countRef = useRef();

	const changeProduct = () => {
		const index = productJSON.findIndex(
			(product) => product.id === Number(productId)
		);

		productJSON[index] = {
			id: Number(idRef.current.value),
			title: titleRef.current.value,
			price: Number(priceRef.current.value),
			description: descRef.current.value,
			category: catRef.current.value,
			image: imgRef.current.value,
			rating: {
				rate: Number(rateRef.current.value),
				count: Number(countRef.current.value),
			},
		};
		navigate('/admin/maintain-products');
	};

	const checkIdUnique = () => {
		const index = productJSON.findIndex(
			(product) => product.id === Number(idRef.current.value)
		);
		if (index !== -1) {
			setIdUnique(false);
		} else {
			setIdUnique(true);
		}
	};

	return (
		<div>
			<div>Change product</div> <br />
			<label>ID</label> <br />
			<input
				onChange={checkIdUnique}
				defaultValue={result.id}
				type='number'
				ref={idRef}
				min='1'
			/>{' '}
			<br />
			<label>Title</label> <br />
			<input defaultValue={result.title} type='text' ref={titleRef} /> <br />
			<label>Price</label> <br />
			<input defaultValue={result.price} type='number' ref={priceRef} /> <br />
			<label>Description</label> <br />
			<input defaultValue={result.description} type='text' ref={descRef} />{' '}
			<br />
			<label>Category</label> <br />
			<input defaultValue={result.category} type='text' ref={catRef} /> <br />
			<label>Image</label> <br />
			<input defaultValue={result.image} type='text' ref={imgRef} /> <br />
			<label>Rate</label> <br />
			<input
				defaultValue={result.rating.rate}
				type='number'
				ref={rateRef}
			/>{' '}
			<br />
			<label>Count</label> <br />
			<input
				defaultValue={result.rating.count}
				type='number'
				ref={countRef}
			/>{' '}
			<br />
			<button
				onChange={navigate}
				disabled={idUnique === false}
				onClick={changeProduct}
			>
				Change
			</button>
		</div>
	);
}

export default EditProduct;
