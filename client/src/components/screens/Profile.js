import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState("");
	// const [url,setUrl] = useState("")
	useEffect(() => {
		fetch("/myposts", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setPics(result.myposts);
			});
	}, []);
	// eslint-disable
	useEffect(() => {
		if (image) {
			const data = new FormData();
			data.append("file", image);
			data.append("upload_preset", "helloo");
			data.append("cloud_name", "vlk");
			fetch("https://api.cloudinary.com/v1_1/vlk/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					fetch("/updatepic", {
						method: "put",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + localStorage.getItem("jwt"),
						},
						body: JSON.stringify({
							pic: data.url,
						}),
					})
						.then((res) => res.json())
						.then((result) => {
							console.log(result);
							localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }));
							dispatch({ type: "UPDATEPIC", payload: result.pic });
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [image]);
	const updatePhoto = (file) => {
		setImage(file);
	};

	return (
		<div className="profile">
			<div className="UserProfile">
				<div>
					<img className="profile-pic" src={state ? state.pic : "..."} alt={state.name} />
				</div>
				<div>
					<h4>{state ? state.name : "Loading.."}</h4>
					<h6>{state ? state.email : "Loading.."}</h6>
					<div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
						<h6>
							<b>{mypics.length}</b>posts
						</h6>
						<h6>
							<b>{state ? state.followers.length : "0"}</b>followers
						</h6>
						<h6>
							<b>{state ? state.following.length : "0"}</b>followings
						</h6>
					</div>
					<div className="file-field input-field">
						<div className="btn-SU">
							<span>Update Profile Photo</span>
							<input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
						</div>
					</div>
				</div>
			</div>

			<div className="gallery">
				{mypics.map((item) => {
					return <img key={item._id} className="item" src={item.photo} alt={item.body} />;
				})}
			</div>
		</div>
	);
};

export default Profile;
