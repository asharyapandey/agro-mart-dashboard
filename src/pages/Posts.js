import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { approveBooks, getPosts } from "../redux/slices/post.slice";
import { LOADING } from "../utils/status";
import { CircularProgress } from "@material-ui/core";
import BASE_URL from "../utils/baseUrl";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginLeft: theme.spacing(1),
	},
}));

function Posts() {
	document.title = "Posts";
	const classes = useStyles();
	// state
	const post = useSelector((state) => state.post);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	const columns = [
		{
			name: "name",
			label: "Name",
		},
		{
			name: "address",
			label: "Address",
		},
		{
			name: "farmerPrice",
			label: "Farmer Price",
		},
		{
			name: "kalimatiPrice",
			label: "Kalimati Price",
		},
		{
			name: "totalBids",
			label: "Total Bids",
		},
		{
			name: "image",
			label: "Post Image",
			options: {
				customBodyRender: (value, tableMeta, updatedValue) => {
					return (
						<div>
							<img
								src={
									BASE_URL +
									post.data[tableMeta.rowIndex].image
								}
								style={{ width: "40px", height: "40px" }}
								alt=""
							/>
						</div>
					);
				},
			},
		},
	];

	if (post.getStatus === LOADING) {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				columns={columns}
				title={"Posts"}
				data={post.data}
				options={{
					selectableRows: false,
				}}
			/>
		</div>
	);
}

export default Posts;
