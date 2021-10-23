

import React, {Suspense, lazy} from 'react';

import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom';

const OtherComponent = lazy(()=>import('./OtherComponent'));
const AnotherComponent = lazy(()=>import('./AnotherComponent'));

export function MyComponentWithRouting(){
	const { url } = useRouteMatch();
	return(
		<Router>
			<nav style={{display:"flex", justifyContent:'space-around'}}>
				<Link to={`${url}`}>other</Link>
				<Link to={`${url}/about`}>about</Link>
			</nav>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path={`${url}`} component={OtherComponent} />
					<Route exact path={`${url}/about`} component={AnotherComponent} />
				</Switch>
			</Suspense>
		</Router>
	)
}


