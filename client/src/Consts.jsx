import Cookies from "universal-cookie";

export const URL = "http://localhost:9090";
export const fileApi = "A1k2ydUGKQDCtHaCnNuwYz";
export const genderOps = [
	{ value: "m", label: "Male" },
	{ value: "f", label: "Female" },
];
export const roleOps = [
	{ value: "s", label: "Student" },
	{ value: "o", label: "Owner" },
	{ value: "ag", label: "Agent" },
];
export const cookies = new Cookies();
export const name = cookies.get("username");
export const id = cookies.get("id");
export const role = cookies.get("role");
export const token = cookies.get("token");
