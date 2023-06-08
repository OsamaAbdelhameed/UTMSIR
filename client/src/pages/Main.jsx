import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { URL, role, token } from "../Consts";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PostsContext } from "../PostsProvider";

const Main = () => {
	// const [posts, setPosts] = useState([]);
	const { posts, setPosts } = useContext(PostsContext);
	const [isUpdate, setIsUpdate] = useState({ num: 0, update: false });
	const [state, setState] = useState("");
	const stateOps = [
		{ label: "Active", value: "active" },
		// { label: "Deactivate", value: "d" },
		{ label: "Reported", value: "r" },
		{ label: "Require more information", value: "n" },
	];

	const getPosts = async () => {
		try {
			console.log(`${URL}/post`);
			const { data } = await axios.get(`${URL}/post`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(data);
			setPosts(data.posts);
			if (role === "s")
				setPosts([...data.posts.filter((p) => p.state === "active")]);
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

	const changePostState = async (pid, state) => {
		const MySwal = withReactContent(Swal);
		console.log(state);

		try {
			console.log(`${URL}/post/${pid}`);
			const { data } = await axios.patch(
				`${URL}/post/${pid}`,
				{ state },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			let updatedPosts = posts.map((post) => {
				if (post._id === pid) post.state = state;
				return post;
			});
			setPosts([...updatedPosts]);
			console.log(posts);
			console.log(data);
			setState("active");
			MySwal.fire(<p>Post become "{state}" successfully</p>);
		} catch (error) {
			console.error(error);
			MySwal.fire(<p>{error.message}</p>);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div
			className={`back main post-parent ${
				(role === "ag" || role === "o") && "mar"
			}`}
		>
			{(role === "ag" || role === "o") && (
				<div style={{ position: "absolute", top: "80px" }}>
					<Link to={"add-post"}>
						<button className="inside-login-btn face-btn">Add Post</button>
					</Link>
				</div>
			)}
			{posts.map((post, i) => (
				<div className="post-items" key={i}>
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
					{role !== "s" && (
						<h3>
							{post.state === "active"
								? "Active"
								: post.state === "u"
								? "Updated"
								: post.state === stateOps[1].value
								? stateOps[1].label
								: post.state === stateOps[2].value
								? stateOps[2].label
								: post.state === "d"
								? "Deactivated"
								: "New"}
						</h3>
					)}
					{(role === "ag" || role === "o") && (
						<div className="btn-container">
							<Link to={"post/" + post._id + "/edit"} state={post}>
								<button className="inside-login-btn face-btn">Edit</button>
							</Link>
							<button
								className="inside-login-btn auth-btn"
								onClick={() =>
									post.state === "d"
										? changePostState(post._id, "active")
										: changePostState(post._id, "d")
								}
							>
								{post.state === "d" ? "Activate" : "Deactivate"}
							</button>
							<button className="inside-login-btn google-btn">Delete</button>
						</div>
					)}
					{role === "a" &&
						(isUpdate.update && isUpdate.num === i ? (
							<div className="btn-container">
								<div className="input-field">
									<label htmlFor="gender">State</label>
									<Select
										className="basic-single"
										classNamePrefix="select"
										defaultValue={stateOps[0]}
										isSearchable={true}
										options={stateOps}
										name="state"
										onChange={(option) => {
											setState(option.value);
											console.log(option);
										}}
									/>
								</div>
								<button
									className="inside-login-btn auth-btn"
									onClick={() => changePostState(post._id, state)}
								>
									Update
								</button>
								<button
									className="inside-login-btn google-btn"
									onClick={() => setIsUpdate({ num: i, update: false })}
								>
									Cancel
								</button>
							</div>
						) : (
							<div className="btn-container">
								{(!post.state ||
									post.state === "new" ||
									post.state === "u") && (
									<button
										className="inside-login-btn auth-btn"
										onClick={() => changePostState(post._id, "active")}
									>
										Activate
									</button>
								)}
								<button
									className="inside-login-btn face-btn"
									onClick={() => setIsUpdate({ num: i, update: true })}
								>
									Change State
								</button>
							</div>
						))}
				</div>
			))}
		</div>
	);
};

export default Main;
