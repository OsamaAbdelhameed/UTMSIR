import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { id, role } from "../Consts";

const Post = () => {
	const location = useLocation();
	const post = location.state;
	const [isRequest, setIsRequest] = useState(false);
	const [reqObj, setReqObj] = useState({});
	const [commentObj, setCommentObj] = useState({});
	const requestRef = useRef(null);

	const handleChange = (e) => {
		if (isRequest) {
			setReqObj({ ...reqObj, [e.target.name]: e.target.value });
			console.log(reqObj);
		} else {
			setCommentObj({ ...commentObj, [e.target.name]: e.target.value });
			console.log(commentObj);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		reqObj.owner = id;
	};

	// Close the form when clicking outside of it
	const handleClickOutside = (event) => {
		if (requestRef.current && !requestRef.current.contains(event.target)) {
			setIsRequest(false);
		}
	};

	useEffect(() => {
		if (isRequest) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isRequest]);

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
			{/* {role === "s" && ( */}
			<div>
				<button
					className="outside-login-btn face-btn"
					onClick={() => setIsRequest(!isRequest)}
				>
					Request
				</button>
			</div>
			{/* )} */}
			<h3>Comments</h3>
			<h4 className="comment-section">
				{post.comments.map((c) => (
					<div class="comment">
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
					<input type="checkbox" name="userName" />
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
			<div
				className={`req-form-container ${isRequest ? "open" : ""}`}
				ref={requestRef}
			>
				<form onSubmit={handleSubmit}>
					<h2>Request {post.title}</h2>
					<label htmlFor="desc" className="longlabel">
						Description
					</label>
					<textarea
						type="text"
						name="desc"
						style={{ width: "95%" }}
						placeholder="Proper description for the request"
						onChange={handleChange}
						required
					/>
					<label htmlFor="price" className="longlabel">
						Price
					</label>
					<input
						type="number"
						name="price"
						style={{ width: "95%" }}
						placeholder="Offered rental price"
						onChange={handleChange}
						required
					/>
					<label htmlFor="price" className="longlabel">
						Arrival Date
					</label>
					<input
						type="date"
						name="arrivalDate"
						style={{ width: "95%" }}
						// placeholder="Offered rental price"
						onChange={handleChange}
						required
					/>
					<div className="btn-container">
						<button type="submit" className="inside-login-btn auth-btn">
							Make Request
						</button>
						<button type="reset" className="inside-login-btn google-btn">
							Reset
						</button>
					</div>
					<br />
				</form>
			</div>
		</div>
	);
};

export default Post;
