import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { role } from "../Consts";

export const MatesTable = ({ mates, setIsOps, setOps, setFeedback }) => {
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
				<th>Feedback</th>
			</thead>
			{mates && mates.length !== 0 ? (
				<tbody>
					{mates.map((mate, index) => (
						<tr key={mate}>
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
											setOps([...mate.options]);
											setIsOps(true);
										}}
									>
										Show Mates
									</button>
								</div>
							</td>
							<td>
								<div className="btn-container">
									{mate.feedback ? (
										<FaCheck />
									) : role === "a" ? (
										<FaTimes />
									) : (
										<button
											className="inside-login-btn face-btn"
											onClick={() => {
												setFeedback(mate._id);
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
