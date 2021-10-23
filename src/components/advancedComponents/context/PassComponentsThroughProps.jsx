import { Link } from "react-router-dom"

const NavigationBar = () => {}

const Avatar = ({user, size}) => {
	return <div>{user}, {size}</div>
};

const PageLayout = ({topBar, content}) => {
	return (
		<div>
			{topBar}
			{content}
		</div>
	)
}

const Feed = ({user})=>{
	return <div>{user}</div>
}


function Page(props){

	const {user} = props;
	const content = <Feed user={user}></Feed>;

	const topBar = (
		<NavigationBar>
			<Link to={user.permalink}>
				<Avatar user={user} size={props.avatarSize}></Avatar>
			</Link>
		</NavigationBar>
	);

	return(
		<PageLayout topBar={topBar} content={content}></PageLayout>
	)
}