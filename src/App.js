import {useState} from 'react'

function Square({onClickHandler, value}) {
  return (
    <button
      className="square"
      onClick={onClickHandler}>{value}
    </button>
  );
}

export default function Board(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  let squares = history[history.length-1];
  let state = '';

  function handleClick(index)
  {
    if(squares[index] || calculateWinner(squares))
      return;
    const newsquares = squares.slice();
    newsquares[index]=!(history.length%2===0)?'X':'O';
    setHistory([...history, newsquares]);
    squares=newsquares;
  }
  
  function jumpTo(step)
  {
    //console.log("jump to step:" + step);
    setHistory(history.slice(0, step));
    squares=history[step-1];
  }

  let winner=calculateWinner(squares);

  if(winner)
  {
    state = ('Winner is Player:'+winner);
  }
  else
  {
    state = 'Next Turn Player:' + (!(history.length%2===0)?'X':'O');
  }

  const states = history.map((value, index) => {
    let stepname='';
    if(index===0)
      stepname='go to Start';
    else
      stepname='go to Step:' + (index);
    return(
    <li key={index}><button onClick={()=> jumpTo(index+1)}>{stepname}</button></li>
    );
  });

  return (
    <>
    <div className='state'>{state}</div>
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
    <ol>{states}</ol>
    </>
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
