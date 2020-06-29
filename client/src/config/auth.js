import React, { useState, useEffect } from 'react';
import app from 'config/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [ currentUser, setCurrentUser ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	useEffect(
		() =>
			app.auth().onAuthStateChanged((user) => {
				setCurrentUser(user);
				setLoading(false);
			}),
		[]
	);
	if (loading) return <div>Loading...</div>;
	else return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
