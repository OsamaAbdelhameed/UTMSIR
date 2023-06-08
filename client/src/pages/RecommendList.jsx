import React from "react";
import { URL, role, token } from "../Consts";
import { Link } from "react-router-dom";
import axios from "axios";

const RecommendList = () => {

	const getRequests = async () => {
		try {
			console.log(`${URL}/recommend`);
			const { data } = await axios.get(`${URL}/request`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setRequests(data.requests);
			console.log(requests);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className={`back main post-parent ${role === "s" && "mar"}`}>
			{role === "s" && (
				<div style={{ position: "absolute", top: "80px" }}>
					<Link to={"recommend-room"}>
						<button className="inside-login-btn face-btn">
							Recommend Room
						</button>
					</Link>
					<Link to={"recommend-mates"}>
						<button className="inside-login-btn auth-btn">
							Recommend Mates
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default RecommendList;
