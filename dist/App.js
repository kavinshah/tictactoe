var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import * as React from 'react';
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            turn: true,
            currentStep: 0,
            cellStates: Array(9).fill(null),
            history: [],
            winner: null,
        };
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleStepClick = _this.handleStepClick.bind(_this);
        return _this;
    }
    Game.prototype.handleClick = function (event) {
        var id = event.target.id - 1;
        var states = this.state.cellStates;
        //console.log('id:', id);
        if (states[id] || this.state.winner) {
            return;
        }
        states[id] = this.state.turn ? 'X' : 'O';
        var w = this.checkWinner(states);
        this.state.history.push(__spreadArray([], states, true));
        this.setState(function (state) { return ({
            turn: !state.turn,
            cellStates: states,
            history: state.history,
            winner: w,
            currentStep: state.currentStep + 1,
        }); });
    };
    Game.prototype.checkWinner = function (states) {
        var winner = null;
        //console.log('checking winner');
        //check horizontal squares
        if (states[0] === states[1] && states[1] === states[2]) {
            winner = states[0];
        }
        else if (states[3] === states[4] && states[4] === states[5]) {
            winner = states[3];
        }
        else if (states[6] === states[7] && states[7] === states[8]) {
            winner = states[6];
        }
        //check vertical squares
        else if (states[0] === states[3] && states[3] === states[6]) {
            winner = states[0];
        }
        else if (states[1] === states[4] && states[4] === states[7]) {
            winner = states[1];
        }
        else if (states[2] === states[5] && states[5] === states[8]) {
            winner = states[2];
        }
        //check diagonal squares
        else if (states[0] === states[4] && states[4] === states[8]) {
            winner = states[0];
        }
        else if (states[2] === states[4] && states[4] === states[6]) {
            winner = states[2];
        }
        return winner;
    };
    Game.prototype.handleStepClick = function (event) {
        var index = event.target.value;
        //console.log('step clicked:', event.target.value);
        this.setState(function (state) { return ({
            turn: index % 2 === 0,
            currentStep: index,
            cellStates: index > 0 ? state.history[index - 1] : Array(9).fill(null),
            history: state.history.slice(0, index),
            winner: null
        }); });
    };
    Game.prototype.render = function () {
        console.log('cellStates', this.state.cellStates);
        var banner = '';
        if (this.state.winner != null) {
            banner = 'Winner: ' + this.state.winner;
        }
        else {
            banner = 'Next Player: ' + (this.state.turn ? 'X' : 'O');
        }
        //console.log(banner);
        return (React.createElement("div", null,
            React.createElement("p", null, banner),
            React.createElement(Board, { cells: this.state.cellStates, handleClick: this.handleClick }),
            React.createElement(Steps, { step: this.state.currentStep, handleStepClick: this.handleStepClick, history: this.state.history })));
    };
    return Game;
}(React.Component));
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: 'board-row' },
                React.createElement(Cell, { id: '1', state: this.props.cells[0], onClick: this.props.handleClick }),
                React.createElement(Cell, { id: '2', state: this.props.cells[1], onClick: this.props.handleClick }),
                React.createElement(Cell, { id: '3', state: this.props.cells[2], onClick: this.props.handleClick })),
            React.createElement("div", { className: 'board-row' },
                React.createElement(Cell, { id: '4', state: this.props.cells[3], onClick: this.props.handleClick }),
                React.createElement(Cell, { id: '5', state: this.props.cells[4], onClick: this.props.handleClick }),
                React.createElement(Cell, { id: '6', state: this.props.cells[5], onClick: this.props.handleClick })),
            React.createElement("div", { className: 'board-row' },
                React.createElement(Cell, { id: '7', state: this.props.cells[6], onClick: this.props.handleClick }),
                React.createElement(Cell, { id: '8', state: this.props.cells[7], onClick: this.props.handleClick }),
                React.createElement(Cell, { id: '9', state: this.props.cells[8], onClick: this.props.handleClick }))));
    };
    return Board;
}(React.Component));
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cell.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("button", { id: this.props.id, className: 'square', onClick: this.props.onClick, value: this.props.state }, this.props.state)));
    };
    return Cell;
}(React.Component));
var Steps = /** @class */ (function (_super) {
    __extends(Steps, _super);
    function Steps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Steps.prototype.render = function () {
        var _this = this;
        //console.log(this.props.history);
        return (React.createElement("div", { id: 'steps' },
            React.createElement("div", null,
                React.createElement("button", { id: 'step-0', onClick: this.props.handleStepClick, value: '0' }, "Go to game start")),
            this.props.history.map(function (item, index) {
                return (React.createElement("div", null,
                    React.createElement("button", { id: 'step-' + (index + 1), onClick: _this.props.handleStepClick, value: index + 1 },
                        "Go to move #",
                        index + 1)));
            })));
    };
    return Steps;
}(React.Component));
export default Game;
//# sourceMappingURL=App.js.map