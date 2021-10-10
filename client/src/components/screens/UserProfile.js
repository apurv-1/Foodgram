import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
	const [userProfile, setProfile] = useState(null);
	const { state, dispatch } = useContext(UserContext);
	const { userid } = useParams();
	const [showfollow, setShowfollow] = useState(state ? !state.following.includes(userid) : true);
	// console.log(userid);

	useEffect(() => {
		fetch(`/user/${userid}`, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				setProfile(result);
			});
	}, []);

	const followUser = () => {
		fetch("/follow", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
			body: JSON.stringify({
				followId: userid,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
				localStorage.setItem("user", JSON.stringify(data));
				setProfile((prevState) => {
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: [...prevState.user.followers, data._id],
						},
					};
				});
				setShowfollow(false);
			});
	};

	const unfollowUser = () => {
		fetch("/unfollow", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt"),
			},
			body: JSON.stringify({
				unfollowId: userid,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
				localStorage.setItem("user", JSON.stringify(data));

				setProfile((prevState) => {
					const newFollwer = prevState.user.followers.filter((item) => item !== data._id);
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: newFollwer,
						},
					};
				});
				setShowfollow(true);
			});
	};

	return (
		<>
			{userProfile ? (
				<div className="profile">
					<div className="UserProfile">
						<div>
							<img className="profile-pic" src={userProfile.user.pic} alt={userProfile.user.name} />
						</div>
						<div>
							<h4>{userProfile.user.name}</h4>
							<h6>{userProfile.user.email}</h6>
							<div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
								<h6>
									<b>{userProfile.posts.length}</b>posts
								</h6>
								<h6>
									<b>{userProfile.user.followers.length}</b>followers
								</h6>
								<h6>
									<b>{userProfile.user.following.length}</b>followings
								</h6>
							</div>
							{showfollow ? (
								<button
									className="btun-follow"
									style={{ width: "250px", marginTop: "15px", marginBottom: "15px", height: "28px" }}
									onClick={() => followUser()}>
									Follow
								</button>
							) : (
								<button
									className="btun-follow"
									style={{ width: "250px", marginTop: "15px", marginBottom: "15px", height: "28px" }}
									onClick={() => unfollowUser()}>
									Unfollow
								</button>
							)}
						</div>
					</div>

					<div className="gallery">
						{userProfile.posts.map((item) => {
							return <img key={item._id} className="item" src={item.photo} alt={item.body} />;
						})}
					</div>
				</div>
			) : (
				<h2>loading...</h2>
			)}{" "}
		</>
	);
};

export default Profile;