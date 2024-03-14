import { useState } from 'react';
import productJSON from '../../data/products.json';

function MaintainProducts() {
	const [product, setProduct] = useState(productJSON);
	const removeX = (e) => {
		productJSON.splice(e, 1);
		setProduct(productJSON.slice());
	};

	const sortFirstLetter = () => {
		product.sort((a, b) => a.title.localeCompare(b.title));
		setProduct(product.slice());
	};

	return (
		<div>
			<button onClick={sortFirstLetter}>Sort Title</button>
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
					{productJSON.map((toode, id) => (
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
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MaintainProducts;
