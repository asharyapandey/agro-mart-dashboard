import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { approveBooks, getBooks } from "../redux/slices/book.slice";
import { LOADING } from "../utils/status";
import { CircularProgress } from "@material-ui/core";
import BookDetailsDialog from "../components/Dialogs/BookDetailsDialog";
import RejectBookDialog from "../components/Dialogs/RejectBookDialog";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginLeft: theme.spacing(1),
	},
}));

function VerifyBooks() {
	document.title = "Verify Books";
	const classes = useStyles();
	// state
	const [viewBookData, setViewBookData] = useState({});
	const [bookID, setBookID] = useState("");
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [rejectConfirmDialog, setRejectConfirmDialog] = useState(false);
	const book = useSelector((state) => state.book);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBooks());
	}, [dispatch]);

	const columns = [
		{
			name: "name",
			label: "Name",
		},
		{
			name: "price",
			label: "Price",
		},
		{
			name: "status",
			label: "Status",
		},
		{
			name: "View Details",
			options: {
				customBodyRender: (value, tableMeta, updatedValue) => {
					return (
						<div>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => {
									setViewBookData(
										book.data[tableMeta.rowIndex]
									);
									setDetailsOpen(true);
								}}
							>
								View Details
							</Button>
						</div>
					);
				},
			},
		},
		{
			name: "Actions",
			options: {
				filter: true,
				sort: false,
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<div>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => {
									const bookId =
										book.data[tableMeta.rowIndex]._id;
									dispatch(approveBooks({ id: bookId }));
								}}
							>
								{book.acceptStatus === LOADING ? (
									<CircularProgress size={17} />
								) : (
									"VERIFY"
								)}
							</Button>
							<Button
								className={classes.margin}
								variant="outlined"
								color="secondary"
								onClick={() => {
									setBookID(
										book.data[tableMeta.rowIndex]._id
									);
									setRejectConfirmDialog(true);
								}}
							>
								REJECT
							</Button>
						</div>
					);
				},
			},
		},
	];

	if (book.getStatus === LOADING) {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				columns={columns}
				title={"Books"}
				data={book.data}
				options={{
					selectableRows: false,
				}}
			/>
			{viewBookData.name ? (
				<BookDetailsDialog
					detailsOpen={detailsOpen}
					setDetailsOpen={setDetailsOpen}
					book={viewBookData}
				/>
			) : (
				""
			)}
			{bookID !== "" ? (
				<RejectBookDialog
					rejectConfirmDialog={rejectConfirmDialog}
					bookID={bookID}
					onCancelBtnClick={() => setRejectConfirmDialog(false)}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default VerifyBooks;
