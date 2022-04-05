import React from 'react';

const GameStats = (props) => {
    return (
        <div className="game__stats">
            <h2>Tenzies</h2>
            <div className="game__about">Бросай, пока все кубики не станут одинаковыми. Нажимай на каждый кубик, что бы запомнить текущее значение между бросками.</div>
            <div className="game__best">
                Лучший игрок :
            </div>
            <div>
                имя: {props.name} время: {props.time} броски: {props.rolls}
            </div>
        </div>
    )
};

export default GameStats;