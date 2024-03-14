import productsJSON from '../../data/products.json';
import cartJSON from '../../data/cart.json';
import { Link } from 'react-router-dom';
function HomePage() {
	const addToCart = (product) => {
		cartJSON.push(product);
	};

	return (
		<div>
			{productsJSON.map((product, id) => (
				<div key={id}>
					<img style={{ width: '100px' }} src={product.image} alt='' />
					<div>{product.title}</div>
					<div>{product.price}</div>
					<button onClick={() => addToCart(product)}>Add To Cart</button>
					<Link to={'/product/' + id}>
						<button style={{ marginLeft: '10px' }}>Inspect</button>
					</Link>
				</div>
			))}
		</div>
	);
}

export default HomePage;
