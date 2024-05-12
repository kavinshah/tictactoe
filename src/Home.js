import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { useState } from 'react';

function Home(){
	const [playername1, setName1] = useState("player1");
	const [playername2, setName2] = useState("player2");

	return (
		<div className='center'>
			<div>
				<input type='text' id='playername1' placeholder='Player 1' onChange={(e) => {setName1(e.target.value);}} autoFocus />
				<br />
				<br />
				<input type='text' id='playername2' placeholder='Player 2' onChange={(e) => {setName2(e.target.value);}} />
			</div>
			<br />
			<div>
				<a id='single' className='btn btn-primary' href={'/tictactoe/#/game/singleplayer/'.concat(playername1).concat('/').concat(playername2)}>Play with computer</a>
			</div>
			<br />
			<div>
				<a id='twoplayer' className='btn btn-primary' href={'/tictactoe/#/game/multiplayer/'.concat(playername1).concat('/').concat(playername2)}>Play with human</a>
			</div>
		</div>
	);
}

export default Home;
