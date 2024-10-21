"use client";
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState([]);

	const setLoginUser = (newUser) => {
		setUser(newUser);
	};

	return (
		<UserContext.Provider value={{ user, setLoginUser }}>
			{children}
		</UserContext.Provider>
	);
};
