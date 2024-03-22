import { useState } from 'react';
import productsJSON from '../../data/products.json';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function HomePage() {
	const [product, setProduct] = useState(productsJSON);

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
		toast.success('Added ' + addedProduct.title + ' to cart');

		// Kui ei ole ostukorvis olemas, siis pushin (lisan l6ppu kogusega: 1)
	};

	const sortAZ = () => {
		product.sort((a, b) => a.title.localeCompare(b.title));
		setProduct(product.slice());
	};

	const sortPriceAsc = () => {
		product.sort((a, b) => a.price - b.price);
		setProduct(product.slice());
	};

	const sortPriceDesc = () => {
		product.sort((a, b) => b.price - a.price);
		setProduct(product.slice());
	};

	const sortRate = () => {
		product.sort((a, b) => b.rating.rate - a.rating.rate);
		setProduct(product.slice());
	};

	const filterMens = () => {
		const result = product.filter((product) =>
			product.category.includes("men's clothing")
		);
		setProduct(result); // EI TOOTA
	};

	const filterJewelry = () => {
		const result = product.filter((product) => product.category === 'jewelery');
		setProduct(result); // EI TOOTA
	};
	// 	const filterCategory = (category) => {
	// 		const filteredProducts = productsJSON.filter(product =>
	// 				product.category.toLowerCase() === category.toLowerCase()
	// 		);
	// 		setProducts(filteredProducts);
	// };

	// const sortBasedRating = () => {
	// 	productsJSON.sort()
	// };

	// sorteerimine reitingu alusel

	// filtreerimine -> kategooria alusel

	// lisage toast, mis ütleb toote nimetuse, mis läheb ostukorvi

	return (
		<div>
			<div>
				<button onClick={sortAZ}>Sort A-Z</button>
				<button onClick={sortPriceAsc}>Lower € first</button>
				<button onClick={sortPriceDesc}>Higher € first</button>
				<button onClick={sortRate}>Rating</button>
			</div>

			<button onClick={filterMens}>men's clothing</button>
			<button onClick={filterJewelry}>jewelery</button>
			<button>electronics</button>
			<button>women's clothing</button>
			{product.map((product, id) => (
				<div key={product.id}>
					<img style={{ width: '100px' }} src={product.image} alt='' />
					<div>{product.title}</div>
					<div>{product.price}</div>
					<div>{product.rating.rate}</div>
					<button onClick={() => addToCart(product)}>Add To Cart</button>
					<Link to={'/product/' + id}>
						<button style={{ marginLeft: '10px' }}>Inspect</button>
					</Link>
				</div>
			))}
			<ToastContainer />
		</div>
	);
}

export default HomePage;
