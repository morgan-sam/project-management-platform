import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'config/auth';
import app from 'config/firebase';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	if (app.auth().isSignInWithEmailLink(window.location.href)) {
		const email = window.prompt('Please provide your email for confirmation');
		app.auth().signInWithEmailLink(email, window.location.href);
	}
	return (
		<Route
			{...rest}
			render={(routeProps) => (currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={'/login'} />)}
		/>
	);
};

export default PrivateRoute;
