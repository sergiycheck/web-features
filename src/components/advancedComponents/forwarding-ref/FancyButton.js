import React from 'react';

//ref is only 
export  const FancyButton = React.forwardRef((props, ref)=>{
	return (
		<button ref={ref} className="FancyButton">
			{props.children}
		</button>
	);
})

// const ref = React.createRef();

// <FancyButton ref={ref}>click me</FancyButton>

export  default FancyButton;