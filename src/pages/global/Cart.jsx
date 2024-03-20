import React, { useEffect, useState } from 'react';

function Cart() {
	const [item, setItem] = useState(
		JSON.parse(localStorage.getItem('cart')) || []
	);
	const [parcelMachines, setParcelMachines] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('EE');

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

	const averageRating = () => {
		let sum = 0;
		item.forEach((cart) => (sum = sum + cart.product.rating.rate));
		return (sum / item.length).toFixed(1);
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

	const parcelSelect = (e) => {
		setSelectedCountry(e);
	};

	return (
		<div>
			{item.length > 1 ? <div>Items in cart: {item.length}</div> : undefined}
			{item.length === 0 && <div>The cart is currently empty</div>}
			<button onClick={clearCart}>Empty Cart</button>
			{item.map((cartProduct, index) => (
				<div key={index}>
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
						<button onClick={() => decreaseQuantity(index)}>-</button>
						<div>{cartProduct.quantity} pcs</div>
						<button onClick={() => increaseQuantity(index)}>+</button>

						<div>
							{cartProduct.product.rating.rate}{' '}
							<span className='fa fa-star checked'></span>
						</div>
					</div>
					<div>
						{(cartProduct.product.price * cartProduct.quantity).toFixed(2)} €
					</div>
					<button onClick={() => removeItem(index)}>Delete</button> <br />
					<br />
				</div>
			))}
			{item.length > 0 && (
				<>
					<div>Total: {calculateTotal()} €</div>
					<div>Average Rating: {averageRating()}</div> <br />
					<div>
						<button onClick={() => parcelSelect('EE')}>EE</button>
						<button onClick={() => parcelSelect('LV')}>LV</button>
						<button onClick={() => parcelSelect('LT')}>LT</button>
					</div>
					<select>
						{parcelMachines
							.filter((pm) => pm.A0_NAME === selectedCountry)
							.map((pm, index) => (
								<option key={index}>{pm.NAME}</option>
							))}
					</select>
				</>
			)}
		</div>
	);
}

export default Cart;
