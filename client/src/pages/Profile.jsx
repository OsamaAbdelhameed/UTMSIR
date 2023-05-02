import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { URL, genderOps, id, token } from "../Consts";
import axios from "axios";

const Profile = ({ user, setUser }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editObj, setEditObj] = useState({});

	const handleChange = (e) => {
		setEditObj({ ...editObj, [e.target.name]: e.target.value });
		console.log(editObj);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(editObj);
		if (editObj.genchar)
			editObj.gender = editObj.genchar === "m" ? false : true;

		const MySwal = withReactContent(Swal);
		try {
			const response = await axios.put(`${URL}/user/${id}`, editObj, {
				headers: { Authorization: `Bearer ${token}` },
			});

			console.log(response);

			MySwal.fire(<p>Profile updated successfully</p>);
			setUser({ ...user, ...editObj });
			setIsEdit(false);
			// window.location.reload();
		} catch (e) {
			console.log(e);
			MySwal.fire(<p>{e.message}</p>);
		}
	};

	return (
		<div className="form-container back main">
			<h1>{user.name.split(" ")[0]} Profile</h1>
			<img
				src={user.img}
				alt="img"
				width={150}
				height={150}
				className="avatar"
			/>
			<h3>Email: {user.email}</h3>
			{isEdit ? (
				<>
					<div className="input-field">
						<label htmlFor="name" className="longlabel">
							Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Name from Matric Card/IKad"
							onChange={handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="age">Age</label>
						<input
							type="number"
							name="age"
							min="16"
							placeholder="Age >= 16"
							onChange={handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="phone" className="longlabel">
							Phone
						</label>
						<input
							type="text"
							name="phone"
							placeholder="Phone number with whatsapp account"
							onChange={handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="gender">Gender</label>
						<Select
							className="basic-single"
							classNamePrefix="select"
							defaultValue={genderOps[0]}
							isSearchable={true}
							options={genderOps}
							name="genchar"
							onChange={(option) => {
								setEditObj({ ...editObj, gender: option.value });
								console.log(editObj);
							}}
						/>
					</div>
				</>
			) : (
				<>
					<h3>Full Name: {user.name}</h3>
					<h3>Age: {user.age}</h3>
					<h3>Phone: {user.phone}</h3>
					<h3>Gender: {user.gender ? "Male" : "Female"}</h3>
				</>
			)}
			{user.role === "s" ? (
				<h3>Study Field: {user.field}</h3>
			) : user.role !== "a" ? (
				<h3>Number of Houses: {user.numOfHouses}</h3>
			) : (
				""
			)}
			<h3>
				Role:{" "}
				{user.role === "a"
					? "Admin"
					: user.role === "s"
					? "Student"
					: user.role === "ag"
					? "Agent"
					: "Owner"}
			</h3>
			<h3>State: {user.state.toUpperCase()}</h3>
			{isEdit && (
				<form onSubmit={handleSubmit}>
					<button className="inside-login-btn auth-btn">Apply</button>
				</form>
			)}
			<div>
				<button
					className={"inside-login-btn " + (isEdit ? "google-btn" : "face-btn")}
					style={{ border: "0" }}
					onClick={() => setIsEdit(!isEdit)}
				>
					{isEdit ? "Cancel Edit" : "Edit Profile"}
				</button>
			</div>
			<br />
			<br />
			<br />
		</div>
	);
};

export default Profile;
