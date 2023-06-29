import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { role } from "../Consts";

export const RoomsTable = ({ rooms, setRoom, setFeedback }) => {
	return (
		<table>
			<thead>
				<th>Num</th>
				{role === "a" && <th>Avatar</th> && <th>Student Name</th>}
				<th>Type</th>
				<th>My Budget</th>
				<th>Has Transport</th>
				<th>Inside UTM</th>
				<th>Shared Room</th>
				<th>Results</th>
				<th>Info</th>
				<th>Feedback</th>
			</thead>
			{rooms && rooms.length !== 0 ? (
				<tbody>
					{rooms.map((room, index) => (
						<tr key={index}>
							<td>
								<span>{index + 1}</span>
							</td>
							{role === "a" && (
									<td>
										<img
											src={room.owner.img}
											alt={room.owner.name}
											width={50}
											height={50}
											style={{ borderRadius: "50%" }}
										/>
									</td>
								) && (
									<td>
										<span>{room.owner.name}</span>
									</td>
								)}
							<td>
								<span>{room.type}</span>
							</td>
							<td>
								<span>{room.budget}</span>
							</td>
							<td>{room.hasTransport ? <FaCheck /> : <FaTimes />}</td>
							<td>{room.isInsideUTM ? <FaCheck /> : <FaTimes />}</td>
							<td>{room.matesInsideRoom ? <FaCheck /> : <FaTimes />}</td>
							<td>
								<span>{room.name}</span>
							</td>
							<td>
								<div className="btn-container">
									<button
										className="inside-login-btn auth-btn"
										onClick={() => {
											setRoom(room.name);
										}}
									>
										Details
									</button>
								</div>
							</td>
							<td>
								<div className="btn-container">
									{room.feedback ? (
										<FaCheck />
									) : role === "a" ? (
										<FaTimes />
									) : (
										<button
											className="inside-login-btn face-btn"
											onClick={() => {
												setFeedback(room._id);
											}}
										>
											Review
										</button>
									)}
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
