import React, { useState } from "react";
import Select from "react-select";

import axios from "axios";
import { PickerOverlay } from "filestack-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import logo from "./img/logo.png";
import green from "./img/green.png";
import "./login.css";
import { URL, fileApi, roleOps, genderOps, cookies } from "./Consts";

const Auth = () => {
	const [isSignup, setSignup] = useState(true);
	const [form, setForm] = useState({ gender: "m", role: "s" });
	const [image, setImage] = useState("");

	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isFile, setIsFile] = useState(false);
	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isPicker, setIsPicker] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);
		form.gender = form.genchar === "m" ? false : true;

		delete form.genchar;
		const MySwal = withReactContent(Swal);
		try {
			const {
				data: { token, id, name, role, img },
			} = await axios.post(`${URL}/user/${isSignup ? "signup" : "login"}`, {
				...form,
			});

			if (isSignup) {
				MySwal.fire(<p>Sign up done successfully</p>);
			} else {
				console.log(token, name, id, role, img);

				cookies.set("token", token);
				cookies.set("username", name);
				cookies.set("id", id);
				cookies.set("role", role);
				cookies.set("img", img);
				MySwal.fire(<p>Sign in done successfully</p>);
				window.location.reload();
			}
		} catch (e) {
			console.log(e);
			// console.log(e.response);
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
						<>
							<div className="input-field">
								<label htmlFor="firstName" className="longlabel">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									placeholder="First Name from Matric Card/IKad"
									onChange={handleChange}
									required
								/>
							</div>
							<div className="input-field">
								<label htmlFor="lastName" className="longlabel">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									placeholder="Last Name from Matric Card/IKad"
									onChange={handleChange}
									required
								/>
							</div>
						</>
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
									name="genchar"
									onChange={(option) => {
										setForm({ ...form, genchar: option.value });
										console.log(form);
									}}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="Role">Role</label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									defaultValue={roleOps[0]}
									isSearchable={true}
									options={roleOps}
									name="role"
									onChange={(option) => {
										setForm({ ...form, role: option.value });
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
							<div className="input-field">
								<label htmlFor="phone" className="longlabel">
									Phone
								</label>
								<input
									type="text"
									name="phone"
									placeholder="Phone number with whatsapp account"
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
					{isSignup && form.role === "s" ? (
						<div className="input-field">
							<label htmlFor="study" className="longlabel">
								Field
							</label>
							<input
								type="text"
								name="field"
								placeholder="Specialization taken in UTM"
								onChange={handleChange}
								required
							/>
						</div>
					) : (
						isSignup && (
							<div className="input-field">
								<label htmlFor="houses">Number of Properties</label>
								<input
									type="number"
									name="numOfHouses"
									min="0"
									placeholder="Number of houses available for rent"
									onChange={handleChange}
									required
								/>
							</div>
						)
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
					<br />
					<br />
					<br />
				</form>
			</div>
			<div className="login-image-div">
				<img alt="IMAGE433084327788" src={green} className="login-image" />
			</div>
		</div>
	);
};

export default Auth;
