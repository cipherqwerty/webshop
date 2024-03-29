import React, { useState } from 'react';
import '../../css/Cart.css';
import Star from '@mui/icons-material/Star';
import LocalShipping from '@mui/icons-material/LocalShipping';
import ParcelMachines from '../../components/ParcelMachines';

function Cart() {
	const [item, setItem] = useState(
		JSON.parse(localStorage.getItem('cart')) || []
	);

	const calculateTotal = () => {
		let sum = 0;
		item.forEach((cart) => (sum = sum + cart.product.price * cart.quantity));
		return sum.toFixed(2);
	};

	const removeItem = (index) => {
		const updatedItems = [...item];
		updatedItems.splice(index, 1);
		setItem(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
	};

	const clearCart = () => {
		setItem([]);
		localStorage.removeItem('cart');
	};

	const decreaseQuantity = (index) => {
		const updatedItems = [...item];
		updatedItems[index].quantity -= 1;
		if (updatedItems[index].quantity === 0) {
			updatedItems.splice(index, 1);
		}
		setItem(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
	};

	const increaseQuantity = (index) => {
		const updatedItems = [...item];
		updatedItems[index].quantity += 1;
		setItem(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
	};

	return (
		<div>
			<div className='cart-top'>
				{item.length > 1 ? <div>Items in cart: {item.length}</div> : undefined}
				{item.length === 0 && <div>The cart is currently empty</div>}
				{item.length > 1 ? (
					<img
						className='button'
						src='/empty-cart.png'
						alt=''
						onClick={clearCart}
					/>
				) : undefined}
			</div>

			{item.map((cartProduct, index) => (
				<div className='product' key={index}>
					<img
						className='image'
						style={{ width: '60px' }}
						src={cartProduct.product.image}
						alt='/'
					/>
					<div className='title'>{cartProduct.product.title}</div>
					<div className='rate'>
						{cartProduct.product.rating.rate}
						<Star />
					</div>
					<div className='quantity'>
						<img
							className='button'
							onClick={() => decreaseQuantity(index)}
							src='/minus.png'
							alt=''
						/>
						<div>{cartProduct.quantity} pcs</div>
						<img
							src='/plus.png'
							alt=''
							className='button'
							onClick={() => increaseQuantity(index)}
						/>
					</div>

					<div className='total'>
						{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €
					</div>
					<img
						src='/remove.png'
						alt=''
						className='button'
						onClick={() => removeItem(index)}
					/>
				</div>
			))}

			<div className='cart-bottom'>
				{item.length > 0 && (
					<>
						<div>Total: {calculateTotal()} €</div>
						<ParcelMachines />
						<LocalShipping />
					</>
				)}
			</div>
		</div>
	);
}

export default Cart;
