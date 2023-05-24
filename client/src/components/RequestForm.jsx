import React, { useEffect, useRef } from "react";

const RequestForm = ({
	isRequest,
	setIsRequest,
	title,
	handleChange,
	handleSubmit,
	request,
}) => {
	const requestRef = useRef(null);

	// Close the form when clicking outside of it
	const handleClickOutside = (event) => {
		if (requestRef.current && !requestRef.current.contains(event.target)) {
			setIsRequest(false);
		}
	};

	useEffect(() => {
		if (isRequest) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isRequest]);

	return (
		<div
			className={`req-form-container ${isRequest ? "open" : ""}`}
			ref={requestRef}
		>
			<form
				onSubmit={handleSubmit}
				style={request && { position: "absolute", top: "-350px" }}
			>
				<h2>Request {title}</h2>
				<label htmlFor="desc" className="longlabel">
					Description
				</label>
				<textarea
					type="text"
					name="desc"
					style={{ width: "95%" }}
					placeholder="Proper description for the request"
					onChange={handleChange}
					value={request && request.desc}
					required
				/>
				<label htmlFor="price" className="longlabel">
					Price
				</label>
				<input
					type="number"
					name="price"
					style={{ width: "95%" }}
					placeholder="Offered rental price"
					onChange={handleChange}
					value={request && request.price}
					required
				/>
				<label htmlFor="price" className="longlabel">
					Arrival Date
				</label>
				<input
					type="date"
					name="arrivalDate"
					style={{ width: "95%" }}
					// placeholder="Offered rental price"
					onChange={handleChange}
					value={request && request.arrivalDate}
					required
				/>
				<div className="btn-container">
					<button type="submit" className="inside-login-btn auth-btn">
						{request ? "Update" : "Make"} Request
					</button>
					<button type="reset" className="inside-login-btn google-btn">
						Reset
					</button>
				</div>
				<br />
			</form>
		</div>
	);
};

export default RequestForm;
