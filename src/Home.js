import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, {useState} from 'react';

function Home(){
	return (
		<div className='center'>
			<a id='single' className='btn btn-primary' href="tictactoe/game/singleplayer">Play with computer</a>
			<a id='twoplayer' className='btn btn-primary' href="tictactoe/game/multiplayer">Play with  human</a>
		</div>
	);
}

export default Home;
