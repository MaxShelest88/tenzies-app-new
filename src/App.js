import { useEffect, useState } from "react";
import Die from "./components/Die";
import "./styles/App.css"
import { nanoid } from 'nanoid'
import GameButton from "./components/UI/button/GameButton";
import Confetti from 'react-confetti'
import NameInput from "./components/UI/input/NameInput";
import GameStats from "./components/GameStats";
import GameInfo from "./components/GameInfo";

function App() {

	const [dice, setDice] = useState(generateAllNewDice())

	const [tenzies, setTenzies] = useState(false)

	const [user, setUser] = useState({
		name: '',
		rolls: 0,
		time: 0
	})

	const [bestUser, setBestUser] = useState(
		JSON.parse(localStorage.getItem("user")) || {name: '',
			rolls: 0,
			time: 0}
	)

	const [intervalId, setIntervalId] = useState(0);


	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const firstDieValue = dice[0].value
		const allDiceSameValue = dice.every(die => die.value === firstDieValue)
		if (allHeld && allDiceSameValue) {
			setTenzies(true)
			console.log('You Win!');
			if (bestUser < user.time && bestUser) {
				localStorage.setItem("user", JSON.stringify(user))
			} else {
				localStorage.setItem("user", JSON.stringify(user))
			}
			if (intervalId) {
				clearInterval(intervalId);
				setIntervalId(0);
			}
		}
	}, [dice, user, bestUser, intervalId])

	function generateRandomNum(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function generateNewDie() {
		return {
			value: generateRandomNum(1, 6),
			isHeld: false,
			id: nanoid()
		}
	}


	function generateAllNewDice() {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie())
		}
		return newDice
	}

	function getBestUser() {
		setBestUser(
			JSON.parse(localStorage.getItem("user"))
		)
	}

	function startTimer() {
		const newIntervalId = setInterval(() => {
				setUser(oldUser => {
					return { ...oldUser, time: oldUser.time + 1 }
				})
		}, 1000);
		setIntervalId(newIntervalId)
	}


	function rollDice() {
		if (tenzies) {
			setDice(generateAllNewDice)
			setTenzies(false)
			setUser(oldUser => { return { ...oldUser, time: 0, rolls: 0 } })
			getBestUser()
		} else {
			setDice(oldDice => oldDice.map(die => {
				return die.isHeld ? die : generateNewDie()
			}))
			setUser(prevUser => {
				return { ...prevUser, rolls: prevUser.rolls + 1 }
			})
			if (!intervalId) {
				startTimer()
			}
		}
	}

	function holdDie(id) {
		setDice(oldDice => oldDice.map(die => {
			return id === die.id ? { ...die, isHeld: !die.isHeld } : die
		}))
		if (!intervalId) {
			startTimer()
		}
	}

	function handleChange(event) {
		setUser(oldUser => {
			return {...oldUser, name:event.target.value}
		})
	}

	const diceElements = dice.map(die => <Die
		value={die.value}
		key={die.id}
		isHeld={die.isHeld}
		holdDie={() => holdDie(die.id)}
		time={user}
	/>)

	return (
		<main>
			{tenzies && <Confetti />}
			<div className="game">
				<div className="game__block">
					<div className="game__container">
						<NameInput
							value={user.name}
							handleChange={handleChange}
						/>
						<div className="die-container">
							{diceElements}
						</div>
						<GameButton rollDice={rollDice}>
							{tenzies ? "Новая игра" : "Бросок"}
						</GameButton>
						<GameInfo name={user.name} rolls={user.rolls} time={user.time}/>
						</div>
					<GameStats name={bestUser.name} rolls={bestUser.rolls} time={bestUser.time}/>
				</div>

			</div>
		</main>
	);
}

export default App;
