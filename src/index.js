import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

//const baseurl='tictactoe';

const router = createHashRouter([
	{
		path:('/'),
		element: <Home />,
	},
	{
		path:('/game/:mode/:playername'),
		element: <Game />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
