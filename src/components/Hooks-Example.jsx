import React, { useState,Component,useEffect } from 'react';
import './hooks.scss';




export default class HooksExample extends Component {
	render() {
		return (
			<div className="">
				
				<Example></Example>
				<FriendContainer></FriendContainer>
				<MouseTracker></MouseTracker>
			</div>
		)
	}
}

function Example() {
  // Объявление переменной состояния, которую мы назовём "count"
	const initialNumber = 3;  
	const [count, setCount] = useState(initialNumber);

	//the same but other syntax
	// var fruitStateVariable = useState('банан'); // Возвращает пару значений
  // var fruit = fruitStateVariable[0]; // Извлекаем первое значение
  // var setFruit = fruitStateVariable[1]; // Извлекаем второе значение

// Аналогично componentDidMount и componentDidUpdate:
//called after render
	useEffect(()=>{
		document.querySelector('.effect').innerHTML = `you clicked ${count} times. From effect`;
	},[count]);//reload effect only if count is changed

  return (
		<div className="row">
			<div className="col-sm-6">
				<p className="effect"></p>
				<p>Вы кликнули {count} раз</p>
				<button className="btn bg-success" onClick={() => setCount(count + 1)}>
					Нажми на меня
				</button>
			</div>
		</div>

  );
}

//https://randomuser.me/
let FRIENDS = [
	{id:'1',name:'Stephanie',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/5.jpg"},
	{id:'2',name:'Julie',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/6.jpg"},
	{id:'3',name:'Terrence ',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/7.jpg"},
	{id:'4',name:'Bradley ',isOnline:false,img:"https://randomuser.me/api/portraits/med/men/5.jpg"},
	{id:'5',name:'Regina ',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/8.jpg"},
	{id:'6',name:'Dana ',isOnline:false,img:"https://randomuser.me/api/portraits/med/women/9.jpg"},
]


class FriendContainer extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 friends:FRIENDS,
			 intervalId:0,
			 friend:null
		};

		this.clearInnerInterval = this.clearInnerInterval.bind(this);
		this.subscribeToFriend = this.subscribeToFriend.bind(this);
		this.unSubscribeToFriend = this.unSubscribeToFriend.bind(this);
	}
	
	componentDidMount(){

		let intervalId = setInterval(()=>{
			let randomFriend = this.state.friends[
				Math.floor(Math.random() * FRIENDS.length)];

			randomFriend.isOnline = !randomFriend.isOnline;
			this.setState((state)=>({
				friends:state.friends
			}));
			
			this.statusChanged(randomFriend);

		},2000);
		this.setState({
			intervalId:intervalId
		})

	}
	statusChanged(friend){
		//console.log('status changed',friend.Name);
		// let oldFriend = FRIENDS.find(f=>f.id===friend.id);
		// console.log(friend.isOnline,oldFriend.isOnline);
	}

	clearInnerInterval(){

		clearInterval(this.state.intervalId);
		this.setState({
			intervalId:0
		});

	}

	componentWillUnmount(){
		clearInterval(this.state.intervalId);
	}

	subscribeToFriend(friend){

		this.setState({
			friend:friend
		});
	}
	unSubscribeToFriend(friend){
		if(friend===this.state.friend){
			this.setState({
				friend:null
			});
		}

	}



	render() {

		return (
			
			<div className="row">

				{this.state.friend &&
					<FriendListItem friend={this.state.friend}></FriendListItem>
				}
				
				<div className="row flex-column w-100">

					<h2>Friends</h2>
					<div className="col-sm-6">
						{this.state.friends.map((friend,index)=>(
							
							<div key={friend.id} className="friend m-3 d-flex ">

								<img className="mx-2"
									style={{height:'50px',width:'50px'}} 
									src={friend.img} alt={`${friend.Name}+${friend.id}`}/>
									
								<div 
									className={friend.isOnline?
									'bg-success rounded-circle':
									'bg-dark rounded-circle'}
										style={{height:'20px',width:'20px'}}>
								</div>

								<div style={{marginLeft:'auto'}}>
									<h5>{friend.name}</h5>
									<span className="friend-id" style={{display:'none'}}>{friend.id}</span>
									<button onClick={()=>this.subscribeToFriend(friend)} className="btn bg-primary" >subscribe</button>
									<button onClick={()=>this.unSubscribeToFriend(friend)} className="btn bg-light" >unsubscribe</button>
								</div>
							</div>

						))}
					</div>
				</div>


			</div>
		)
	}
}




function FriendsApi(){

	
	this.subscribeToFriendStatus = function(id,callback){
		this.getFriend(id,callback);
	}

	this.getFriend = function(id,callback){

		let friend = FRIENDS.find(f=>f.id===id);
		if(friend){
			callback(friend);
		}
	}

	this.unsubscribeFromFriendStatus = function(id,callback){
		this.getFriend(id,callback);
	}


}

function useFriendStatus(api,friendId){
	
	const [isOnline, setIsOnline] = useState(null); 

	useEffect(() => {  
		function handleStatusChange(status) {      
			setIsOnline(status.isOnline);    
		}

		api.subscribeToFriendStatus(friendId, handleStatusChange);   

		return () => {      
			api.unsubscribeFromFriendStatus(friendId, handleStatusChange);    
		};

	});
	return isOnline;
}


function FriendListItem(props) {

	const ChatAPI = new FriendsApi();
	const isOnline = useFriendStatus(ChatAPI,props.friend.id)
  
  return (
		<div  
			className="row w-100">
			<div className="col-sm-6 text-center">
				<img className=" rounded img img-fluid" src={props.friend.img} alt={`${props.friend.name}`}/>
				<li style={{ color: isOnline ? 'green' : 'black' }}>
					{props.friend.name}
				</li>
			</div>
		</div>

  );

}



//High order components is required for hooks
function GetData(){

	this.getComments = function(){

	};
	this.getBlogPost = function(id){

	}

};

const DataSource = new GetData();

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" -- произвольный глобальный источник данных
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Подписаться на оповещения
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Отписаться от оповещений
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Сохранить комментарии из внешнего источника в локальном состоянии
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class Comment extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 comment:props.comment
		}
	}
	
	render() {
		return (
			<div>
				{this.props.comment}
			</div>
		)
	}
}



