import React from "react";
import './Home.scss';
import { nanoid } from 'nanoid';


class Home extends React.Component{
	render(){
		return(
			<div>				
				<h1>Home works</h1>
					<ListContainer></ListContainer>
					<FormName></FormName>
					<FlavorForm></FlavorForm>
					<FileInput></FileInput>
					<Reservation></Reservation>
			</div>
		)
	}
}


class ListContainer extends React.Component{
	render(){
		const nums = [1,2,3,4];
		const doubled = nums.map((n)=>({
			data:(n*2),
			id:nanoid()
		}));
		// console.log(doubled);
		return(
			<div>				
				<ul>
				 {doubled.map((item,index)=>(
						<ListItem 
							key={item.id} 
							value={item.data} 
							ind={index} 
							id={item.id}></ListItem>
					))
				} 
				</ul>
			</div>
		)
	}
}

class ListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id : props.id,
			n : props.value,
			ind : props.ind,
		}
	}
	render(){

		const n = this.state.n;
		const ind = this.state.ind;
		return(
			// key must be unique id
			<li>element: {n}, with index: {ind}, id: {this.state.id}</li>
		);
	}
}


class FormName extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			inputValue:'',
			textAreaValue:'',
			textAreaMessageVisibility:false,
			textAreaKeys:[]
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleFormKeyDown = this.handleFormKeyDown.bind(this);
		this.handleFormKeyUp = this.handleFormKeyUp.bind(this);
	}

	handleInputChange(event){
		this.setState({
			inputValue:event.target.value
		})
	}

	handleTextAreaChange(event){
		this.setState({
			textAreaValue:event.target.value
		})
	}
	handleFormSubmit(event){
		this.setState((state)=>({
			textAreaMessageVisibility:true
		}))
		event.preventDefault();
	}

	handleFormKeyDown(event){
		// console.log(event.key)
		
		this.setState((state)=>({
			textAreaKeys:state.textAreaKeys.concat(event.key)
		}))
		//bug activates only from second enter
		const arr = Array.from(this.state.textAreaKeys);
		if(arr.includes('Enter') && arr.includes('Control')){
			console.log('handleFormKeyDown_enter_control');
			this.handleFormSubmit(event);
		}

		// event.preventDefault();
	}
	handleFormKeyUp(event){
		this.setState((state)=>({
			textAreaKeys:state.textAreaKeys.filter(e=>e!==event.key)
		}))
	}

	render(){
		// console.log(this.state.textAreaKeys);

		// const arr = Array.from(this.state.textAreaKeys);
		// if(arr.includes('Enter') && arr.includes('Control')){
		// 	console.log('enter_control');
		// }

		return(
			<div className="col-sm-6">
				<div>{this.state.textAreaKeys}</div>
				<div>
					<p className={
						this.state.textAreaMessageVisibility
						?'d-block':'d-none'}>
						{this.state.textAreaValue}
					</p>
				</div>
				<div className="row">

						<p className="">Enter your name:</p>
						<p className="name-mutable">{this.state.inputValue}</p>
					</div>

				<form onSubmit={this.handleFormSubmit} action="">

				<input
					className="form-control"
					type="text" 
					value={this.state.inputValue} 
					onChange={this.handleInputChange}/>

					<textarea
						placeholder="ctrl+enter to send message"
						className="form-control mt-2" 
						type="text"
						rows="4"
						value={this.state.textAreaValue} 
						onChange={this.handleTextAreaChange}
						onKeyDown={this.handleFormKeyDown}
						onKeyUp={this.handleFormKeyUp}
					/>
 					<input type="submit" className="btn btn-primary" value="Send" />
				</form>

				

			</div>
			
		);
	}
}


class FlavorForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			valueFirst: 'coconut',
			valueSecond:'first',
			valuesAll:['first', 'second','third','fourth','five','six']
		};

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
		this.setState({
			valueFirst: event.target.value});  
	}
	handleChangeMultiple(event) {    
		this.setState({
			valueSecond: event.target.value});  
	}
  handleSubmit(event) {
    alert('Ваш любимый вкус: ' + this.state.valueFirst);
    event.preventDefault();//reloads page without preventDefault
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
				
				<div className="row">
					<label htmlFor="">Choose value
						<select 
							// multiple={true} 
							key={nanoid()}
							value={this.state.valueSecond} 
							onChange={this.handleChangeMultiple}>
								{/* Пустий рядок передано до getElementById(). jsm  firefox bug*/}
								{this.state.valuesAll.map((val)=>(
									<option id={nanoid()} key={nanoid()} value={val}>{val}</option>
								))}
						</select>		
					</label>

				</div>

				<div className="row">
					<label>
						Выберите ваш любимый вкус:
						<select value={this.state.valueFirst} onChange={this.handleChange}>            
							<option value="grapefruit">Грейпфрут</option>
							<option value="lime">Лайм</option>
							<option value="coconut">Кокос</option>
							<option value="mango">Манго</option>
						</select>
					</label>
					<input type="submit" value="Отправить" />
				</div>

      </form>
    );
  }
}
class FileInput extends React.Component{
  constructor(props) {
    super(props);
		this.state={
			oneFileCounter:0,
			multipleFileCounter:0
		}
		this.oneFileInputChangeHandler = this.oneFileInputChangeHandler.bind(this);
		this.multipleFileInputChangeHandler = this.multipleFileInputChangeHandler.bind(this);
  }
	multipleFileInputChangeHandler(event){
		console.log(event.target.files.length)
		this.setState((state)=>({
			multipleFileCounter:event.target.files.length
		}))
	}
	oneFileInputChangeHandler(event){
		this.setState((state)=>({
			oneFileCounter:event.target.files.length
		}))
	}


	render(){
		return(
			<div className="">
				<div className="row">
				<h2>How to count files?</h2>
				</div>
				
				<div className="row">
					<div className="h2">
						{this.state.oneFileCounter}
					</div>
					<label htmlFor="">select one file
						<input type="file" onChange={this.oneFileInputChangeHandler}/>
					</label>
				</div>

				<div className="row">
					<div className="h2">
						{this.state.multipleFileCounter}
					</div>
					<label htmlFor="">Select multiple files
						<input type="file"onChange={this.multipleFileInputChangeHandler}  multiple />
					</label>
				</div>

				
			</div>
		);
	}

}

class Reservation extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isGoing:true,
			numberOfGuests:0
		}

		this.handleInputChange = this.handleInputChange.bind(this);

	}

	handleInputChange(event){
		const target = event.target;
		console.log('target', target);
		const value = target.type ==='checkbox'?target.checked:target.value;
		console.log('value',value);
		const name = target.name;
		console.log('name', name);

		//name is calculated before being set
		//without [] weird behaviour 
		this.setState({
			[name]:value
		});
	}


	render(){
		return(
			<form>
				<h2>{this.state.name}</h2>
				<br/>
			<label>
				going to come:
				<input className="checkbox"
					name="isGoing"
					type="checkbox"
					checked={this.state.isGoing}
					onChange={this.handleInputChange} />
			</label>
			<br />
			<label>
				Number of guests:
				<input
				className="form-control"
					name="numberOfGuests" 
					type="number"
					value={this.state.numberOfGuests}
					onChange={this.handleInputChange} />
			</label>
		</form>
		);
	}
}




export default Home;

