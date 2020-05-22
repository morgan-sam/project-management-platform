import React from 'react';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';

const MainBar = (props) => {
	const topContainerStyle = {
		margin: '1rem 0',
		height: '3rem',
		width: 'auto',
		border: '1px solid black',
		display: 'flex',
		juistfyContent: 'center'
	};

	const generateDropdowns = () => {
		const dropdowns = [ 'File', 'Edit', 'View' ];
		return dropdowns.map((el) => {
			return (
				<Dropdown
					type={'mainNavbarTop'}
					style={{ width: '3rem', zIndex: '10', margin: '0 0.5rem' }}
					label={el}
					onClick={() => null}
					options={[ ...Array(5).keys() ].map((n) => n + 1)}
				/>
			);
		});
	};

	return <div style={topContainerStyle}>{generateDropdowns()}</div>;
};

export default MainBar;
