import productsJSON from '../../data/products.json';
import { Link } from 'react-router-dom';

function HomePage() {
	const addToCart = (addedProduct) => {
		const cart = JSON.parse(localStorage.getItem('cart')) || [];

		const index = cart.findIndex((cart) => cart.product.id === addedProduct.id);

		if (index >= 0) {
			cart[index].quantity = cart[index].quantity + 1;

			// Kui on ostukorvis olemas, suurendan kogust
		} else {
			cart.push({ product: addedProduct, quantity: 1 });
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		// Kui ei ole ostukorvis olemas, siis pushin (lisan l6ppu kogusega: 1)
	};

	// const sortBasedRating = () => {
	// 	productsJSON.sort()
	// };

	// sorteerimine A-Z, Z-A, hind kasvavalt, hind kahanevalt
	// sorteerimine reitingu alusel

	// filtreerimine -> kategooria alusel

	// lisage toast, mis ütleb toote nimetuse, mis läheb ostukorvi

	return (
		<div>
			<button>men's clothing</button>
			<button>jewelery</button>
			<button>electronics</button>
			<button>women's clothing</button>
			{productsJSON.map((product, id) => (
				<div key={product.id}>
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
