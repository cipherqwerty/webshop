import { useRef, useState } from 'react';
import productJSON from '../../data/products.json';
import { Link } from 'react-router-dom';
function MaintainProducts() {
	const [product, setProduct] = useState(productJSON);

	const searchRef = useRef();
	const removeX = (e) => {
		productJSON.splice(e, 1);
		setProduct(productJSON.slice());
	};

	const sortFirstLetter = () => {
		product.sort((a, b) => a.title.localeCompare(b.title));
		setProduct(product.slice());
	};

	const searchFromProducts = () => {
		const result = product.filter((el) =>
			el.title.includes(searchRef.current.value)
		);
		setProduct(result);
	};

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
					{product.map((toode, id) => (
						<tr key={id}>
							<td>{toode.id}</td>
							<td>{toode.title}</td>
							<td>{toode.price}</td>
							<td style={{ width: '800px' }}>{toode.description}</td>
							<td>{toode.category}</td>
							<td>
								<img style={{ height: '60px' }} src={toode.image} alt='/' />
							</td>
							<td>{toode.rating.rate}</td>
							<td>{toode.rating.count}</td>
							<td>
								<button onClick={() => removeX(id)}>x</button>
								<Link to={'/admin/edit-product/' + id}>
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
