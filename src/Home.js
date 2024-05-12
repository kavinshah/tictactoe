import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { useState } from 'react';

function Home(){
	const [playername, setName] = useState("");
	return (
		<div className='center'>
			<div>
				<input type='text' id='name' placeholder='Player Name' onChange={(e) => {setName(e.target.value);}} autoFocus />
			</div>
			<br />
			<div>
				<a id='single' className='btn btn-primary' href={'/tictactoe/#/game/singleplayer/'.concat(playername)}>Play with computer</a>
			</div>
			<br />
			<div>
				<a id='twoplayer' className='btn btn-primary' href={'/tictactoe/#/game/multiplayer/'.concat(playername)}>Play with human</a>
			</div>
		</div>
	);
}

export default Home;
