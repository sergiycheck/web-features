import React from 'react';

function UserGreeting(props) {
  return <h1>С возвращением!</h1>;
}

function GuestGreeting(props) {
  return <h1>Войдите, пожалуйста.</h1>;
}

function LoginButton(props) {
  return (
    <button className="btn btn-success" onClick={props.onClick}>
      Войти
    </button>
  );
}

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
	console.log(unreadMessages.length);
  return (
    <div>
      <h1>Здравствуйте!</h1>
				{unreadMessages.length > 0 &&        
					<h2>У вас {unreadMessages.length} непрочитанных сообщений.</h2>      
				}    
		</div>
  );
}



function LogoutButton(props) {

	const messages = ['React', 'Re: React', 'Re:Re: React'];
	
  return (
		<div>
			<Mailbox unreadMessages={messages}></Mailbox>
			<button className="btn btn-danger" onClick={props.onClick}>
				Выйти
			</button>
		</div>
		
  );
}

class Greeting extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			isLoggedIn:props.isLoggedIn
		}
		this.setGreetigState = this.setGreetigState.bind(this); 
	}

	setGreetigState(val){
		this.setState({
			isLoggedIn:val
		})
	}


	render(){
		let gretting;
		if(this.state.isLoggedIn){
			gretting =  <UserGreeting />
		}else{
			gretting =  <GuestGreeting/>
		}
		
		return(
			<div>
				{gretting}		
			</div>

		)
	}

}

// function Greeting(props) {
//   const isLoggedIn = props.isLoggedIn;
//   if (isLoggedIn) {    
// 		return <UserGreeting />;  
// 	}  
// 	return <GuestGreeting />;
// }

function WarningBanner(props){
	if(!props.warn){
		return null;
	}
	return(
		<h3 className="bg-warning">warning</h3>
	)
}

class LoginControl  extends React.Component{

	constructor(props){
		super(props);

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleShowWarning = this.handleShowWarning.bind(this);
		this.resetCounter = this.resetCounter.bind(this);

		this.state ={
			isLoggedIn:false,
			counter:0,
			showWarning:true
		}

		this.grettingElement = React.createRef();
	}

	resetCounter(){
		this.setState(({
			counter:0
		}))
	}

	handleShowWarning(){
		this.setState(state=>({
			showWarning:!state.showWarning
		}));
	}

	login(){
		this.setState((state)=>({
			isLoggedIn:true,
			counter:state.counter+1
		}));
		//linked list
		this.grettingElement.current.setGreetigState(!this.state.isLoggedIn);
		console.log('login counter ',this.state.counter);
	}
	tooManyLoginAttempts(){
		return(
			<div>
				<h3>to many login attempts</h3>
				<button className='btn bg-info' onClick={this.handleShowWarning}>
					{this.state.showWarning?'hide':'show'}
				</button>
				<WarningBanner warn={this.state.showWarning}></WarningBanner>
			</div>
		);
	}


	logout(){
		this.setState((state)=>({
			isLoggedIn:false
		}));
		this.grettingElement.current.setGreetigState(!this.state.isLoggedIn);
	}



	render(){
		const isLoggedIn = this.state.isLoggedIn;
		let btn;
		if(isLoggedIn){
			btn = <LogoutButton onClick={this.logout}></LogoutButton>
		}else{
			btn = <LoginButton onClick={this.login}></LoginButton>
		}
		let grettingMsg = <Greeting isLoggedIn={isLoggedIn} ref={this.grettingElement}></Greeting>

		if(this.state.counter>3){
			grettingMsg = this.tooManyLoginAttempts();
			btn = null;
			let timeOutId = setTimeout(()=>{
				this.resetCounter();
				clearTimeout(timeOutId);
			},5000);

		}
		

		return(
			<div className="row">

				{grettingMsg}
				{btn}

				{/* <div>
      			{isLoggedIn
							?<LogoutButton onClick={this.logout} />
							:<LoginButton onClick={this.login} />
						}
    		</div> */}	

			</div>
		)
	}

}
export default LoginControl;






