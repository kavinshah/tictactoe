import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React from 'react';

function Home(){
	return (
		<div className='center'>
			<div>
				<a id='single' className='btn btn-primary' href="/tictactoe/#/game/singleplayer">Play with computer</a>
			</div>
			<br />
			<div>
				<a id='twoplayer' className='btn btn-primary' href="/tictactoe/#/game/multiplayer">Play with  human</a>
			</div>
		</div>
	);
}

export default Home;
