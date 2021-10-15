import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
	const history = useHistory();
	const [image, setImage] = useState("");
	const [body, setBody] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (url) {
			fetch("/createpost", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
				body: JSON.stringify({
					pic: url,
					body,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) {
						M.toast({ html: data.error, classes: "#e53935 red darken-1" });
					} else {
						M.toast({ html: "Posted Successfully", classes: "#00c853 green accent-4" });
						history.push("/");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [url]);

	const postDetails = () => {
		console.log(image);
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
				setUrl(data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="card input-filled"
			style={{
				margin: "60px auto",
				maxWidth: "400px",
				padding: "20px",
				textAlign: "center",
				zIndex: -2
			}}>
			<div className="file-field input-field">
				<div className="btn #42a5f5 blue darken-1">
					<span>Choose Photo</span>
					<input type="file" onChange={(e) => setImage(e.target.files[0])} />
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text" />
				</div>
			</div>
			<input
				type="text"
				placeholder="add caption · · ·"
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<button
				className="btn waves-effect waves-light #42a5f5 blue darken-1"
				style={{ width:"90%",maxWidth: "360px", marginTop: "15px",margin:"auto" }}
				onClick={() => postDetails()}>
				Post
			</button>
		</div>
	);
};
export default CreatePost;