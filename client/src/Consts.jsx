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
export const img = cookies.get("img");
export const role = cookies.get("role");
export const token = cookies.get("token");
export const languages = [
	{ label: "English", value: "EN" },
	{ label: "Spanish", value: "ES" },
	{ label: "French", value: "FR" },
	{ label: "German", value: "DE" },
	{ label: "Italian", value: "IT" },
	{ label: "Portuguese", value: "PT" },
	{ label: "Russian", value: "RU" },
	{ label: "Chinese", value: "ZH" },
	{ label: "Japanese", value: "JA" },
	{ label: "Korean", value: "KO" },
	{ label: "Arabic", value: "AR" },
	{ label: "Hindi", value: "HI" },
	{ label: "Bengali", value: "BN" },
	{ label: "Urdu", value: "UR" },
	{ label: "Turkish", value: "TR" },
	{ label: "Dutch", value: "NL" },
	{ label: "Swedish", value: "SV" },
	{ label: "Norwegian", value: "NO" },
	{ label: "Danish", value: "DA" },
	{ label: "Finnish", value: "FI" },
];

export const results = [
	{
		value: "Master room Taman U",
		desc: "Master room is a huge private room with private bathroom\nTaman U is the nearest area around UTM JB that has public transportation",
	},
	{
		value: "Medium room Taman U",
		desc: "Medium room is a medium private room with shared bathroom\nTaman U is the nearest area around UTM JB that has public transportation",
	},
	{
		value: "Small room Taman U",
		desc: "Small room is a small private room with shared bathroom\nTaman U is the nearest area around UTM JB that has public transportation",
	},
	{
		value: "KLG single room",
		desc: "KLG single room is a huge private room with private bathroom\nLocation: inside UTM JB and UTM buses are used for transportation",
	},
	{
		value: "KLG double room",
		desc: "KLG double room is a huge shared room with bathroom\nLocation: inside UTM JB and UTM buses are used for transportation",
	},
	{
		value: "KLG triple room",
		desc: "KLG single room is a huge shared room with bathroom\nLocation: inside UTM JB and UTM buses are used for transportation",
	},
	{
		value: "Master room in Garden Residences and far",
		desc: "Master room is a huge private room with private bathroom\nLocation: districts inside Skudai around Taman U like Mutiara Mas",
	},
	{
		value: "Medium room in Garden Residences and far",
		desc: "Medium room is a medium private room with shared bathroom\nLocation: districts inside Skudai around Taman U like Mutiara Mas",
	},
	{
		value: "Small room in Garden Residences and far",
		desc: "Small room is a small private room with shared bathroom\nLocation: districts inside Skudai around Taman U like Mutiara Mas",
	},
];
