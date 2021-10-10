import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
    const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const renderList = () => {
		if (state) {
			return [
				<div key="2">
					<Link to="/profile">Profile</Link>
				</div>,
				<div key="3">
					<Link to="createpost">Create Post</Link>
				</div>,
				<div key="4">
					<Link to="/followingpost">Following Post</Link>
				</div>,
				<div key="5">
					<button
						className="btn waves-effect waves-light #e53935 red darken-1"
						style={{ margin: "5px" }}
						onClick={() => {
							localStorage.clear();
							dispatch({ type: "CLEAR" });
							history.push("/login");
						}}>
						LogOut
					</button>
				</div>,
				
			];
		} else {
			return [
				<div key="6">
					<Link to="/login">LogIn</Link>
				</div>,
				<div key="7">
					<Link to="/signup">SignUp</Link>
				</div>,
			];
		}
	};

	return (
		<nav>
			<div className="nav-wrapper grey">
				{/* <img
					src="https://res.cloudinary.com/vlk/image/upload/v1595691220/icon_ip0cmr.png"
					className="welcome-logo"
				/> */}
				<Link to={state ? "/" : "/signup"} className="brand-logo">
					Foodgram
				</Link>
				{
					state?<div className="dropdown right" id='mob-menu'>
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  Menu
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<Link className="dropdown-item"to="/profile">Profile</Link>
					<Link className="dropdown-item"to="createpost">Create Post</Link>
					<Link className="dropdown-item"to="/followingpost">Following Post</Link>
					<button
						className="dropdown-item btn waves-effect waves-light #e53935 red darken-1"
						
						onClick={() => {
							localStorage.clear();
							dispatch({ type: "CLEAR" });
							history.push("/login");
						}}>
						LogOut
					</button>
					</div>
				  </div>:""
				}
				<div id={state?"nav-mobile":"nav-mobile-l"} className="right">
					{renderList()}
				</div>
			</div>
		</nav>
	);
};
export default NavBar;
