import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import './App.css';
import Game from './Game';
import BoilingContainer from './Boiling';
import FilterableProducts from './FilterableProducts';
import HooksExample from './Hooks-Example.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";





class App extends React.Component{
	constructor(props){
    super(props);
  }
	
	render(){
		return(
			
			<Router>
			<div>

				<nav>

					<ul>
						<li>
							<Link to="/">Game</Link>
						</li>
						<li>
							<Link to="/home">home</Link>
						</li>
						<li>
							<Link to="/boiling">boiling</Link>
						</li>
						<li>
							<Link to="/products">products</Link>
						</li>
						<li>
							<Link to="/hooks">hooks</Link>
						</li>
					</ul>

				</nav>

				<div className="container">

					<Switch>

						<Route path="/game">
							<Game />
						</Route>
						<Route path="/home">
							<Home></Home>
						</Route>
						<Route path="/boiling">
							<BoilingContainer></BoilingContainer>
						</Route>
						<Route path="/products">
							<FilterableProducts></FilterableProducts>
						</Route>
						<Route path="/hooks">
							<HooksExample></HooksExample>
						</Route>


						<Route path="/">
							<Game />
						</Route>

					</Switch>

				</div>


			</div>

		</Router>


		);
	}
}


export default App;