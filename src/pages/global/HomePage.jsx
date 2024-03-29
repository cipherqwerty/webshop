import { useEffect, useState } from 'react';
// import productsJSON from '../../data/products.json';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/HomePage.css';
import { Button } from '@mui/material';
import { Spinner } from 'react-bootstrap';
function HomePage() {
	const [product, setProduct] = useState([]);
	const [categories, setCategories] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [origProduct, setOrigProduct] = useState([]);
	useEffect(() => {
		fetch(process.env.REACT_APP_CATEGORIES_URL)
			.then((res) => res.json())
			.then((data) => setCategories(data || []));

		fetch(process.env.REACT_APP_PRODUCTS_URL)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data || []);
				setOrigProduct(data || []);
				setLoading(false);
			});
	}, []);

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

	if (isLoading) {
		return (
			<div>
				<Spinner />
				Loading...
			</div>
		);
	}

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

	const filterCategories = (categories) => {
		const result = origProduct.filter(
			(product) => product.category === categories
		);
		setProduct(result);
	};

	return (
		<div>
			<div>{product.length} tk</div>
			{categories.map((category) => (
				<Button
					key={category.name}
					onClick={() => filterCategories(category.name)}
					variant='contained'
				>
					{category.name}
				</Button>
			))}
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
			<div className='products'>
				{product.map((product) => (
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
						<Link to={'/product/' + product.id}>
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
