import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaDoorOpen } from "react-icons/fa";
import logo from "../img/logo.png";
import "../nav.css";

const Navbar = () => {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	const logout = () => {};

	return (
		<header>
			<img alt="UTMSIRLogo" src={logo} height="80vh" />
			<nav ref={navRef}>
				<Link to="/" className="a">
					Amazing Posts
				</Link>
				<Link to="/mates" className="a">
					Possible Mates
				</Link>
				<Link to="/requests" className="a">
					Requests
				</Link>
				<Link to="/recommend" className="a">
					Recommendations
				</Link>
				<Link to="/about" className="a">
					About Us
				</Link>
				<button className="nav-btn nav-close-btn" onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<div>
				<Link to="/profile">Hi, User</Link>
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
