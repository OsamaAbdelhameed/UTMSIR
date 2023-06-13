import React, { useEffect, useState } from "react";
import { URL, role, token } from "../Consts";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import RequestForm from "../components/RequestForm";

const Requests = () => {
	const [requests, setRequests] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [request, setReq] = useState({});

	const states = {
		new: "New",
		u: "Updated",
		r: "Rejected",
		a: "Accepted",
	};

	const handleChange = (e) => {
		setReq({ ...request, status: "u", [e.target.name]: e.target.value });
		console.log(request);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(request);

		const MySwal = withReactContent(Swal);
		try {
			const { data } = await axios.put(
				`${URL}/request/${request._id}`,
				{
					...request,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			let updatedRequests = requests.map((req) => {
				if (req._id === request._id)
					req = {
						...req,
						status: request.status,
						desc: request.desc,
						price: request.price,
						arrivalDate: request.arrivalDate,
					};
				return req;
			});
			setRequests([...updatedRequests]);
			console.log(requests);

			console.log(data);
			MySwal.fire(<p>Request updated successfully</p>);
		} catch (e) {
			console.log(e);
			let msg = e.message;
			if (e.response.status === 422) {
				msg = e.response.data.err.details[0].message;
			}
			if (e.response.status === 500 || e.response.data.message)
				msg = e.response.data.message;
			MySwal.fire(<p>{msg}</p>);
		}
	};

	const getRequests = async () => {
		try {
			console.log(`${URL}/request`);
			const { data } = await axios.get(`${URL}/request`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setRequests(data.requests);
			console.log(requests);
		} catch (error) {
			console.error(error);
		}
	};

	const changeState = async (id, status) => {
		const MySwal = withReactContent(Swal);
		console.log(id, status);

		try {
			console.log(`${URL}/request/${id}`);
			const { data } = await axios.patch(
				`${URL}/request/${id}`,
				{ status },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			let updatedRequests = requests.map((req) => {
				if (req._id === id) req.status = status;
				return req;
			});
			setRequests([...updatedRequests]);
			console.log(requests);
			console.log(data);
			MySwal.fire(<p>Request become "{status}" successfully</p>);
		} catch (error) {
			console.error(error);
			MySwal.fire(<p>{error.message}</p>);
		}
	};

	useEffect(() => {
		getRequests();
	}, []);

	return (
		<div className="form-container back main">
			<table>
				<thead>
					<th>Num</th>
					<th className="huge">Post Title</th>
					<th>Student Name</th>
					<th>Post Owner</th>
					<th>Post Price</th>
					<th>Requested Price</th>
					<th>Request Notes</th>
					<th>Arrival Date</th>
					<th>Status & Actions</th>
				</thead>
				{requests.length !== 0 ? (
					<tbody>
						{requests.map((req, index) => (
							<tr key={index}>
								<td>
									<span>{index + 1}</span>
								</td>
								<td className="huge">
									<Link to={"/post/" + req.post._id} state={req.post}>
										<span className="l">{req.post.title}</span>
									</Link>
								</td>
								<td>
									<span>{req.owner.name}</span>
								</td>
								<td>
									<span>{req.postOwner.name}</span>
								</td>
								<td>
									<span>{req.post.price}</span>
								</td>
								<td>
									<span>{req.price}</span>
								</td>
								<td>
									<span>{req.desc}</span>
								</td>
								<td>
									<span>{req.arrivalDate}</span>
								</td>
								<td>
									<span>{states[req.status]}</span>
									{(req.status === "new" || req.status === "u") &&
										(role === "ag" || role === "o") && (
											<div className="btn-container">
												<button
													className="inside-login-btn auth-btn"
													onClick={() => changeState(req._id, "a")}
												>
													Accept
												</button>
												<button
													className="inside-login-btn google-btn"
													onClick={() => changeState(req._id, "r")}
												>
													Reject
												</button>
											</div>
										)}
									{req.status === "r" && role === "s" && (
										<div className="btn-container">
											<button
												className="inside-login-btn face-btn"
												onClick={() => {
													setReq(req);
													setIsEdit(true);
												}}
											>
												Edit
											</button>
										</div>
									)}
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
			<div></div>
			<RequestForm
				isRequest={isEdit}
				setIsRequest={setIsEdit}
				title={request.title}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				request={request}
			/>
		</div>
	);
};

export default Requests;
