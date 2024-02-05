import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React from 'react';

class Game extends React.Component{
	constructor(props){
		super(props);
		this.state={
			turn:true,
			currentStep: 0,
			cellStates: Array(9).fill(null),
			history: [],
			winner: null,
		};
		this.handleClick=this.handleClick.bind(this);
		this.handleStepClick=this.handleStepClick.bind(this);
	}
	
	handleClick(event){
		let id=event.target.id-1;
		let states=this.state.cellStates;
		//console.log('id:', id);
		
		if(states[id] || this.state.winner){
			return;
		}
		
		states[id]=this.state.turn?'X':'O';
		let w = this.checkWinner(states);
		this.state.history.push([...states]);
		this.setState((state)=> ({
			turn: !state.turn,
			cellStates:states,
			history:state.history,
			winner:w,
			currentStep:state.currentStep+1,
		}));
	}
	
	checkWinner(states){
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
	
	handleStepClick(event){
		let index=event.target.value;
		//console.log('step clicked:', event.target.value);
		this.setState((state)=>({
			turn:index%2===0,
			currentStep:index,
			cellStates:index>0?state.history[index-1]:Array(9).fill(null),
			history: state.history.slice(0, index),
			winner:null
		}));
	}
	
	render(){
		console.log('cellStates', this.state.cellStates);
		let banner='';
		if(this.state.winner!=null){
			banner = 'Winner: '+this.state.winner; 
		} else{
			banner='Next Player: ' + (this.state.turn?'X':'O');
		}
		//console.log(banner);
		return (
			<div>
				<p>{banner}</p>
					<Board cells={this.state.cellStates} handleClick={this.handleClick} />
					<Steps step={this.state.currentStep} handleStepClick={this.handleStepClick} history={this.state.history}/>
			</div>
		);
	}
}

class Board extends React.Component{
	render(){
		return (
			<div>
				<div className='board-row'>
					<Cell id='1' state={this.props.cells[0]} onClick={this.props.handleClick} />
					<Cell id='2' state={this.props.cells[1]} onClick={this.props.handleClick} />
					<Cell id='3' state={this.props.cells[2]} onClick={this.props.handleClick} />
				</div>
				<div className='board-row'>
					<Cell id='4' state={this.props.cells[3]} onClick={this.props.handleClick} />
					<Cell id='5' state={this.props.cells[4]} onClick={this.props.handleClick} />
					<Cell id='6' state={this.props.cells[5]} onClick={this.props.handleClick} />
				</div>
				<div className='board-row'>
					<Cell id='7' state={this.props.cells[6]} onClick={this.props.handleClick} />
					<Cell id='8' state={this.props.cells[7]} onClick={this.props.handleClick} />
					<Cell id='9' state={this.props.cells[8]} onClick={this.props.handleClick} />
				</div>
			</div>
		);
	}
	
}

class Cell extends React.Component{
	render(){
		return (
			<div>
				<button id={this.props.id} className='square' onClick={this.props.onClick} value={this.props.state}>{this.props.state}</button>
			</div>
		);
	}
}

class Steps extends React.Component{
		render(){
			//console.log(this.props.history);
			return (
				<div id='steps'>
					<div>
						<button id='step-0' onClick={this.props.handleStepClick} value='0'>Go to game start</button>
					</div>
					{
						this.props.history.map((item, index)=> {
							return (
								<div>
									<button id={'step-'+(index+1)} onClick={this.props.handleStepClick} value={index+1}>Go to move #{index+1}</button>
								</div>
							);
						})
					}
				</div>
			);
		}
}

export default Game;
