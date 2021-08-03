import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
	document.title = "Dashboard";
	const user = useSelector((state) => state.user);
	return (
		<div>
			<Typography variant="p" paragraph>
				This is the Dashboard Here, is your token: {user.token}
			</Typography>
		</div>
	);
}

export default Dashboard;
