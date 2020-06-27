import React from 'react';
import InputFormWithLabel from 'components/InputFormWithLabel';
import ColorButton from 'components/ColorButton';
import { accountScreenStyle, accountEntryBox, loginButton } from 'styling/accountEntry';

const LoginScreen = (props) => {
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

export default LoginScreen;
