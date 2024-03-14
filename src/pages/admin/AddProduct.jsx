import React, { useRef } from 'react';
import productsJSON from '../../data/products.json';

function AddProduct() {
	const idRef = useRef();
	const titleRef = useRef();
	const priceRef = useRef();
	const descRef = useRef();
	const catRef = useRef();
	const imgRef = useRef();
	const rateRef = useRef();
	const countRef = useRef();

	const addNewItem = () => {
		productsJSON.push({
			id: Number(idRef.current.value),
			title: titleRef.current.value,
			price: Number(priceRef.current.value),
			description: descRef.current.value,
			category: catRef.current.value,
			image: imgRef.current.value,
			rating: {
				rate: rateRef.current.value,
				count: countRef.current.value,
			},
		});
	};
	return (
		<div>
			<div>Add Product</div>
			<label> ID</label> <br />
			<input type='text' ref={idRef} /> <br />
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
			<button onClick={addNewItem}>Submit</button>
		</div>
	);
}

export default AddProduct;
