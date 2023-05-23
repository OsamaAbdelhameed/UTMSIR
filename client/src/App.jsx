import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Apartment from "./pages/Apartment";
import Feedback from "./pages/Feedback";
import Recommend from "./pages/Recommend";
import Requests from "./pages/Requests";
import Request from "./pages/Request";
import Apartments from "./pages/Apartments";
import Users from "./pages/Users";
import Footer from "./components/Footer";
import Mates from "./pages/Mates";
import { URL, id, token } from "./Consts";
import axios from "axios";
import Post from "./pages/Post";
import PostForm from "./components/PostForm";

function App() {
	const [user, setUser] = useState({});

	const getProfile = async () => {
		try {
			console.log(`${URL}/user/${id}`);
			const { data } = await axios.get(`${URL}/user/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUser(data.user);
			console.log(user);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, [token]);

	if (!token) return <Auth />;

	return (
		<div className="container">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:postId/edit" element={<PostForm />} />
					<Route path="/add-post" element={<PostForm />} />
					<Route path="/mates" element={<Mates />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/manage-user" element={<Users />} />
					<Route
						path="/profile"
						element={<Profile user={user} setUser={setUser} />}
					/>
					<Route path="/requests" element={<Requests />} />
					<Route path="/request/:id" element={<Request />} />
					<Route path="/apartment" element={<Apartments />} />
					<Route path="/apartment/:id" element={<Apartment />} />
					<Route path="/recommend" element={<Recommend />} />
					<Route path="/feedback/:recommendId" element={<Feedback />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
