import React from 'react';
import "../styles/Die.css"

const Die = (props) => {
	return (
		<div
			className={`die${props.isHeld ? " held" : ""}`}
			onClick={props.holdDie}
		>
			<div className='die__num'>{ props.value}</div>
		</div>
	);
};

export default Die;