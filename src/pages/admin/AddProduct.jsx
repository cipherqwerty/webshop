import React, { useRef, useState } from 'react';
import productsJSON from '../../data/products.json';

function AddProduct() {
	const [message, setMessage] = useState('');
	const [idUnique, setIdUnique] = useState(false);
	const idRef = useRef();
	const titleRef = useRef();
	const priceRef = useRef();
	const descRef = useRef();
	const catRef = useRef();
	const imgRef = useRef();
	const rateRef = useRef();
	const countRef = useRef();

	const addNewItem = () => {
		if (titleRef.current.value === '') {
			return setMessage('Cannat add product with empty title');
		}

		if (priceRef.current.value === '') {
			return setMessage('Canat add product with empty price');
		}

		productsJSON.push({
			id: Number(idRef.current.value),
			title: titleRef.current.value,
			price: Number(priceRef.current.value),
			description: descRef.current.value,
			category: catRef.current.value,
			image: imgRef.current.value,
			rating: {
				rate: 0,
				count: 0,
			},
		});
	};

	const checkIdUnique = () => {
		const index = productsJSON.findIndex(
			(product) => product.id === Number(idRef.current.value)
		);
		if (index === -1) {
			setIdUnique(true);
		} else {
			setIdUnique(false);
		}
	};

	return (
		<div>
			<div>Add Product</div>
			<div>{message}</div>
			<label> ID</label> <br />
			<input onChange={checkIdUnique} type='number' ref={idRef} /> <br />
			<label htmlFor=''> Title</label> <br />
			<input type='text' ref={titleRef} /> <br />
			<label> Price</label> <br />
			<input type='number' ref={priceRef} /> <br />
			<label>Description</label> <br />
			<input type='text' ref={descRef} /> <br />
			<label>Category</label> <br />
			<input type='text' ref={catRef} /> <br />
			<label>Image</label> <br />
			<input type='file' alt='submit' ref={imgRef} /> <br />
			<label>Rate</label> <br />
			<input type='number' ref={rateRef} /> <br />
			<label>Count</label> <br />
			<input type='number' ref={countRef} /> <br />
			<button disabled={idUnique === false} onClick={addNewItem}>
				Submit
			</button>
		</div>
	);
}

export default AddProduct;
