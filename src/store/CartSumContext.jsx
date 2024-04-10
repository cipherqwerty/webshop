import React, { createContext, useState } from 'react';

// Step 1: Create a context -> impordin kus kasutusele votan, value = {{ sisu }}
export const CartSumContext = createContext();
// Votan kasutusele labi useContext hooki -> useContext(CartSumContext)

// Step 2: Create a provider component -> impordin index.js sees
// Panen umber componentidele, kus tasemel ma soovin seda contexti kasutada.
export const CartSumContextProvider = ({ children }) => {
	const calculateTotal = () => {
		const item = JSON.parse(localStorage.getItem('cart')) || [];
		let sum = 0;
		item.forEach((cart) => (sum = sum + cart.product.price * cart.quantity));
		return sum.toFixed(2);
	};
	const [cartSum, setCartSum] = useState(calculateTotal());

	return (
		<CartSumContext.Provider value={{ cartSum, setCartSum }}>
			{children}
		</CartSumContext.Provider>
	);
};
