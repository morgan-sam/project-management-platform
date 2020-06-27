import React, { useState } from 'react';
import MainScreen from 'components/MainScreen';
import InputFormWithLabel from 'components/InputFormWithLabel';
import ColorButton from 'components/ColorButton';
import { accountScreenStyle, accountEntryBox, loginButton } from 'styling/accountEntry';

const App = () => {
	const [ currentUser, setCurrentUser ] = useState();

	if (currentUser === 'manager') return <MainScreen />;
	if (currentUser === 'worker') return <MainScreen />;
	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox} className="accountEntryBox">
				<InputFormWithLabel label={'Username'} />
				<InputFormWithLabel label={'Password'} />
				<ColorButton style={loginButton} color={'rgb(173, 216, 230)'} text={'Log In'} onClick={() => null}>
					Log In
				</ColorButton>
			</div>
		</div>
	);
};

export default App;
