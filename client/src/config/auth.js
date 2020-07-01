import React, { useState, useEffect } from 'react';
import app from 'config/firebase';
import LoadingScreen from 'components/Screens/LoadingScreen';
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

	if (loading) return <LoadingScreen />;
	else return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
