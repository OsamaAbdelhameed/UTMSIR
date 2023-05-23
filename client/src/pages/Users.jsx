import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { URL, roleOps, token } from "../Consts";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [userOps, setUserOps] = useState([]);
	const [editObj, setEditObj] = useState({});
	const [isRole, setIsRole] = useState(false);

	const stateOps = [
		{ label: "Activate", value: "active" },
		{ label: "Deactivate", value: "deactive" },
		{ label: "Block", value: "blocked" },
	];

	const getUsers = async () => {
		try {
			console.log(`${URL}/admin/all-users`);
			const { data } = await axios.get(`${URL}/admin/all-users`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUsers(data.users);
			setUserOps(
				data.users.map((user) => {
					return { label: user.name, value: user._id };
				})
			);
			console.log(users);
			console.log(userOps);
		} catch (error) {
			console.error(error);
		}
	};

	const changeState = async (id, state, role) => {
		const MySwal = withReactContent(Swal);
		const body = state ? { state } : { role };
		console.log(id, state, role);

		try {
			console.log(`${URL}/admin/user/${id}`);
			const { data } = await axios.patch(`${URL}/admin/user/${id}`, body, {
				headers: { Authorization: `Bearer ${token}` },
			});
			let updatedUser = users.find((user) => user._id === id);
			if (state) updatedUser.state = state;
			else updatedUser.role = role;
			setUsers([...users.filter((user) => user._id !== id), updatedUser]);
			console.log(users);
			console.log(data);
			MySwal.fire(
				<p>
					{updatedUser.name} become{" "}
					{state ? updatedUser.state : updatedUser.role} successfully
				</p>
			);
		} catch (error) {
			console.error(error);
			MySwal.fire(<p>{error.message}</p>);
		}
	};

	useEffect(() => {
		getUsers();
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
					<th>Role</th>
					<th>State</th>
				</thead>

				{users.length !== 0 ? (
					<tbody>
						{users.map((user, index) => (
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
								<td>
									<span>
										{user.role === "a"
											? "Admin"
											: user.role === "ag"
											? "Agent"
											: user.role === "s"
											? "Student"
											: "Owner"}
									</span>
								</td>
								<td>
									<span>
										{user.state === "new" ? (
											<button
												className="inside-login-btn face-btn"
												onClick={() => changeState(user._id, "active")}
											>
												Activate
											</button>
										) : (
											user.state
										)}
									</span>
								</td>
							</tr>
						))}
						<h3>Update User</h3>
						<div className="input-field">
							<label htmlFor="gender">User Name</label>
							<Select
								className="basic-single"
								classNamePrefix="select"
								defaultValue={userOps[0]}
								isSearchable={true}
								options={userOps}
								// name="genchar"
								onChange={(option) => {
									setEditObj({ ...editObj, id: option.value });
									console.log(editObj);
								}}
							/>
						</div>
						<div className="norm">
							<input
								type="checkbox"
								name="changeRole"
								onChange={() => setIsRole(!isRole)}
							/>
							<label htmlFor="changeRole">Change Role</label>
						</div>
						{isRole ? (
							<div className="input-field">
								<label htmlFor="gender">New Role</label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									defaultValue={roleOps[0]}
									isSearchable={true}
									options={roleOps}
									// name="genchar"
									onChange={(option) => {
										setEditObj({ ...editObj, role: option.value });
										console.log(editObj);
									}}
								/>
							</div>
						) : (
							<div className="input-field">
								<label htmlFor="gender">New Status</label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									defaultValue={stateOps[0]}
									isSearchable={true}
									options={stateOps}
									// name="genchar"
									onChange={(option) => {
										setEditObj({ ...editObj, state: option.value });
										console.log(editObj);
									}}
								/>
							</div>
						)}
						<button
							className="inside-login-btn auth-btn"
							onClick={() =>
								changeState(editObj.id, editObj.state, editObj.role)
							}
							style={{ marginBottom: "90px" }}
						>
							Apply
						</button>
					</tbody>
				) : (
					<tbody>
						<h3 className="empty-table">No Users Found</h3>
					</tbody>
				)}
			</table>
		</div>
	);
};

export default Users;
