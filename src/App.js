import {useState} from 'react'

function Square({onClickHandler, value}) {
  return (
    <button
      className="square"
      onClick={onClickHandler}>{value}
    </button>
  );
}

function Board({squares, xTurn, onPlay}){

  function handleClick(index)
  {
    if(squares[index] || calculateWinner(squares))
      return;
    const newsquares = squares.slice();
    newsquares[index]=xTurn?'X':'O'
    onPlay(newsquares);
  }
  
  let winner=calculateWinner(squares);
  let state;

  if(winner)
  {
    state = ('Winner is Player:'+winner);
  }
  else
  {
    state = 'Next Turn Player:' + (xTurn?'X':'O');
  }

  return (
    <>
    <div className='status'>{state}</div>
    <div className='board'>
      <div className="board-row">
        <Square onClickHandler={()=>handleClick(0)} value={squares[0]}/>
        <Square onClickHandler={()=>handleClick(1)} value={squares[1]}/>
        <Square onClickHandler={()=>handleClick(2)} value={squares[2]}/>
      </div>
      <div className="board-row">
        <Square onClickHandler={()=>handleClick(3)} value={squares[3]}/>
        <Square onClickHandler={()=>handleClick(4)} value={squares[4]}/>
        <Square onClickHandler={()=>handleClick(5)} value={squares[5]}/>
      </div>
      <div className="board-row">
        <Square onClickHandler={()=>handleClick(6)} value={squares[6]}/>
        <Square onClickHandler={()=>handleClick(7)} value={squares[7]}/>
        <Square onClickHandler={()=>handleClick(8)} value={squares[8]}/>
      </div>
    </div>
    </>
  );
}

export default function Game()
{
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const xTurn = move%2===0;
  const currentSquares = history[move];

  function handlePlay(newSquares)
  {
    const newhistory = [...history.slice(0, move+1), newSquares];
    setHistory(newhistory);
    setMove(newhistory.length-1);
  }

  function jumpTo(step)
  {
    //console.log("jump to step:" + step);
    setMove(step);
  }

  const states = history.map((value, index) => {
    let stepname;
    if(index===0)
      stepname='go to Start';
    else
      stepname='go to Step:' + (index);
    return(
    <li key={index}>
      <button onClick={()=> jumpTo(index)}>{stepname}</button>
    </li>
    );
  });

  return(
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xTurn={xTurn} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{states}</ol>
      </div>
    </div>
  ); 
}

function calculateWinner(squares)
{
  const combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i=0; i<combinations.length; i++)
  {
    const combination=combinations[i];
    if(squares[combination[0]]
      && squares[combination[0]]===squares[combination[1]]
      && squares[combination[0]]===squares[combination[2]])
      return squares[combination[0]];
  }

  return null;
}
