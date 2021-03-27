import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import LoginControl from './Auth_custom';


// https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
//https://www.freecodecamp.org/news/https-medium-com-gladchinda-hacks-for-creating-javascript-arrays-a1b80cb372b/

class Square extends React.Component {


	render() {
		return (
			<button 
			className="square" 
			onClick={()=>{
				this.props.onClick();
				console.log(this.props.value)}
				}>
				{this.props.value}
			</button>
		);
	}
}

function range(start, end, step = 1) {

	const allNumbers = [start, end, step].every(Number.isFinite);

	if (!allNumbers) {
		throw new TypeError('range() expects only finite numbers as arguments.');
	}
	
	if (step <= 0) {
		throw new Error('step must be a number greater than 0.');
	}
	
	if (start > end) {
		step = -step;
	}
	
	const length = Math.floor(Math.abs((end - start) / step)) + 1;
	
	return Array.from(Array(length), (x, index) => start + index * step);
	
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for(let i = 0;i<lines.length;i++){
		const[a,b,c] = lines[i];
		if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
			console.log(`${a} ${b} ${c}`);
			return squares[a]
		}
	}
	return null;
}



class Board extends React.Component {


	renderSquare(i) {
		return <Square  
		value={this.props.squares[i]} 
		key={i}
		onClick ={()=> {this.props.onClick(i)}}
		/>;
	}

	getSquares(num1,num2){
		const items = [];
		for(let i = num1;i<num2;i++){
			items.push(this.renderSquare(i))
		}
		return items;
	}

	render() {
		

		return (
			<div>
			 

				<div className="board-row">
					{this.getSquares(0,3)}
				</div>
				<div className="board-row">
					{this.getSquares(3,6)}
				</div>
				<div className="board-row">
					{this.getSquares(6,9)}
				</div>

			</div>
		);
	}
}


class ShoppingList extends React.Component {

	render() {
		return (
			<div className="shopping-list">
				<h1>Список покупок для {this.props.name}</h1>
				<ul>
					<li>Instagram</li>
					<li>WhatsApp</li>
					<li>Oculus</li>
				</ul>
			</div>

		);
	}
}

class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state = {date:new Date()};
	}  

	componentDidMount(){
		this.timerId = setInterval(
			()=>this.tick(),
			1000
		)
	}
	componentWillUnmount(){
		clearInterval(this.timerId);
	}
	tick(){
		this.setState({
			date:new Date()
		});
	}
	
	render(){
		return(
			<div>
				<h1>Custom timer</h1>
				<h2>Now is {this.state.date.toLocaleTimeString()}</h2>
			</div>
		)
		
	}

}


class Counter extends React.Component{
	constructor(props){
		super(props);
		this.state={       
			count:0,  
		}
	}
	render(){
		return (
			<div className="like-widget">
				<span>Likes {this.state.count}</span>

				<span onClick={() => this.setState({ count: this.state.count + 1 })} className="like-heart">
				<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  className=" bi bi-heart-fill " viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
				</svg>
				</span>
				
			</div>
		);
	}
}

class Toggler extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isToggleOn:true
		}

		// Эта привязка обязательна для работы `this` в колбэке.
		//bind click handler
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState(state=>({
				isToggleOn:!state.isToggleOn
			})
		);
	}
	deleteRow(id){
		
	}

	render(){
		return(
			<div className="row">

				<button className="btn btn-primary" onClick={this.handleClick}>
					{this.state.isToggleOn?'turned on':'turned of'}
				</button>

				{/* <button onClick={(e) => this.deleteRow(id, e)}>Удалить строку</button>
				<button onClick={this.deleteRow.bind(this, id)}>Удалить строку</button> */}
			</div>
			
			
		);
	}
}

class LoggingButton extends React.Component {
	// Такой синтаксис гарантирует, что `this` привязан к handleClick.  
	// Предупреждение: это экспериментальный синтаксис  

	handleClick = () => {
		console.log('значение this:', this);  
	}

	render() {
		return (
			<button className="btn btn-primary" onClick={this.handleClick}>
				Нажми на меня
			</button>
		);
	}
}





class Game extends React.Component {

	constructor(props){
		super(props);
		
		this.state={
			history:[{
				squares:Array(9).fill(null)
			}],
			stepNum:0,
			xIsNext:true,

		}
	}


	handleClick(i){

		const history = this.state.history.slice(0,this.state.stepNum+1);
		const current = history[history.length-1];
		const squares  = current.squares.slice();//copy array without changing initial array

		if(calculateWinner(squares)||squares[i]){
			return;
		}
		squares[i] =this.state.xIsNext? "X":"O";

		this.setState({
			history:history.concat([{
				squares:squares,
			}]),
			stepNum:history.length,
			xIsNext:!this.state.xIsNext
		});

	}

	jumpToMove(step){
			
		this.setState({
			stepNum:step,
			xIsNext:(step%2)===0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNum];
		const winner = calculateWinner(current.squares);
		let status;
		if(winner){
			status = `Winner is ${winner} player`;
		}else{
			status = `Next player: ${this.state.xIsNext? "X":"O"}`;
		}
		const moves = history.map((step,move)=>{
			const description = move?
			`Go to move number ${move}`:
			`Got to the start`;
			return(
				<li key={move}>
					<button className="btn btn-primary" onClick={()=>this.jumpToMove(move)}>{description}</button>
				</li>
			)
		});

		


		return (
			<div className="game">
				<div className="game-board">
				
					<Board 
						squares={current.squares}
						onClick={(i)=>this.handleClick(i)}
					/>
					<ShoppingList name="TestName"/>
					<Clock />
					<Counter/>
					<Toggler/>
					<LoggingButton/>
					<LoginControl />
				</div>
				<div className="game-info">
				<div className="status">{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}
export default Game;
