import React, { useEffect, useState } from 'react';

function Cart() {
	const [item, setItem] = useState(
		JSON.parse(localStorage.getItem('cart')) || []
	);
	const [parcelMachines, setParcelMachines] = useState([]);

	useEffect(() => {
		fetch('https://www.omniva.ee/locations.json')
			.then((res) => res.json())
			.then((body) => setParcelMachines(body));
	}, []);

	const calculateTotal = () => {
		let sum = 0;
		item.forEach((cart) => (sum = sum + cart.product.price * cart.quantity));
		return sum.toFixed(2);
	};

	const removeItem = (e) => {
		item.splice(e, 1);
		setItem(item.slice()); // HTML uuendus
		localStorage.setItem('cart', JSON.stringify(item)); // LocalStorage salvestus
	};

	const clearCart = (e) => {
		item.splice(e);
		setItem(item.slice());
		localStorage.setItem('cart', JSON.stringify(item)); // LocalStorage salvestus
	};

	const averageRating = () => {
		let sum = 0;
		item.forEach((cart) => (sum = sum + cart.product.rating.rate));
		return (sum ?? item.length).toFixed(1);
	};

	const decreaseQuantity = (index) => {
		item[index].quantity = item[index].quantity - 1;

		if (item[index].quantity === 0) {
			item.splice(index, 1);
		}
		setItem(item.slice());
		localStorage.setItem('cart', JSON.stringify(item)); // LocalStorage salvestus
	};

	const increaseQuantity = (index) => {
		item[index].quantity = item[index].quantity + 1;
		setItem(item.slice());
		localStorage.setItem('cart', JSON.stringify(item)); // LocalStorage salvestus
	};

	return (
		<div>
			{item.length > 1 ? <div>Items in cart: {item.length}</div> : undefined}
			{item.length === 0 && <div>The cart is currently empty</div>}
			<button onClick={clearCart}>Tühjenda</button>
			{item.map((cartProduct, e) => (
				<div key={e}>
					<div>
						<img
							style={{ width: '60px' }}
							src={cartProduct.product.image}
							alt='/'
						/>
					</div>
					<div>
						{cartProduct.product.title}
						<div>{cartProduct.product.price} € </div>
						<button onClick={() => decreaseQuantity(e)}>-</button>
						<div>{cartProduct.quantity} tk</div>
						<button onClick={() => increaseQuantity(e)}>+</button>

						<div>
							{cartProduct.product.rating.rate}{' '}
							<span className='fa fa-star checked'></span>
						</div>
					</div>{' '}
					<div>
						{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €
					</div>
					<button onClick={() => removeItem(e)}>Delete</button> <br />
					<br />
				</div>
			))}
			{item.length > 0 && (
				<React.Fragment>
					<div>The total is: {calculateTotal()} €</div>
					<div>Average is: {averageRating()}</div>

					<select>
						{parcelMachines
							.filter((pm) => pm.A0_NAME === 'EE')
							.map((pm) => (
								<option>{pm.NAME}</option>
							))}
					</select>
				</React.Fragment>
			)}
		</div>
	);
}

export default Cart;
