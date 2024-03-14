import React, { useState } from 'react';
import cartJSON from '../../data/cart.json';

function Cart() {
	const [Item, setItem] = useState(cartJSON);

	const removeItem = (e) => {
		cartJSON.splice(e, 1);
		setItem(cartJSON.slice());
	};

	const clearCart = (e) => {
		cartJSON.splice(e);
		setItem(cartJSON.slice());
	};

	const addMore = (product) => {
		cartJSON.push(product);
		setItem(cartJSON.slice());
	};
	return (
		<div>
			<div>Items in cart: {cartJSON.length}</div>
			<button onClick={clearCart}>Tühjenda</button>
			{cartJSON.map((product, e) => (
				<div key={e}>
					<div>
						<img style={{ width: '60px' }} src={product.image} alt='/' />
					</div>
					<div>
						{product.title} {product.price}
					</div>{' '}
					<button onClick={() => removeItem(product)}>Delete</button> <br />
					<button onClick={() => addMore(product)}>Add more</button> <br />
					<br />
				</div>
			))}
		</div>
	);
}

export default Cart;
