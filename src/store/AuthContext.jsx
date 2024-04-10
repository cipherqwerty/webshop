import React, { createContext, useState } from 'react';

// Step 1: Create a context
export const AuthContext = createContext();

// Step 2: Create a provider component
export const AuthContextProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(true);

	return (
		<AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};
