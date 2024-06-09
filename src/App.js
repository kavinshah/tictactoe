import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

const SINGLE_PLAYER = "singleplayer";
//const MULTI_PLAYER = "multiplayer";

function Game(props){
	const [turn, setTurn] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [cellStates, setCellStates] = useState(Array(9).fill(null));
	const [history, setHistory] = useState([]);
	const [winner, setWinner] = useState(null);
	let mode = useParams().mode;
	let playerName1 = useParams().playername1;
	let playerName2 = useParams().playername2;
	
	if(mode === SINGLE_PLAYER){
		playerName2 = "Computer";
	}

	const checkWinner = (states) => {
		let winner=null;
		//console.log('checking winner');
		//check horizontal squares
		if(states[0]===states[1] && states[1]===states[2])
		{
			winner=states[0];
		}
		else if(states[3]===states[4] && states[4]===states[5])
		{
			winner=states[3];
		}
		else if(states[6]===states[7] && states[7]===states[8])
		{
			winner=states[6];
		}
		//check vertical squares
		else if(states[0]===states[3] && states[3]===states[6])
		{
			winner=states[0];
		}
		else if(states[1]===states[4] && states[4]===states[7])
		{
			winner=states[1];
		}
		else if(states[2]===states[5] && states[5]===states[8])
		{
			winner=states[2];
		}
		//check diagonal squares
		else if(states[0]===states[4] && states[4]===states[8])
		{
			winner=states[0];
		}
		else if(states[2]===states[4] && states[4]===states[6])
		{
			winner=states[2];
		}
		return winner;
	}
	
	const handleCellClick = (event)=> {
		let id=event.target.id-1;
		let currentTurn = turn?'X':'O';
		let nextTurn = turn?'O':'X';
		
		//console.log('id:', id);
		if(cellStates[id] || winner){
			return;
		}
		cellStates[id] = currentTurn;
		history.push([...cellStates]);
		setTurn((turn)=>!turn);
		setWinner(checkWinner(cellStates));
		setCurrentStep((currentStep)=>currentStep-1);
		
		if(mode===SINGLE_PLAYER && history.length<9){
			do{
				id=Math.floor((Math.random()*9));
			} while(cellStates[id]);
			
			//console.log('id:', id);
			if(cellStates[id] || checkWinner(cellStates)){
				return;
			}
			cellStates[id] = nextTurn;
			history.push([...cellStates]);
			setTurn((turn)=>!turn);
			setWinner(checkWinner(cellStates));
			setCurrentStep((currentStep)=>currentStep-1);
		}
	}
	
	const handleMoveClick = (event) => {
		let index=parseInt(event.target.value);
		//console.log("index", index);
		//console.log("history:", history);
		
		if(index>=9 || index===history.length)
			return;
		
		if(mode===SINGLE_PLAYER && index%2===1)
		{
			//next step is computer
			let id;
			do{
				id=Math.floor((Math.random()*9));
			} while(history[index-1][id]);
			
			//console.log("next step:", id);
			
			for(let i=0; i<9; i++)
			{
				cellStates[i]=history[index-1][i];
				history[index][i] = history[index-1][i];
			}
			
			cellStates[id]='O';
			history[index][id] = 'O';
			setHistory(history.slice(0, index+1));
			setTurn(true);
			setWinner(checkWinner(cellStates));
			setCurrentStep(index+1);
		} else {
			//initialise cell states manually so that winner can be checked concurrently.
			for(let i=0; i<9; i++)
				cellStates[i] = index>0 ? history[index-1][i] : null;
			setHistory(history.slice(0, index));
			setTurn(index%2===0);
			setWinner(checkWinner(cellStates));
			setCurrentStep(index);
		}
	}
	
	const gameStatus=()=> {
		if(winner != null){
			return 'Winner: '.concat(winner==='X'?playerName1:playerName2);
		} else{
			return 'Next Player: '.concat(turn?playerName1:playerName2);
		}
	};
	
	return (
		<>
		<h1>Welcome, {playerName1.concat(mode===SINGLE_PLAYER?"":" and ".concat(playerName2))}!</h1>
		<div className='game'>
			<p>{gameStatus()}</p>
			<Board cells={cellStates} handleCellClick={handleCellClick} />
			<Steps handleMoveClick={handleMoveClick} history={history} />
		</div>
		</>
	);
}

function Board({cells, handleCellClick}){
	return (
		<div>
			<div className='board-row'>
				<Cell id='1' state={cells[0]} onClick={handleCellClick} />
				<Cell id='2' state={cells[1]} onClick={handleCellClick} />
				<Cell id='3' state={cells[2]} onClick={handleCellClick} />
			</div>
			<div className='board-row'>
				<Cell id='4' state={cells[3]} onClick={handleCellClick} />
				<Cell id='5' state={cells[4]} onClick={handleCellClick} />
				<Cell id='6' state={cells[5]} onClick={handleCellClick} />
			</div>
			<div className='board-row'>
				<Cell id='7' state={cells[6]} onClick={handleCellClick} />
				<Cell id='8' state={cells[7]} onClick={handleCellClick} />
				<Cell id='9' state={cells[8]} onClick={handleCellClick} />
			</div>
		</div>
	);
}

function Cell({id, onClick, state}){
	return (
		<div>
			<button id={id} className='square' onClick={onClick} value={state}>{state}</button>
		</div>
	);
}

function Steps({handleMoveClick, history}){
	return (
		<div id='steps'>
			<div key={0}>
				<button id='step-0' onClick={handleMoveClick} value='0'>Go to game start</button>
			</div>
			{
				history.map((item, index)=> {
					return (
						<div key={index+1}>
							<button id={'step-'+(index+1)} onClick={handleMoveClick} value={index+1}>Go to move #{index+1}</button>
						</div>
					);
				})
			}
		</div>
	); 
}

export default Game;
