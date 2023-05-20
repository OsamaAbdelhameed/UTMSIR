import React, { useEffect, useState } from "react";
import { URL, id, role, token } from "../Consts";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";
import { Link } from "react-router-dom";
import AddPost from "../components/AddPost";

const Main = ({ isAdd, setIsAdd }) => {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			console.log(`${URL}/post`);
			const { data } = await axios.get(`${URL}/post`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(data);
			setPosts(data.posts);
			console.log(posts);
		} catch (error) {
			console.error(error);
		}
	};

	const containerStyles = {
		width: "45vw",
		zIndex: 1,
		height: "35vh",
		margin: "0 auto",
	};

	useEffect(() => {
		getPosts();
	}, []);

	if (isAdd) return <AddPost />;

	return (
		<div
			className={`back main post-parent ${
				(role === "ag" || role === "o") && "mar"
			}`}
		>
			{(role === "ag" || role === "o") && (
				<div style={{ position: "absolute", top: "80px" }}>
					<button
						className="inside-login-btn face-btn"
						onClick={() => setIsAdd(true)}
					>
						Add Post
					</button>
				</div>
			)}
			{posts.map((post) => (
				<div className="post-items">
					<h2>{post.title}</h2>
					<div style={containerStyles}>
						<ImageSlider slides={post.imgs} />
					</div>
					<Link to={"post/" + post._id} state={post}>
						<h3 style={{ marginTop: "30px" }}>{post.location}</h3>
						<h3>MYR {post.price}/Month</h3>
						<h3>
							{post.area}
							<sub>sq . ft</sub>
						</h3>
					</Link>
					<div className="btn-container">
						<button className="inside-login-btn face-btn">Edit</button>
						<button className="inside-login-btn google-btn">Delete</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Main;
