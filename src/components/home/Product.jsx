import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../../css/HomePage.module.css';
import { toast } from 'react-toastify';
import { CartSumContext } from '../../store/CartSumContext';

function Product(props) {
	const { cartSum, setCartSum } = useContext(CartSumContext);
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
		setCartSum(+cartSum + addedProduct.price);
	};

	return (
		<div className={styles.product}>
			<img style={{ width: '100px' }} src={props.product.image} alt='' />
			<div className='product-title'>{props.product.title}</div>
			<div>{props.product.price}</div>
			<div>{props.product.rating.rate}</div>
			<Button
				variant='outlined'
				disabled={props.product.active === false}
				onClick={() => addToCart(props.product)}
			>
				Add To Cart
			</Button>
			<Link to={'/product/' + props.product.id}>
				<Button variant='contained' style={{ marginLeft: '10px' }}>
					Inspect
				</Button>
			</Link>
		</div>
	);
}

export default Product;
