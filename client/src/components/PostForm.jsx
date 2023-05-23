import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PickerOverlay } from "filestack-react";
import { FaTimes } from "react-icons/fa";
import { URL, fileApi, id, token } from "../Consts";
import { useLocation, useParams } from "react-router-dom";

const PostForm = () => {
	const location = useLocation();
	const [form, setForm] = useState({
		imgs: [],
		numOfReqs: 0,
		comments: [],
		state: "new",
		...location.state,
	});
	const [imgUrl, setImgUrl] = useState("");
	// const post = ;
	let { postId } = useParams();

	console.log(form);

	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isPicker, setIsPicker] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		form.owner = id;
		console.log(form);

		const MySwal = withReactContent(Swal);
		try {
			const { data } = postId
				? await axios.put(
						`${URL}/post/${postId}`,
						{
							...form,
							state: "u",
						},
						{
							headers: { Authorization: `Bearer ${token}` },
						}
				  )
				: await axios.post(
						`${URL}/post`,
						{
							...form,
						},
						{
							headers: { Authorization: `Bearer ${token}` },
						}
				  );

			console.log(data);
			MySwal.fire(<p>Post {postId ? "updated" : "created"} successfully</p>);
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

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	return (
		<div className="form-container back main post-parent">
			<h2 style={{ marginLeft: "20px", flex: "1" }}>
				{postId ? "Edit" : "Create a New"} Post
			</h2>
			<form onSubmit={handleSubmit} style={{ flex: "10" }}>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Title
					</label>
					<input
						type="text"
						name="title"
						value={form.title}
						placeholder="Proper post title for the accommodation"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="desc" className="longlabel">
						Description
					</label>
					<textarea
						name="desc"
						value={form.desc}
						placeholder="Proper post description for the accommodation"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="price" className="longlabel">
						Price
					</label>
					<input
						type="num"
						name="price"
						value={form.price}
						placeholder="Accommodation rental price"
						min="0"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="location" className="longlabel">
						Location
					</label>
					<input
						type="text"
						name="location"
						value={form.location}
						placeholder="Accommodation address"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="avatar img input-field">
					<label htmlFor="img" style={{ width: "45%" }}>
						Pictures (.jpg, .png)
					</label>
					<input
						type="text"
						name="img"
						style={{ height: "25px" }}
						placeholder="Enter a vaild image link"
						onChange={(e) => {
							setImgUrl(e.target.value);
							console.log(imgUrl);
						}}
					/>
					<button
						className="outside-login-btn auth-btn"
						style={{ marginLeft: "5%", alignItems: "center" }}
						onClick={() => setForm({ ...form, imgs: [...form.imgs, imgUrl] })}
						disabled={imgUrl === ""}
					>
						Add
					</button>
					<div className="auth__form-container_fields-content_button">
						<button
							className="inside-login-btn face-btn"
							onClick={() =>
								isPicker ? setIsPicker(false) : setIsPicker(true)
							}
						>
							Upload Images
						</button>
					</div>
				</div>
				<div>
					{form.imgs.length !== 0 &&
						form.imgs.map((img) => (
							<div className="upload-img" key={img}>
								<button
									className="x"
									onClick={() =>
										setForm({
											...form,
											imgs: form.imgs.filter((x) => x !== img),
										})
									}
								>
									<FaTimes />
								</button>
								<img
									src={img}
									alt="imageUploded"
									style={{ width: 75, height: 75 }}
								/>
							</div>
						))}
					{isPicker && (
						<PickerOverlay
							apikey={fileApi}
							onSuccess={(res) => {
								console.log(res);
								setForm({
									...form,
									imgs: [
										...form.imgs,
										...res.filesUploaded.map((img) => img.url),
									],
								});
								console.log(form);
								setIsPicker(false);
							}}
							onError={(res) => alert(res)}
							pickerOptions={{
								maxFiles: 5,
								accept: ["image/*"],
								errorsTimeout: 2000,
								maxSize: 1 * 1000 * 1000,
							}}
						/>
					)}
				</div>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Bed Rooms
					</label>
					<input
						type="number"
						name="bedsNum"
						value={form.bedsNum}
						min="0"
						max="6"
						placeholder="Number of bedrooms in the accommodation"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Area
					</label>
					<input
						type="number"
						name="area"
						value={form.area}
						min="0"
						placeholder="Accommodation's area in square feet"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="btn-container">
					<button type="submit" className="inside-login-btn auth-btn">
						{postId ? "Edit" : "Add"} Post
					</button>
					<button type="reset" className="inside-login-btn google-btn">
						Reset
					</button>
				</div>
				<br />
			</form>
		</div>
	);
};

export default PostForm;
