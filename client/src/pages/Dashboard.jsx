import React, { useState, useEffect } from "react";
import {
	PieChart,
	Pie,
	Tooltip,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
} from "recharts";
import { URL, token } from "../Consts";
import axios from "axios";

const Dashboard = () => {
	const [data, setData] = useState([]);

	const getCounts = async () => {
		try {
			console.log(`${URL}/admin/all-count`);
			const { data } = await axios.get(`${URL}/admin/all-count`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setData(data.counts);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCounts();
	}, []);

	return (
		<div className="form-container back main" style={{ textAlign: "center" }}>
			<h1>Graphs</h1>
			<div>
				<PieChart width={400} height={400}>
					<Pie
						data={data}
						dataKey="value"
						cx={200}
						cy={200}
						outerRadius={120}
						// fill="#F4C23C"
						fill="#8884d8"
						label
					/>
					{/* <Pie
						dataKey="name"
						isAnimationActive={true}
						outerRadius={80}
					/> */}
					<Tooltip />
				</PieChart>
			</div>
			<BarChart
				width={1000}
				height={500}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 80,
					bottom: 5,
				}}
				barSize={20}
			>
				<XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
				<YAxis />
				<Tooltip />
				<Legend />
				<CartesianGrid strokeDasharray="3 3" />
				<Bar dataKey="value" fill="#8884d8" background={{ fill: "#F4C23C" }} />
			</BarChart>
		</div>
	);
};

export default Dashboard;
