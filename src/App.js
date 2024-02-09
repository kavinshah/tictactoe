import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, {useState} from 'react';

function Game(){
	const [turn, setTurn] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [cellStates, setCellStates] = useState(Array(9).fill(null));
	const [history, setHistory] = useState([]);
	const [winner, setWinner] = useState(null);
	
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
	
	const handleClick = (event)=> {
		let id=event.target.id-1;
		//console.log('id:', id);
		if(cellStates[id] || winner){
			return;
		}
		cellStates[id]=turn?'X':'O';
		let w = checkWinner(cellStates);
		history.push([...cellStates]);
		setTurn(!turn);
		setWinner(w);
		setCurrentStep(currentStep-1);
	}
	
	const handleStepClick = (event) => {
		let index=event.target.value;
		setTurn(index%2===0);
		setCurrentStep(index);
		setCellStates(index>0?history[index-1]:Array(9).fill(null));
		setHistory(history.slice(0, index));
		setWinner(index==history.length?winner:null);
	}
	
	const banner=()=> {
		//console.log("winner:", winner);
		if(winner != null){
			return 'Winner: '+ winner; 
		} else{
			return 'Next Player: ' + (turn?'X':'O');
		}
	};
	
	return (
		<div>
			<p>{banner()}</p>
			<Board cells={cellStates} handleClick={handleClick} />
			<Steps step={currentStep} handleStepClick={handleStepClick} history={history} />
		</div>
	);
}

function Board({cells, handleClick}){
	return (
		<div>
			<div className='board-row'>
				<Cell id='1' state={cells[0]} onClick={handleClick} />
				<Cell id='2' state={cells[1]} onClick={handleClick} />
				<Cell id='3' state={cells[2]} onClick={handleClick} />
			</div>
			<div className='board-row'>
				<Cell id='4' state={cells[3]} onClick={handleClick} />
				<Cell id='5' state={cells[4]} onClick={handleClick} />
				<Cell id='6' state={cells[5]} onClick={handleClick} />
			</div>
			<div className='board-row'>
				<Cell id='7' state={cells[6]} onClick={handleClick} />
				<Cell id='8' state={cells[7]} onClick={handleClick} />
				<Cell id='9' state={cells[8]} onClick={handleClick} />
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

function Steps({handleStepClick, history}){
	return (
		<div id='steps'>
			<div key={0}>
				<button id='step-0' onClick={handleStepClick} value='0'>Go to game start</button>
			</div>
			{
				history.map((item, index)=> {
					return (
						<div key={index+1}>
							<button id={'step-'+(index+1)} onClick={handleStepClick} value={index+1}>Go to move #{index+1}</button>
						</div>
					);
				})
			}
		</div>
	); 
}

export default Game;
