import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaDoorOpen } from "react-icons/fa";
import logo from "../img/logo.png";
import "../nav.css";
import { name, cookies, role } from "../Consts";

const Navbar = ({ setIsAdd }) => {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	const logout = () => {
		cookies.remove("token");
		cookies.remove("username");
		cookies.remove("email");
		cookies.remove("role");
		cookies.remove("img");

		window.location.reload();
	};

	return (
		<header>
			<img alt="UTMSIRLogo" src={logo} height="80vh" />
			<nav ref={navRef}>
				<Link
					to="/"
					className="a"
					onClick={() => {
						setIsAdd(false);
					}}
				>
					{role === "s" && "Amazing"} Posts {role !== "s" && "List"}
				</Link>
				{role === "a" && (
					<Link to="/manage-user" className="a">
						Users List
					</Link>
				)}
				{role === "s" && (
					<Link to="/mates" className="a">
						Possible Mates
					</Link>
				)}
				<Link to="/requests" className="a">
					Requests List
				</Link>
				{role === "s" && role === "a" && (
					<Link to="/recommend" className="a">
						Recommendations {role !== "s" && "List"}
					</Link>
				)}
				<Link to="/about" className="a">
					About Us
				</Link>
				<button className="nav-btn nav-close-btn" onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<div>
				<Link to="/profile">Hi, {name}</Link>
				<button className="nav-logout" onClick={logout}>
					<FaDoorOpen />
				</button>
			</div>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
};

export default Navbar;
