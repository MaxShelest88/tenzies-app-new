import React from 'react';
import moduleName from './NameInput.module.css';

const NameInput = (props) => {
	return (
		<input
			className={moduleName.nameInp}
			placeholder="Введите имя"
			onChange={(e)=>props.handleChange(e)}
		/>
	);
};

export default NameInput;