class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

class TextBlock extends Component {
	constructor(props) {
		super(props)
	
	}
	
	render() {
		return (
			<div>
				{this.props.text}
			</div>
		)
	}
}

//same functionality for commentslist and blogPost


const CommentWithSubscription = withSubscription(
	CommentList,
	(DataSource)=>DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
	BlogPost,
	(DataSource,props)=>DataSource.getBlogPost(props.id)
);

//function gets component 
function withSubscription(WrappedComponent,selectedData){



//and returns newComponent
	class WithSubscription extends React.Component{
		constructor(props) {
			super(props)
			this.handleChange = this.handleChange.bind(this);

			this.state = {
				 data:selectedData(DataSource,props)
			}
		}
		componentDidMount() {
			DataSource.addChangeListener(this.handleChange);
		}
	
		componentWillUnmount() {
			DataSource.removeChangeListener(this.handleChange);
		}

		handleChange(){
			this.setState({
				data:selectedData(DataSource,this.props)
			})
		}

		render(){
			return <WrappedComponent data={this.state.data} {...this.props}>

			</WrappedComponent>;
			
		}		
	}
	//for debbuging
	WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;

	//use
	//import hoistNonReactStatic from 'hoist-non-react-statics';

	//to bind static methods from WrappedComponent to Enhanced
	//hoistNonReactStatic(Enhance, WrappedComponent);


	return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// ///BAD WAY
// function logProps(InputComponent) {
//   InputComponent.prototype.componentDidUpdate = function(prevProps) {
//     console.log('Текущие пропсы: ', this.props);
//     console.log('Предыдущие пропсы: ', prevProps);
//   };
//   // Если мы возвращаем оборачиваемый компонент, значит, наверняка мы его изменили
//   return InputComponent;
// }

// // EnhancedComponent будет печатать в консоль при каждом изменении пропсов
// const EnhancedComponent = logProps(InputComponent);




// ///GOOD WAY
// function logProps(WrappedComponent) {
//   return class extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log('Текущие пропсы: ', this.props);
//       console.log('Предыдущие пропсы: ', prevProps);
//     }
//     render() {
//       // Оборачиваем компонент в контейнер без мутаций. Супер!
//       return <WrappedComponent {...this.props} />;
//     }
//   }
// }



//Render props are required for hooks


class MouseTracker extends Component {
	render() {
		return (
			<div className="row flex-column">
				<h1>Move your cursor!</h1>
				{/* <Mouse></Mouse>	 */}
				<Mouse render={mouse=>
					<Cat mouse={mouse}></Cat>
				}></Mouse>	
			</div>
		)
	}
}

class Mouse extends Component {
	constructor(props) {
		super(props)
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = {
			 x:0,
			 y:0
		}
	}
	handleMouseMove(event){
		this.setState({
			x:event.clientX,
			y:event.clientY
		})
	}
	
	render() {
		return (
			<div className="col-sm-7 mouse-move-wrapper">
				<div className="mouse-container p-3 rounded m-2" 
					style={{
						height:'70vh'
					}} 
					onMouseMove={this.handleMouseMove} >
					<p>Current mouse position x: ({this.state.x}, {this.state.y})</p>
					{/* <Cat mouse={this.state}></Cat> */}
					{this.props.render(this.state)}
				</div>
			</div>
		)
	}
}

class Cat extends Component {
	render() {
		const mouse = this.props.mouse;
		return (

				<img src="https://www.clipartmax.com/png/middle/27-270383_kitten-cartoon-drawings-of-animals-clipart-image-cat-png-clip-art.png" 
				alt=""
				style={{
					height:'30px',
					width:'30px',
					position:'absolute',
					left:mouse.x,
					top:mouse.y
					}}/>

		)
	}
}
