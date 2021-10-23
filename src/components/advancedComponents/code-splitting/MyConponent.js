

import React, {Suspense} from 'react';

async function loadComponent(callbackLoad){
	return await callbackLoad();
}

const OtherComponent = React.lazy(()=>import('./OtherComponent'));
const AnotherComponent = React.lazy(()=>import('./AnotherComponent'));

export function MyComponent(){
	return(
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<section>
					<div>this is my components with two additional component</div>
					<OtherComponent></OtherComponent>
					<AnotherComponent></AnotherComponent>

				</section>
			</Suspense>
		</div>
	)
}


