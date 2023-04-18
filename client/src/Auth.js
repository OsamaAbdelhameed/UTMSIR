import React, { useState, useEffect } from "react";
import Select from "react-select";

import Cookies from "universal-cookie";
import axios from "axios";
import { PickerOverlay } from "filestack-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import logo from "./img/logo.png";
import green from "./img/green.png";
import "./login.css";

const cookies = new Cookies();
const fileApi = "A1k2ydUGKQDCtHaCnNuwYz";

const Auth = () => {
	const [isSignup, setSignup] = useState(true);
	const [form, setForm] = useState({});
	const [image, setImage] = useState("");

	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isFile, setIsFile] = useState(false);
	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isPicker, setIsPicker] = useState(false);

	const genderOps = [
		{ value: "m", label: "Male" },
		{ value: "f", label: "Female" },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);
		// const URL = "https://chatoo-sg.herokuapp.com/auth";
		const URL = "http://localhost:5000/auth";

		const MySwal = withReactContent(Swal);
		try {
			const {
				data: { token, userId, hashedPassword, firstName, lastName },
			} = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
				...form,
			});

			cookies.set("token", token);
			cookies.set("username", firstName + " " + lastName);
			cookies.set("userId", userId);

			if (isSignup) {
				cookies.set("img", form.img);
				cookies.set("hashedPassword", hashedPassword);
				MySwal.fire(<p>Sign up done successfully</p>);
			} else {
				MySwal.fire(<p>Sign in done successfully</p>);
			}

			window.location.reload();
		} catch (e) {
			MySwal.fire(<p>Wrong inputs</p>);
		}
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	// useEffect(() => {
	// 	if (isFile) {
	// 	}
	// }, [form.avatar]);

	return (
		<div className="auth-container">
			<div className="form-container">
				<img className="login-utmsir-logo" alt="UTMSIRLogo117781" src={logo} />
				<h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
				<div className="btn-container">
					<button className="outside-login-btn google-btn">
						Login with Google
					</button>
					<button className="outside-login-btn face-btn">
						Login with Facebook
					</button>
				</div>
				<span className="login-text">
					<hr />
					<span>Or</span>
					<hr />
				</span>
				<form onSubmit={handleSubmit}>
					{isSignup && (
						<div className="input-field">
							<label htmlFor="firstName" className="longlabel">
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								placeholder="First Name from Matric Card"
								onChange={handleChange}
								required
							/>
						</div>
					)}
					{isSignup && (
						<div className="input-field">
							<label htmlFor="lastName" className="longlabel">
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name from Matric Card"
								onChange={handleChange}
								required
							/>
						</div>
					)}
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							placeholder="Valid Email Address"
							onChange={handleChange}
							required
						/>
					</div>
					{isSignup && (
						<>
							<div className="input-field">
								<label htmlFor="gender">Gender</label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									defaultValue={genderOps[0]}
									isSearchable={true}
									options={genderOps}
									name="gender"
									onChange={(option) => {
										setForm({ ...form, gender: option.value });
										console.log(form);
									}}
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
									required
								/>
							</div>
							<div className="norm">
								<input
									type="checkbox"
									name="uploadImg"
									onChange={() => setIsFile(!isFile)}
								/>
								<label htmlFor="uploadImg">Upload Picture</label>
							</div>
							{isFile ? (
								<div className="avatar img input-field">
									<label htmlFor="img">Upload Image (.png, .jpg)</label>
									{image ? (
										<img
											src={image && image.filesUploaded[0].url}
											alt="imageUploded"
											style={{ width: 75, height: 75 }}
										/>
									) : (
										<div className="auth__form-container_fields-content_button">
											<button
												className="inside-login-btn face-btn"
												onClick={() =>
													isPicker ? setIsPicker(false) : setIsPicker(true)
												}
											>
												Choose Image
											</button>
										</div>
									)}
									{isPicker && (
										<PickerOverlay
											apikey={fileApi}
											onSuccess={(res) => {
												console.log(res);
												setImage(res);
												setForm({ ...form, img: res.filesUploaded[0].url });
												setIsPicker(false);
											}}
											onError={(res) => alert(res)}
											pickerOptions={{
												maxFiles: 1,
												accept: ["image/*"],
												errorsTimeout: 2000,
												maxSize: 1 * 1000 * 1000,
											}}
										/>
									)}
								</div>
							) : (
								<div className="avatar input-field">
									<label htmlFor="avatarURL" className="longlabel">
										Avatar URL
									</label>
									<input
										type="text"
										name="img"
										placeholder="Personal image URL"
										onChange={handleChange}
										required
									/>
								</div>
							)}
						</>
					)}
					{!isFile && form.img && (
						<img
							src={form.img}
							alt="imageUploded"
							style={{ width: 75, height: 75 }}
						/>
					)}
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Correct Password"
							onChange={handleChange}
							required
						/>
					</div>
					<div className="btn-container">
						<button type="submit" className="inside-login-btn auth-btn">
							{isSignup ? "Register" : "Login"}
						</button>
						<button type="reset" className="inside-login-btn google-btn">
							Reset
						</button>
					</div>
					<p onClick={() => setSignup(!isSignup)}>
						{isSignup
							? "Already have account? Sign In"
							: "Don't have an account Sign Up"}
					</p>
				</form>
			</div>
			<img alt="IMAGE433084327788" src={green} className="login-image" />
		</div>
	);
};

export default Auth;
