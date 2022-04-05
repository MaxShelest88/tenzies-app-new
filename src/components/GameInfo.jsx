import React from 'react';

const GameInfo = (props) => {
    return (
        <div className="game__info">
            <h3>
                Имя: {props.name}
            </h3>
            <h3 className="rolls-number">
                Броски: {props.rolls}
            </h3>
            <h3>
                Время: {props.time}
            </h3>
        </div>
    )
};

export default GameInfo;