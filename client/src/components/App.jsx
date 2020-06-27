import React, { useState } from 'react';
import MainScreen from 'components/Screens/MainScreen';
import LoginScreen from 'components/Screens/LoginScreen';

const App = () => {
	const [ currentUser, setCurrentUser ] = useState();

	if (currentUser === 'manager') return <MainScreen />;
	else if (currentUser === 'worker') return <MainScreen />;
	else return <LoginScreen />;
};

export default App;
