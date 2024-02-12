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
	
	const handleCellClick = (event)=> {
		let id=event.target.id-1;
		//console.log('id:', id);
		if(cellStates[id] || winner){
			return;
		}
		cellStates[id]=turn?'X':'O';
		history.push([...cellStates]);
		setTurn(!turn);
		setWinner(checkWinner(cellStates));
		setCurrentStep(currentStep-1);
	}
	
	const handleMoveClick = (event) => {
		let index=event.target.value;
		setTurn(index%2===0);
		setCurrentStep(index);
		setCellStates(index>0?history[index-1]:Array(9).fill(null));
		setHistory(history.slice(0, index));
		setWinner(parseInt(index)===history.length?winner:null);
	}
	
	const banner=()=> {
		if(winner != null){
			return 'Winner: '+ winner; 
		} else{
			return 'Next Player: ' + (turn?'X':'O');
		}
	};
	
	return (
		<div className='game'>
			<p>{banner()}</p>
			<Board cells={cellStates} handleCellClick={handleCellClick} />
			<Steps step={currentStep} handleMoveClick={handleMoveClick} history={history} />
		</div>
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
