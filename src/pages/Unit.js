import { makeStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import AddEditCategoryDialog from "../components/Dialogs/AddEditCategoryDialog";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../redux/slices/category.slice";
import { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { Button } from "@material-ui/core";
import YesNoDialog from "../components/Dialogs/YesNoDialog";
import { deleteUnit, getUnits } from "../redux/slices/unit.slice";
import AddEditUnitDialog from "../components/Dialogs/AddEditUnitDialog";

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	margin: {
		marginLeft: theme.spacing(1),
	},
	dialog: {
		padding: theme.spacing(2),
		position: "absolute",
		top: theme.spacing(10),
	},
	dialogTitle: {
		textAlign: "center",
		fontFamily: "Bold",
	},
	dialogAction: {
		justifyContent: "center",
	},
}));

function Unit() {
	document.title = "Unit";
	const classes = useStyles();
	// states
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
	const [deleteID, setDeleteID] = useState("");

	const [editData, setEditData] = useState({
		_id: "",
		unit: "",
		displayName: "",
	});

	const dispatch = useDispatch();

	const unitState = useSelector((state) => state.unit);

	useEffect(() => {
		dispatch(getUnits());
	}, [dispatch]);

	useEffect(() => {
		if (unitState.addStatus === "SUCCESS") {
			setAddOpen(false);
		}
		if (unitState.editStatus === "SUCCESS") {
			setEditOpen(false);
		}
	}, [unitState]);

	const handleClickOpen = () => {
		setAddOpen(true);
	};

	const columns = [
		{
			name: "unit",
			label: "Unit",
		},
		{
			name: "displayName",
			label: "Display Name",
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
									setEditData(
										unitState.data[tableMeta.rowIndex]
									);
									setEditOpen(true);
								}}
							>
								Edit
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								className={classes.margin}
								onClick={() => {
									setDeleteID(
										unitState.data[tableMeta.rowIndex]._id
									);
									onDeleteBtnClick();
								}}
							>
								Delete
							</Button>
						</div>
					);
				},
			},
		},
	];

	const onDeleteBtnClick = () => {
		setDeleteConfirmPopup(true);
	};

	const onNoBtnClick = () => {
		setDeleteConfirmPopup(false);
	};

	const onYesBtnClick = () => {
		dispatch(deleteUnit({ id: deleteID }));
		setDeleteID("");
		setDeleteConfirmPopup(false);
	};

	if (unitState.status === "LOADING") {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				title={"Units"}
				data={unitState.data}
				columns={columns}
				options={{
					selectableRows: false,
				}}
			/>
			<Fab
				className={classes.fab}
				onClick={handleClickOpen}
				color="primary"
				aria-label="add"
			>
				<AddIcon />
			</Fab>

			<AddEditUnitDialog
				open={addOpen}
				setOpen={setAddOpen}
				editOpen={false}
			/>
			<YesNoDialog
				deleteConfirmPopup={deleteConfirmPopup}
				onNoBtnClick={onNoBtnClick}
				onYesBtnClick={onYesBtnClick}
			/>
			{editOpen ? (
				<AddEditUnitDialog
					open={editOpen}
					setOpen={setEditOpen}
					unitData={editData.unit}
					displayNameData={editData.displayName}
					id={editData._id}
					editOpen={true}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Unit;
