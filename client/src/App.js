import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import UserProfile from "./components/screens/UserProfile";
import FollowingPost from "./components/screens/FollowingPost";
import ResetPass from "./components/screens/ResetPass";
import NewPass from "./components/screens/NewPass";

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user });
		} else {
			if (!history.location.pathname.startsWith("/reset-password")) history.push("/login");
		}
	}, []);

	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route exact path="/profile">
				<Profile />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/createpost">
				<CreatePost />
			</Route>
			<Route path="/profile/:userid">
				<UserProfile />
			</Route>
			<Route path="/followingpost">
				<FollowingPost />
			</Route>
			<Route exact path="/reset-password">
				<ResetPass />
			</Route>
			<Route path="/reset-password/:token">
				<NewPass />
			</Route>
		</Switch>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<NavBar />
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
