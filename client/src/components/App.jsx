import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainScreen from 'components/Screens/MainScreen';
import LoginScreen from 'components/Screens/LoginScreen';
import { AuthProvider } from 'config/auth';
import PrivateRoute from 'routes/PrivateRoute';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<PrivateRoute exact path="/" component={MainScreen} />
					<Route exact path="/login" component={LoginScreen} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
