import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";

const Login = () => {
	const { dispatch } = useContext(UserContext);
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const PostData = () => {
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			M.toast({ html: "Invalid Email ", classes: "#e53935 red darken-1" });
			return;
		}
		fetch("/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					M.toast({ html: data.error, classes: "#e53935 red darken-1" });
				} else {
					localStorage.setItem("jwt", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					dispatch({ type: "USER", payload: data.user });
					M.toast({ html: "Logged In Successfully", classes: "#00c853 green accent-4" });
					history.push("/");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2 className="brand-logo">Foodgram</h2>
				<input
					type="text"
					placeholder="Email "
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password "
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #42a5f5 blue darken-1"
					style={{width:"90%",  marginTop: "20px",zIndex:"0" }}
					onClick={() => PostData()}>
					LogIn
				</button>
				<h6 style={{ marginTop: "25px" }}>
					Don't have an account?
					<Link to="/signup"> (click here)</Link>
				</h6>
				<h6 style={{ marginTop: "25px" }}>
					<Link to="/reset-password">forgot password? </Link>
				</h6>
			</div>
		</div>
	);
};

export default Login;
