import React from "react";
import FancyButton from './FancyButton';


// const ref = React.createRef();

//The FancyButton component we imported is the LogProps HOC.
//Even though the rendered output will be the same,
// Our ref will point to LogProps instead of the inner FancyButton component!
// This means we can't call ref.current.focus();

//  <FancyButton
// 	label='click me'
// 	handleClick={handleClick}
// 	ref={ref}
//   />


//hight order component HOC is logProps
function logProps(WrappedComponent) {

	class LogProps extends React.Component{
		componentDidUpdate(prevProps){
			console.log('old props:', prevProps);
			console.log('new props', this.props);
		}

		//we can explicitly forward refs to the inner FancyButton component using
		//React.forwardRef API
		
		render() {
			const {forwardedRef, ...rest} = this.props;
			
			//assign the custom prop 'forwardedRef as a ref
			return <WrappedComponent  ref={forwardedRef} {...rest}/>
		}
	}

	function forwardRef(props, ref){
		return <LogProps {...props} forwardedRef={ref} />;
	}

	// Give this component a more helpful display name in DevTools.
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = WrappedComponent.displayName || WrappedComponent.name;  
	forwardRef.displayName = `logProps(${name})`;

	return React.forwardRef(forwardRef);

}


