import React, { useState } from 'react';
import Checkbox from 'components/Checkbox';
import ColorButton from 'components/ColorButton';
import NavigationMenu from 'components/NavigationMenu';
import {
	titleStyle,
	popUpPositionStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	finalContainerStyle
} from 'styling/popUp';

const Preferences = (props) => {
	const { setPopUp, preferences, setPreferences } = props;
	const [ screen, setScreen ] = useState('general');
	const [ tempPrefs, setTempPrefs ] = useState(preferences);

	const menus = [
		{ name: 'General', action: () => setScreen('general') },
		{ name: 'Display', action: () => setScreen('display') }
	];

	const popUpStyle = {
		height: '20rem',
		width: '40rem'
	};

	return (
		<div style={popUpPositionStyle}>
			<div style={topContainerStyle}>
				<div style={popUpWindowStyle}>
					<div style={titleStyle}>Preferences</div>
					<div style={subContainerStyle}>
						<NavigationMenu menus={menus} />
					</div>
					<div style={popUpStyle}>
						{screen === 'general' && (
							<div style={subContainerStyle}>
								<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
									<span>Show title splash on startup: </span>
									<Checkbox
										style={{ padding: '1rem' }}
										onChange={() =>
											setTempPrefs({
												...tempPrefs,
												startupSplash: !tempPrefs.startupSplash
											})}
										default={tempPrefs.startupSplash}
									/>
								</div>
							</div>
						)}
					</div>

					<div style={finalContainerStyle}>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<ColorButton
								text={'Apply'}
								color={'green'}
								onClick={() =>
									setTimeout(() => {
										setPreferences(tempPrefs);
										setPopUp(null);
									}, 500)}
							/>
							<ColorButton
								text={'Cancel'}
								color={'darkred'}
								onClick={() => setTimeout(() => setPopUp(null), 500)}
							/>
						</div>
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
