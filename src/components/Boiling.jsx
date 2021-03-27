import React, { Component } from 'react'

export default class BoilingContainer extends Component {

	render() {

		return (
			<div className="row">
				<CelsiusCalculator></CelsiusCalculator>

				<WelcomeDiag></WelcomeDiag>
				<ChatApp></ChatApp>
			</div>
			
		)
	}
}

class BoilingVerdict extends Component{
	constructor(props){
		super(props);

	}


	render() {
		let doesWaterBoil;
		if(Math.round(this.props.celsius)>=100){
			doesWaterBoil = <div>water is going to boil</div>
		}else{
			doesWaterBoil = <div>water is not going to boil</div>
		}
		return (
			<div>
				{doesWaterBoil}
			</div>
		)
	}
}

class CelsiusCalculator extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			temperature:'',
			scale:'c'
		}
	

		this.onCelsiusChange = this.onCelsiusChange.bind(this);
		this.onFahrenheitChange = this.onFahrenheitChange.bind(this);
	}
	onCelsiusChange(tempValue){
		this.setState((state)=>({
			temperature:tempValue,
			scale:'c'
		}));
	}
	onFahrenheitChange(tempValue){
		this.setState((state)=>({
			temperature:tempValue,
			scale:'f'
		}));
	}


	render(){
		const temperature = this.state.temperature;
		const scale = this.state.scale;
		const celsius = scale === 'c'?temperature:
			tryConvertTemperature(temperature,toCelsius);
		const fahrenheit = scale === 'f'?temperature:
			tryConvertTemperature(temperature,toFahrenheit);

		return(
			<div className="col-sm-5">

				<TemperatureInput 
					scale="c"
					temperature={celsius}
					onTemperatureChange={this.onCelsiusChange}></TemperatureInput>
				<TemperatureInput scale="f" 
					temperature={fahrenheit}
					onTemperatureChange={this.onFahrenheitChange}></TemperatureInput>
				<BoilingVerdict celsius={parseFloat(celsius)}></BoilingVerdict>
			</div>

		);
	}
}

class TemperatureInput extends React.Component{

	constructor(props){
		super(props);

		this.scaleNames = {
			c:'Celsius',
			f:'Fahrenheit'
		}
		this.handleTemperatureChange = this.handleTemperatureChange.bind(this);
	}

	handleTemperatureChange(event){
		// this.setState((state)=>({
		// 	temperature:event.target.value
		// }));
		this.props.onTemperatureChange(event.target.value);
	}

	render(){
		//const temperature = this.state.temperature;
		const temperature = this.props.temperature;

		const scale = this.props.scale;

		return(
			<div className="">
				<fieldset>
					<legend>Enter the temperature in {this.scaleNames[scale]} degrees</legend>
					<input 
						value={temperature} 
						onChange={this.handleTemperatureChange} 
						className="form-control" type="text"/>
				</fieldset>
			</div>

		);
	}


}

function toCelsius(fahrenheit){
	return (fahrenheit-32)*5/9;
}

function toFahrenheit(celsius){
	return (celsius*9/5)+32;
}

function tryConvertTemperature(tempText, tempConverter){
	let input = parseFloat(tempText);
	if(Number.isNaN(input))
		return '';
	let output = tempConverter(input);
	let roundedInput = Number(output).toFixed(3);
	return roundedInput.toString();
}

class WelcomeDiag extends React.Component{


	render(){
		return(
			<div className="col-sm-7">
				<FancyBorder color="blue">
					<h1 className="Dialog-title">
						Thank you for visiting out site!
					</h1>
					<p className="Dialog-message">        
						Спасибо, что посетили наш космический корабль!      
					</p>
				</FancyBorder>
			</div>

			);
	}

}
function FancyBorder(props){
	return(
		<div className={'FancyBorder FancyBorder-'+props.color}>
			{props.children}
			<br></br>
			<h3>Child message</h3>
		</div>
	);
}


function ChatApp() {
  return (
		<div className="row w-100">
			<SplitPane

				left={
					<Contacts />
				}

				right={
					<Chat />
				} 
			/>

		</div>

  );
}
function SplitPane(props) {
  return (
    <div className="SplitPane w-100 d-flex flex-row">
      <div className="SplitPane-left bg-info w-25">
        {props.left}
      </div>
      <div className="SplitPane-right bg-light w-75">
        {props.right}
      </div>
    </div>
  );
}

function Contacts() {
  return( 
	
	<div className="Contacts p-2">
		<h3>Contacts</h3>
	</div>
	
	);
}

function Chat() {
  return( 
	
	<div className="Chat p-2">
		<h3>Chat</h3>
	</div>
	
	);
}












