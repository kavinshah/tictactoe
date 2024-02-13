import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React from 'react';

function Home(){
	return (
		<div className='center'>
			<a id='single' className='btn btn-primary' href="game/singleplayer">Play with computer</a>
			<a id='twoplayer' className='btn btn-primary' href="game/multiplayer">Play with  human</a>
		</div>
	);
}

export default Home;
