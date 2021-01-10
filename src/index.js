import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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



  //how to initialize squares?
  
  class Board extends React.Component {

    constructor(props){
      super(props);
      
      this.state={
        //squares: [...Array(16).keys()],
        //squares:Array.from({length:16},(_,i)=>i+1),
        //squares:Array.from(range(3,12,1)),
        squares:Array(9).fill(null),
        xIsNext:true,
      }
    }



    handleClick(i){
      const squares  = this.state.squares.slice();//copy array without changing initial array
      if(calculateWinner(squares)||squares[i]){
        return;
      }


      squares[i] =this.state.xIsNext? "X":"O";

      this.setState({
        squares:squares,
        xIsNext:!this.state.xIsNext
      });
    }


    renderSquare(i) {
      return <Square  
      value={this.state.squares[i]} 
      key={i}
      onClick ={()=> {this.handleClick(i)}}
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
      
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner){
        status = `Winner is ${winner} player`;
      }else{
        status = `Next player: ${this.state.xIsNext? "X":"O"}`;
      }

      return (
        <div>
          <div className="status">{status}</div>
 
          <div className="board-row">
            {this.getSquares(0,3)}
          </div>
          <div className="board-row">
            {this.getSquares(3,6)}
          </div>
          <div className="board-row">
            {this.getSquares(6,9)}
          </div>


          {/* <div className="board-row">
            {this.getSquares(12,16)}
          </div> */}

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


  class Game extends React.Component {

    constructor(props){
      super(props);
      
      this.state={
        history:[{
          squares:Array(9).fill(null)
        }],
        xIsNext:true,
      }
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
            <ShoppingList name="TestName"/>
            <Clock />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }


  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  