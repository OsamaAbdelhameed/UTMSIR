import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL, token } from "../Consts";

const Mates = () => {
	const [mates, setMates] = useState([]);

	const getMates = async () => {
		try {
			console.log(`${URL}/user/all-mates`);
			const { data } = await axios.get(`${URL}/user/all-mates`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setMates(data.users);
			console.log(mates);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMates();
	}, []);

	return (
		<div className="form-container back main">
			<table>
				<thead>
					<th>Num</th>
					<th>Avatar</th>
					<th>Name</th>
					<th>Email</th>
					<th>Gender</th>
					<th>Phone</th>
				</thead>

				{mates.length !== 0 ? (
					<tbody>
						{mates.map((user, index) => (
							<tr key={index}>
								<td>
									<span>{index + 1}</span>
								</td>
								<td>
									<img
										src={user.img}
										alt={user.name}
										width={50}
										height={50}
										style={{ borderRadius: "50%" }}
									/>
								</td>
								<td>
									<span>{user.name}</span>
								</td>
								<td>
									<span>{user.email}</span>
								</td>
								<td>
									<span>{user.gender ? "Female" : "Male"}</span>
								</td>
								<td>
									<span>{user.phone}</span>
								</td>
							</tr>
						))}
					</tbody>
				) : (
					<tbody>
						<h3 className="empty-table">No Mates Found</h3>
					</tbody>
				)}
			</table>
		</div>
	);
};

export default Mates;
