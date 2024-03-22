import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import productJSON from '../../data/products.json';
// check ID unique
function EditProduct() {
	const { index } = useParams();

	const [idUnique, setIdUnique] = useState(true);
	const result = productJSON[index];

	const idRef = useRef();
	const titleRef = useRef();
	const priceRef = useRef();
	const descRef = useRef();
	const catRef = useRef();
	const imgRef = useRef();
	const rateRef = useRef();
	const countRef = useRef();

	const changeProduct = () => {
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
			<button disabled={idUnique === false} onClick={changeProduct}>
				Change
			</button>
		</div>
	);
}

export default EditProduct;
