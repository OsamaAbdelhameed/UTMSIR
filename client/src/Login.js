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

const Login = () => {
	const [isSignup, setSignup] = useState(true);
	const [form, setForm] = useState({});

	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isFile, setIsFile] = useState(false);
	// isFile used to show if upload file checkbox is checked or not to display file input
	const [isPicker, setIsPicker] = useState(false);

	const genderOps = [
		{ value: "m", label: "Male" },
		{ value: "f", label: "Female" },
	];

	const handleSubmit = (e) => {};
	const handleChange = (e) => {};

	useEffect(() => {
		if (isFile) {
		}
	}, [form.avatar]);

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
							<div className="input-field">
								<label htmlFor="gender">Gender</label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									defaultValue={genderOps[0]}
									isSearchable={true}
									name="gender"
									options={genderOps}
								/>
							</div>
						) && (
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
				</form>
			</div>
			<img alt="IMAGE433084327788" src={green} className="login-image" />
		</div>
	);
};

export default Login;
