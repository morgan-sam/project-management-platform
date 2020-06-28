import React, { useState } from 'react';
import MainScreen from 'components/Screens/MainScreen';
import LoginScreen from 'components/Screens/LoginScreen';

const App = () => {
	const [ currentUser, setCurrentUser ] = useState();

	console.log(currentUser);

	if (currentUser === 'manager') return <MainScreen {...{ setCurrentUser }} />;
	else if (currentUser === 'worker') return <MainScreen {...{ setCurrentUser }} />;
	else return <LoginScreen {...{ setCurrentUser }} />;
};

export default App;
