import React, { useContext, useState } from 'react';
import style from '../../css/Cart.module.css';
import Star from '@mui/icons-material/Star';
import LocalShipping from '@mui/icons-material/LocalShipping';
import ParcelMachines from '../../components/cart/ParcelMachines';
import Payment from '../../components/cart/Payment';
import { CartSumContext } from '../../store/CartSumContext';

function Cart() {
	const [item, setItem] = useState(
		JSON.parse(localStorage.getItem('cart')) || []
	);

	const { setCartSum } = useContext(CartSumContext);

	const calculateTotal = () => {
		let sum = 0;
		item.forEach((cart) => (sum = sum + cart.product.price * cart.quantity));
		return sum.toFixed(2);
	};

	const removeItem = (index) => {
		item.splice(index, 1);
		setItem(item.slice());
		localStorage.setItem('cart', JSON.stringify(item));
		setCartSum(calculateTotal());
	};

	const clearCart = () => {
		setItem([]);
		localStorage.removeItem('cart');
		setCartSum(0);
	};

	const decreaseQuantity = (index) => {
		const updatedItems = [...item];
		updatedItems[index].quantity -= 1;
		if (updatedItems[index].quantity === 0) {
			updatedItems.splice(index, 1);
		}
		setItem(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
		setCartSum(calculateTotal());
	};

	const increaseQuantity = (index) => {
		const updatedItems = [...item];
		updatedItems[index].quantity += 1;
		setItem(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
		setCartSum(calculateTotal());
	};

	return (
		<div>
			<div className={style.cart_top}>
				{item.length > 1 ? <div>Items in cart: {item.length}</div> : undefined}
				{item.length === 0 && <div>The cart is currently empty</div>}

				<img
					className={style.button}
					src='/empty-cart.png'
					alt=''
					onClick={clearCart}
				/>
			</div>

			{item.map((cartProduct, index) => (
				<div className={style.product} key={index}>
					<img
						className={style.image}
						style={{ width: '60px' }}
						src={cartProduct.product.image}
						alt='/'
					/>
					<div className={style.title}>{cartProduct.product.title}</div>
					<div className={style.rate}>
						{cartProduct.product.rating.rate}
						<Star />
					</div>
					<div className={style.quantity}>
						<img
							className={style.button}
							onClick={() => decreaseQuantity(index)}
							src='/minus.png'
							alt=''
						/>
						<div>{cartProduct.quantity} pcs</div>
						<img
							src='/plus.png'
							alt=''
							className={style.button}
							onClick={() => increaseQuantity(index)}
						/>
					</div>

					<div className={style.total}>
						{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €
					</div>
					<img
						src='/remove.png'
						alt=''
						className={style.button}
						onClick={() => removeItem(index)}
					/>
				</div>
			))}

			<div className={style.cart_bottom}>
				{item.length > 0 && (
					<>
						<div>Total: {calculateTotal()} €</div>
						<ParcelMachines />
						<Payment sum={calculateTotal()} />
						<LocalShipping />
					</>
				)}
			</div>
		</div>
	);
}

export default Cart;
