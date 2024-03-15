import { useState } from 'react';
import { useEffect } from 'react';

function Supplier() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((response) => response.json())
			.then((json) => setProducts(json));
	}, []);

	if (products.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div>{products.length} tk</div>
			{products.map((product) => (
				<div key={product.id}>
					<img style={{ width: '100px' }} src={product.image} alt='' />
					{product.title}
					{product.price}
				</div>
			))}
		</div>
	);
}

export default Supplier;
