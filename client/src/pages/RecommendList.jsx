import React, { useEffect, useState } from "react";
import { URL, role, token } from "../Consts";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const MatesTable = ({ mates }) => {
	const [isOps, setIsOps] = useState(false);
	const [ops, setOps] = useState([]);

	return (
		<table>
			<thead>
				<th>Num</th>
				{role === "a" && <th>Avatar</th> && <th>Student Name</th>}
				<th>My Budget</th>
				<th>Expected Budget</th>
				<th>Languages</th>
				<th>Study Field</th>
				<th>Religion</th>
				<th>Smoking</th>
				<th>Vaping</th>
				<th>Options</th>
			</thead>
			{mates && mates.length !== 0 ? (
				<tbody>
					{mates.map((mate, index) => (
						<tr key={index}>
							<td>
								<span>{index + 1}</span>
							</td>
							{role === "a" && (
									<td>
										<img
											src={mate.owner.img}
											alt={mate.owner.name}
											width={50}
											height={50}
											style={{ borderRadius: "50%" }}
										/>
									</td>
								) && (
									<td>
										<span>{mate.owner.name}</span>
									</td>
								)}
							<td>
								<span>{mate.myBudget}</span>
							</td>
							<td>
								<span>{mate.expectedBudget}</span>
							</td>
							<td>
								<span>
									{mate.lang &&
										mate.lang.map((l) => <p key={l}>{l.toUpperCase()}</p>)}
								</span>
							</td>
							<td>
								<span>{mate.field ? mate.owner.field : "Not Included"}</span>
							</td>
							<td>
								<span>
									{mate.sameReligion ? mate.religion : "Not Included"}
								</span>
							</td>
							<td>{mate.smoking ? <FaCheck /> : <FaTimes />}</td>
							<td>{mate.vaping ? <FaCheck /> : <FaTimes />}</td>
							<td>
								<div className="btn-container">
									<button
										className="inside-login-btn auth-btn"
										onClick={() => {
											setOps(mate.options);
											setIsOps(true);
										}}
									>
										Show Mates
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			) : (
				<tbody>
					<h3 className="empty-table">No Requests Found</h3>
				</tbody>
			)}
		</table>
	);
};

const RecommendList = () => {
	const [isMates, setIsMates] = useState(true);
	const [rooms, setRooms] = useState([]);
	const [mates, setMates] = useState([]);

	const getRecommends = async () => {
		try {
			console.log(`${URL}/recommend`);
			const { data } = await axios.get(`${URL}/recommend`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setRooms(data.rooms);
			setMates(data.mates);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getRecommends();
	}, []);

	return (
		<div className={`back main post-parent ${role === "s" && "mar"}`}>
			{role === "s" && (
				<div
					className="btn-container"
					style={{ position: "absolute", top: "80px" }}
				>
					<button className="inside-login-btn face-btn">
						<Link to={"/recommend-room"}>Recommend Room</Link>
					</button>
					<button className="inside-login-btn auth-btn">
						<Link to={"/recommend-mates"}>Recommend Mates</Link>
					</button>
				</div>
			)}
			<button
				className="inside-login-btn face-btn"
				style={{ marginTop: "50px" }}
				onClick={() => setIsMates(!isMates)}
			>
				{isMates ? "Mates List" : "Rooms List"}
			</button>
			{isMates ? <MatesTable mates={mates} /> : "Rooms"}
		</div>
	);
};

export default RecommendList;
