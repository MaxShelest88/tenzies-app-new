import React from 'react';
import classes from './GameButton.module.css'

const GameButton = ({children, ...props}) => {
	return (
		<button
			className={classes.gameBtn}
			onClick={props.rollDice}
		>
			{children}
		</button>
	);
};

export default GameButton;