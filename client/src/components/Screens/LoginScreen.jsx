import React from 'react';
import InputFormWithLabel from 'components/InputFormWithLabel';
import ColorButton from 'components/ColorButton';
import { loginTitle, accountScreenStyle, accountEntryBox, loginButton } from 'styling/accountEntry';

const LoginScreen = (props) => {
	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox} className="accountEntryBox">
				<div style={loginTitle}>Log In</div>
				<InputFormWithLabel label={'Username'} />
				<InputFormWithLabel label={'Password'} />
				<ColorButton style={loginButton} color={'rgb(173, 216, 230)'} text={'Log In'} onClick={() => null}>
					Log In
				</ColorButton>
			</div>
		</div>
	);
};

export default LoginScreen;
