import React, { useState } from 'react';
import Checkbox from 'components/Checkbox';
import NavigationMenu from 'components/NavigationMenu';
import {
	titleStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	errorTextStyle,
	topRowStyle,
	finalContainerStyle
} from 'styling/batchNewTasks';

const Preferences = (props) => {
	const { setPopUp } = props;
	const [ screen, setScreen ] = useState('main');

	const menus = [
		{ name: 'General', action: () => setScreen('general') },
		{ name: 'Display', action: () => setScreen('display') }
	];

	const popUpStyle = {
		height: '30rem',
		width: '40rem'
	};

	return (
		<div
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				zIndex: '10'
			}}
		>
			<div style={topContainerStyle}>
				<div style={popUpWindowStyle}>
					<div style={titleStyle}>Preferences</div>
					<div style={popUpStyle}>
						<NavigationMenu
							style={{
								width: '100%'
							}}
							menus={menus}
						/>
						{screen === 'general' && (
							<div style={subContainerStyle}>
								<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
									<span>Show Startup Title Splash: </span>
									<Checkbox style={{ padding: '1rem' }} onChange={() => console.log('HIDE/SHOW')} />
								</div>
							</div>
						)}
					</div>
					<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
						×
					</button>
				</div>
			</div>
		</div>
	);
};

export default Preferences;
