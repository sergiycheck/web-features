import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js

class Square extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        s_value:this.props.value,
      }
    }


    render() {
      return (
        <button 
        className="square" 
        onClick={()=>{
          this.setState({s_value:`X`});
          console.log(this.state.s_value)}
          }>
          {this.state.s_value}
        </button>
      );
    }
  }
  //how to initialize squares?
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state={
        squares: Array(16).fill(null,0,16)
      }
    }

    renderSquare(i) {
      return <Square  
      // value={this.state.squares[i]} 
      value = {i}
      key={i}
      //onClick ={()=> {this.handleClick(i)}}
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
      
      const status = 'Next player: X';


      return (
        <div>
          <div className="status">{status}</div>
 
          <div className="board-row">
            {this.getSquares(0,4)}
          </div>
          <div className="board-row">
            {this.getSquares(4,8)}
          </div>
          <div className="board-row">
            {this.getSquares(8,12)}
          </div>
          <div className="board-row">
            {this.getSquares(12,16)}
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


  class Game extends React.Component {
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
  