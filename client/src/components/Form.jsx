import React from 'react';
import { capitalizeFirstLetter } from 'processing/utility';

const Form = (props) => {
	const { submitLabel, onSubmit, inputs } = props;
	return (
		<form onSubmit={onSubmit}>
			{inputs.map((el, i) => (
				<label key={i}>
					<span>{capitalizeFirstLetter(el)}</span>
					<input name={el} type={el} placeholder={capitalizeFirstLetter(el)} />
				</label>
			))}
			<button type="submit">{submitLabel}</button>
		</form>
	);
};

export default Form;
