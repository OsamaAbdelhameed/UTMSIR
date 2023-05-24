import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { URL, id, img, name, role, token } from "../Consts";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import RequestForm from "../components/RequestForm";

const Post = () => {
	const location = useLocation();
	const post = location.state;
	const [isRequest, setIsRequest] = useState(false);
	const [reqObj, setReqObj] = useState({});
	const [commentObj, setCommentObj] = useState({});

	const handleChange = (e) => {
		if (isRequest) {
			setReqObj({ ...reqObj, [e.target.name]: e.target.value });
			console.log(reqObj);
		} else {
			if (e.target.name === "userName") {
				let ans = commentObj.userName
					? { userName: false, title: "" }
					: { userName: true, title: name };
				setCommentObj({ ...commentObj, ...ans });
			} else setCommentObj({ ...commentObj, [e.target.name]: e.target.value });
			console.log(commentObj);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let url = "";
		let form = {};
		if (isRequest) {
			url = `${URL}/request`;
			form = { ...reqObj };
			form.post = post._id;
			form.status = "new";
			form.postOwner = post.owner;
		} else {
			url = `${URL}/post/${post._id}/add-comment`;
			form = { ...commentObj };
			form.img = img;
			delete form.userName;
		}

		form.owner = id;
		console.log(form);
		console.log(url);
		const MySwal = withReactContent(Swal);
		try {
			const { data } = await axios.post(
				url,
				{
					...form,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log(data);
			if (!isRequest) post.comments.push(form);
			console.log(post);
			MySwal.fire(
				<p>{isRequest ? "Request" : "Comment"} created successfully</p>
			);
		} catch (e) {
			console.log(e);
			let msg = e.message;
			if (e.response.status === 422) {
				msg = e.response.data.err.details[0].message;
			}
			if (e.response.status === 500 || e.response.data.message)
				msg = e.response.data.message;
			MySwal.fire(<p>{msg}</p>);
		}
	};

	const containerStyles = {
		width: "85vw",
		zIndex: 1,
		height: "50vh",
		margin: "0 auto",
	};

	return (
		<div className="form-container back main">
			<h2>{post.title}</h2>
			<div style={containerStyles}>
				<ImageSlider slides={post.imgs} />
			</div>
			<h3 style={{ marginTop: "30px" }}>{post.location}</h3>
			<h3>MYR {post.price}/Month</h3>
			<h3>
				{post.area}
				<sub>sq . ft</sub>
			</h3>
			<h4>
				{post.desc.split("\n").map((x) => (
					<>
						{x}
						<br />
					</>
				))}
			</h4>
			{role === "s" && (
				<div>
					<button
						className="outside-login-btn face-btn"
						onClick={() => setIsRequest(!isRequest)}
					>
						Request
					</button>
				</div>
			)}

			{(role === "ag" || role === "o") && (
				<div className="btn-container">
					<Link to={"edit"} state={post}>
						<button className="inside-login-btn face-btn">Edit</button>
					</Link>
					<button className="inside-login-btn google-btn">Delete</button>
				</div>
			)}

			<h3>Comments</h3>
			<h4 className="comment-section">
				{post.comments.map((c) => (
					<div class="comment" key={c}>
						<div class="comment-author">
							<img src={c.img} alt="User Avatar" />
						</div>
						<div>
							<h3>{c.title}</h3>
							<div class="comment-content">
								{c.content}
								{id === c.owner && (
									<div class="comment-actions">
										<button className="outside-login-btn face-btn">Edit</button>
										<button className="outside-login-btn google-btn">
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</h4>
			<form onSubmit={handleSubmit}>
				<div>
					<input type="checkbox" name="userName" onChange={handleChange} />
					<label htmlFor="title" className="longlabel">
						Title will be the user name
					</label>
				</div>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Title
					</label>
					<input
						type="text"
						name="title"
						placeholder="Proper post title for the accommodation"
						onChange={handleChange}
						value={commentObj.title}
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Content
					</label>
					<input
						type="text"
						name="content"
						placeholder="Comment content"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="btn-container">
					<button type="submit" className="inside-login-btn auth-btn">
						Add Comment
					</button>
					<button type="reset" className="inside-login-btn google-btn">
						Reset
					</button>
				</div>
				<br />
			</form>
			<RequestForm
				isRequest={isRequest}
				setIsRequest={setIsRequest}
				title={post.title}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default Post;
