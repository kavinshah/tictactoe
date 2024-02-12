import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, {useState} from 'react';

const baseurl='tictactoe';

function Home(){
	return (
		<div className='center'>
		{/*<a id='single' className='btn btn-primary' href={baseurl.concat("/game?mode=singleplayer")}>Play with computer</a>*/}
			<a id='twoplayer' className='btn btn-primary' href={baseurl.concat('/game?mode=multiplayer')}>Play with another human</a>
		</div>
	);
}

export default Home;
