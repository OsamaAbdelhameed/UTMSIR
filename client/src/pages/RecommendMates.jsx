import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { token, URL, languages } from "../Consts";

const RecommendMates = () => {
	const religionOps = [
		{
			label: "Islam",
		},
		{
			label: "Christianity",
		},
		{
			label: "Hinduism",
		},
		{
			label: "Atheism",
		},
		{ label: "Buddhism" },
		{ label: "Others" },
	];

	const [form, setForm] = useState({
		religion: religionOps[0].label,
		field: false,
		sameReligion: false,
		vaping: false,
		smoking: false,
		lang: [languages[0].value],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);

		const MySwal = withReactContent(Swal);
		try {
			const { data } = await axios.post(
				`${URL}/recommend/mates`,
				{
					...form,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			console.log(data);
			MySwal.fire(
				<p>
					Mates Recommended Successfully
					<br />
					{data.r.options.map((op) => (
						<div>
							{op.name} {parseFloat(op.similarity.toFixed(2))}
						</div>
					))}
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
			<h2 style={{ marginLeft: "20px", flex: "1" }}>Recommend New Mates</h2>
			<form onSubmit={handleSubmit} style={{ flex: "10" }}>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Religion
					</label>
					<CreatableSelect
						className="basic-single"
						classNamePrefix="select"
						defaultValue={religionOps[0]}
						isSearchable={true}
						options={religionOps}
						name="religion"
						onChange={(option) => {
							setForm({ ...form, religion: option.label });
							console.log(form);
						}}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="title" className="longlabel">
						Languages
					</label>
					<Select
						className="basic-single"
						classNamePrefix="select"
						defaultValue={[languages[0]]}
						isSearchable={true}
						isMulti
						options={languages}
						// style={{ width: "100%" }}
						name="lang"
						onChange={(options) => {
							setForm({ ...form, lang: [...options.map((op) => op.value)] });
							console.log(form);
						}}
					/>
				</div>
				<div className="input-field">
					<label htmlFor="price" className="longlabel">
						My Budget
					</label>
					<input
						type="num"
						name="myBudget"
						value={form.budget}
						placeholder="Maximum budget available for monthly rent + bills"
						min="0"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="input-field">
					<label htmlFor="price" className="longlabel">
						Expected Budget
					</label>
					<input
						type="num"
						name="expectedBudget"
						value={form.budget}
						placeholder="Maximum budget expected from a mate monthly (rent + bills)"
						min="0"
						onChange={handleChange}
						required
					/>
				</div>
				<div className="norm">
					<input
						type="checkbox"
						name="field"
						onChange={() => {
							setForm({ ...form, field: !form.field });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">Same field</label>
				</div>
				<div className="norm" style={{ margin: "15px 0px" }}>
					<input
						type="checkbox"
						name="sameReligion"
						onChange={() => {
							setForm({ ...form, sameReligion: !form.sameReligion });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">Same Religion</label>
				</div>
				<div className="norm" style={{ marginBottom: "15px" }}>
					<input
						type="checkbox"
						name="vaping"
						onChange={() => {
							setForm({ ...form, vaping: !form.vaping });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">No Problem with Vaping</label>
				</div>
				<div className="norm">
					<input
						type="checkbox"
						name="smoking"
						onChange={() => {
							setForm({ ...form, smoking: !form.smoking });
							console.log(form);
						}}
					/>
					<label htmlFor="changeRole">No Problem with Smoking</label>
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

export default RecommendMates;
