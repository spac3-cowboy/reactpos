import jwtDecode from "jwt-decode";

const getStaffId = () => {
	const token = localStorage.getItem("access-token");

	if (token) {
		const id = jwtDecode(token)?.sub;
		return id;
	}
};

export default getStaffId;
