import { useState } from 'react';
import productsJSON from '../../data/products.json';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/HomePage.css';
import { Button } from '@mui/material';
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
		const result = product.filter(
			(product) => product.category === "men's clothing"
		);
		setProduct(result); // EI TOOTA
	};

	const filterJewelry = () => {
		const result = product.filter((product) => product.category === 'jewelery');
		setProduct(result); // EI TOOTA
	};

	return (
		<div>
			<div>
				<Button variant='outlined' onClick={sortAZ}>
					Sort A-Z
				</Button>
				<Button variant='outlined' onClick={sortPriceAsc}>
					Lower € first
				</Button>
				<Button variant='outlined' onClick={sortPriceDesc}>
					Higher € first
				</Button>
				<Button variant='outlined' onClick={sortRate}>
					Rating
				</Button>
			</div>

			<div>
				<Button onClick={filterMens}>men's clothing</Button>
				<Button onClick={filterJewelry}>jewelery</Button>
			</div>
			<div className='products'>
				{product.map((product, id) => (
					<div className='home-product' key={product.id}>
						<img style={{ width: '100px' }} src={product.image} alt='' />
						<div className='product-title'>{product.title}</div>
						<div>{product.price}</div>
						<div>{product.rating.rate}</div>
						<Button
							variant='outlined'
							disabled={product.active === false}
							onClick={() => addToCart(product)}
						>
							Add To Cart
						</Button>
						<Link to={'/product/' + id}>
							<Button variant='contained' style={{ marginLeft: '10px' }}>
								Inspect
							</Button>
						</Link>
					</div>
				))}
			</div>

			<ToastContainer />
		</div>
	);
}

export default HomePage;
