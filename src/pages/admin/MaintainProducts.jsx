import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function MaintainProducts() {
	const searchRef = useRef();

	const [product, setProduct] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [origProduct, setOrigProduct] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_PRODUCTS_URL)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data || []);
				setOrigProduct(data || []);
				setLoading(false);
			});
	}, []);

	const removeX = (productId) => {
		const index = origProduct.findIndex((product) => product.id === productId);
		origProduct.splice(index, 1);
		// setProduct(origProduct.slice());
		searchFromProducts();
		fetch(process.env.REACT_APP_PRODUCTS_URL, {
			method: 'PUT',
			body: JSON.stringify(origProduct),
		});
	};

	const sortFirstLetter = () => {
		product.sort((a, b) => a.title.localeCompare(b.title));
		setProduct(product.slice());
	};

	const searchFromProducts = () => {
		const result = origProduct.filter(
			(el) =>
				el.title
					.toLowerCase()
					.includes(searchRef.current.value.toLowerCase()) ||
				el.description
					.toLowerCase()
					.includes(searchRef.current.value.toLowerCase()) ||
				el.id === Number(searchRef.current.value)
		);
		setProduct(result);
	};

	const changeActive = (i) => {
		origProduct[i].active = !origProduct[i].active;
		setProduct(origProduct.slice());
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
			<button onClick={sortFirstLetter}>Sort Title</button>
			<input ref={searchRef} onChange={searchFromProducts} type='text' />
			<span>{product.length} tk</span>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Category</th>
						<th>Image</th>
						<th>Rate</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					{product.map((toode, index) => (
						<tr
							key={toode.id}
							className={toode.active ? 'active' : 'in-active'}
						>
							<td onClick={() => changeActive(index)}>{toode.id}</td>
							<td onClick={() => changeActive(index)}>{toode.title}</td>
							<td onClick={() => changeActive(index)}>{toode.price}</td>
							<td
								onClick={() => changeActive(index)}
								style={{ width: '800px' }}
							>
								{toode.description}
							</td>
							<td onClick={() => changeActive(index)}>{toode.category}</td>
							<td onClick={() => changeActive(index)}>
								<img style={{ height: '60px' }} src={toode.image} alt='/' />
							</td>
							<td onClick={() => changeActive(index)}>{toode.rating.rate}</td>
							<td onClick={() => changeActive(index)}>{toode.rating.count}</td>
							<td>
								<button onClick={() => removeX(toode.id)}>x</button>
								<Link to={'/admin/edit-product/' + toode.id}>
									<button>Edit</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MaintainProducts;
