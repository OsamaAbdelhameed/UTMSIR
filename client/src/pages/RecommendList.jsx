import React, { useEffect, useRef, useState } from "react";
import { URL, id, role, token } from "../Consts";
import { Link } from "react-router-dom";
import axios from "axios";
import { MatesTable } from "../components/MatesTable";
import { RoomsTable } from "../components/RoomsTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RecommendList = () => {
	const [isMates, setIsMates] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [mates, setMates] = useState([]);

	const [isOps, setIsOps] = useState(false);
	const [isRoom, setIsRoom] = useState(false);
	const [ops, setOps] = useState([]);
	const [isFeedback, setFeedback] = useState(false);
	const [obj, setObj] = useState({});

	const requestRef = useRef(null);

	// Close the form when clicking outside of it
	const handleClickOutside = (event) => {
		if (requestRef.current && !requestRef.current.contains(event.target)) {
			setIsOps(false);
			setIsRoom(false);
			setFeedback(false);
		}
	};

	useEffect(() => {
		if (isOps || isRoom || isFeedback) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOps, isRoom, isFeedback]);

	const handleChange = (e) => {
		setObj({ ...obj, [e.target.name]: e.target.value });
		console.log(obj);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(obj);
		// obj.owner = id;

		const MySwal = withReactContent(Swal);
		console.log(`${URL}/recommend/${isFeedback}/add-feedback`);
		try {
			const { data } = await axios.post(
				`${URL}/recommend/${isFeedback}/add-feedback`,
				{
					...obj,
					isMates,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log(data);

			let updatedRecommends = isMates
				? mates.map((req) => {
						if (req._id === isFeedback)
							req = {
								...req,
								feedback: data.feed._id,
							};
						return req;
				  })
				: rooms.map((req) => {
						if (req._id === isFeedback)
							req = {
								...req,
								feedback: data.feed._id,
							};
						return req;
				  });
			if (isMates) setMates([...updatedRecommends]);
			else setRooms([...updatedRecommends]);
			console.log(mates, rooms);

			MySwal.fire(<p>Feedback created successfully</p>);
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

	useEffect(() => {
		console.log(isRoom);
	}, [isRoom]);

	return (
		<div className={`form-container back main ${role === "s" && "mar"}`}>
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
			<div className="btn-container">
				<button
					className="inside-login-btn face-btn"
					style={{ marginTop: "50px" }}
					onClick={() => setIsMates(!isMates)}
				>
					{isMates ? "Rooms List" : "Mates List"}
				</button>
			</div>
			{isMates ? (
				<MatesTable
					mates={mates}
					setOps={setOps}
					setIsOps={setIsOps}
					setFeedback={setFeedback}
				/>
			) : (
				<RoomsTable
					rooms={rooms}
					r={isRoom}
					setFeedback={setFeedback}
					setRoom={setIsRoom}
				/>
			)}
			<div
				className={`req-form-container ${
					isFeedback || isOps || isRoom ? "open" : ""
				}`}
				ref={requestRef}
			>
				{isFeedback ? (
					<form
						onSubmit={handleSubmit}
						style={
							isFeedback && {
								position: "absolute",
								top: "-350px",
							}
						}
					>
						<h2>Review Recommendation</h2>
						<label htmlFor="price" className="longlabel">
							Efficient
						</label>
						<input
							type="number"
							name="efficient"
							style={{ width: "95%" }}
							placeholder="Rate from 0 to 5"
							onChange={handleChange}
							min="0"
							max="5"
							required
						/>
						<label htmlFor="price" className="longlabel">
							Logical
						</label>
						<input
							type="number"
							name="logical"
							style={{ width: "95%" }}
							placeholder="Rate from 0 to 5"
							onChange={handleChange}
							min="0"
							max="5"
							required
						/>
						<label htmlFor="price" className="longlabel">
							Useful
						</label>
						<input
							type="number"
							name="useful"
							style={{ width: "95%" }}
							placeholder="Rate from 0 to 5"
							onChange={handleChange}
							min="0"
							max="5"
							required
						/>
						<label htmlFor="desc" className="longlabel">
							Opinion
						</label>
						<textarea
							type="text"
							name="opinion"
							style={{ width: "95%" }}
							placeholder="Proper description for your experience"
							onChange={handleChange}
							required
						/>
						<div className="btn-container">
							<button type="submit" className="inside-login-btn auth-btn">
								Send Review
							</button>
							<button type="reset" className="inside-login-btn google-btn">
								Reset
							</button>
						</div>
						<br />
					</form>
				) : (
					<form
						style={
							isRoom || isOps
								? {
										position: "absolute",
										top: "-250px",
										width: "50%",
								  }
								: {}
						}
					>
						{isRoom ? (
							<h2>{isRoom}</h2>
						) : (
							<h2>
								<div>Name{"    "}Percentage</div>
								{ops.map((op) => (
									<div>
										{op.name} {op.similarity}
									</div>
								))}
							</h2>
						)}
					</form>
				)}
			</div>
		</div>
	);
};

export default RecommendList;
