import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { results, token, URL } from "../Consts";

const RecommendRoom = () => {
	const [form, setForm] = useState({
		matesInsideRoom: false,
		hasTransport: false,
		isInsideUTM: false,
		type: 1.0,
	});
	const typeOps = [
		{
			label: "Master",
			value: 1.0,
		},
		{
			label: "Medium",
			value: 2.0,
		},
		{
			label: "Small",
			value: 3.0,
		},
		{
			label: "Shareable",
			value: 4.0,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);

		const MySwal = withReactContent(Swal);
		try {
			const aiForm = {
				room_type: form.type,
				single_bed: form.matesInsideRoom ? 1 : 0,
				budget: form.budget,
				have_transportation: form.hasTransport ? 1 : 0,
				inside_utm: form.isInsideUTM ? 1 : 0,
			};
			console.log(aiForm);
			const aiData = await axios.post(
				"https://utmsir-room.herokuapp.com/predict",
				aiForm
			);

			console.log(aiData);

			form.name = results[aiData.data.prediction - 1].value;
			// form.type = ;
			const { data } = await axios.post(
				`${URL}/recommend/room`,
				{
					...form,
					type: typeOps[form.type - 1].label,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log(data);
			MySwal.fire(
				<p>
					Room Recommended Successfully
					<br />
					Expected Room is {form.name}
				</p>
			);
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

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		console.log(form);
	};

	return (
		<div className="form-container back main post-parent">
			<h2 style={{ marginLeft: "20px", flex: "1" }}>Recommend New Room</h2>
			<form onSubmit={handleSubmit} style={{ flex: "10" }}>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Room Type
					</label>
					<Select
						className="basic-single"
						classNamePrefix="select"
						defaultValue={typeOps[0]}
						isSearchable={true}
						options={typeOps}
						name="type"
						onChange={(option) => {
							setForm({ ...form, type: option.value });
							console.log(form);
						}}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="price" className="longlabel">
						Budget
					</label>
					<input
						type="num"
						name="budget"
						value={form.budget}
						placeholder="Maximum budget available for monthly rent + bills"
						min="0"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="norm">
					<input
						type="checkbox"
						name="isInsideUTM"
						onChange={() => {
							setForm({ ...form, isInsideUTM: !form.isInsideUTM });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">Room should be inside UTM campus</label>
				</div>
				<div className="norm" style={{ margin: "15px 0px" }}>
					<input
						type="checkbox"
						name="matesInsideRoom"
						onChange={() => {
							setForm({ ...form, matesInsideRoom: !form.matesInsideRoom });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">
						No problem with mates sharing the room
					</label>
				</div>
				<div className="norm">
					<input
						type="checkbox"
						name="hasTransport"
						onChange={() => {
							setForm({ ...form, hasTransport: !form.hasTransport });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">
						Public transportation to UTM is required
					</label>
				</div>
				<div className="btn-container">
					<button type="submit" className="inside-login-btn auth-btn">
						Recommend
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

export default RecommendRoom;
