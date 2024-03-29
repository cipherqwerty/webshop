import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';

function AddProduct() {
	const [message, setMessage] = useState('');
	const [idUnique, setIdUnique] = useState(false);
	const [categories, setCategories] = useState([]);
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

	useEffect(() => {
		fetch(process.env.REACT_APP_CATEGORIES_URL)
			.then((res) => res.json())
			.then((data) => setCategories(data || []));
	}, []);

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

		origProduct.push({
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
		fetch(process.env.REACT_APP_PRODUCTS_URL, {
			method: 'PUT',
			body: JSON.stringify(origProduct),
		});
	};

	const checkIdUnique = () => {
		const index = origProduct.findIndex(
			(product) => product.id === Number(idRef.current.value)
		);
		if (index === -1) {
			setIdUnique(true);
		} else {
			setIdUnique(false);
		}
	};

	if (isLoading) {
		return (
			<div>
				<Spinner />
				Loading...
			</div>
		);
	}

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
			<select ref={catRef}>
				{categories.map((category) => (
					<option>{category.name}</option>
				))}
			</select>{' '}
			<br />
			<label>Image</label> <br />
			<input type='url' alt='submit' ref={imgRef} /> <br />
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
