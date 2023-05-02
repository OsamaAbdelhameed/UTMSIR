import React, { useEffect, useState } from "react";
import { URL, id, token } from "../Consts";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";

const Main = () => {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			console.log(`${URL}/post`);
			const { data } = await axios.get(`${URL}/post`, {
				headers: { Authorization: `Bearer ${token}` },
			});
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

	return (
		<div className="container-form back main post-parent">
			{posts.map((x) => (
				<div className="post-items">
					<h2>{x.title}</h2>
					<div style={containerStyles}>
						<ImageSlider slides={x.imgs} />
					</div>
					<h3 style={{ marginTop: "30px" }}>{x.location}</h3>
					<h3>MYR {x.price}/Month</h3>
					<h3>
						{x.area}
						<sub>sq . ft</sub>
					</h3>
				</div>
			))}
		</div>
	);
};

export default Main;
