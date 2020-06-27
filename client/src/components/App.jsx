import React, { useState } from 'react';
import MainScreen from 'components/MainScreen';
import InputFormWithLabel from 'components/InputFormWithLabel';
import ColorButton from 'components/ColorButton';
import { accountScreenStyle, accountEntryBox } from 'styling/accountEntry';

const App = () => {
	const [ currentUser, setCurrentUser ] = useState();

	if (currentUser === 'manager') return <MainScreen />;
	if (currentUser === 'worker') return <MainScreen />;
	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox} className="accountEntryBox">
				<InputFormWithLabel label={'Email'} />
				<InputFormWithLabel label={'Password'} />
				<ColorButton
					style={{
						fontSize: '1.8rem',
						fontWeight: '600',
						padding: '0.25rem 0.5rem',
						letterSpacing: '0.04em'
					}}
					color={'#aaa'}
					text={'Log In'}
					onClick={() => null}
				>
					Log In
				</ColorButton>
			</div>
		</div>
	);
};

export default App;
