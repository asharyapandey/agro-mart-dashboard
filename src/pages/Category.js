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

const useStyles = makeStyles((theme) => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	margin: {
		marginRight: theme.spacing(1),
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

function Category() {
	document.title = "Categories";
	const classes = useStyles();
	// states
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
	const [deleteID, setDeleteID] = useState("");

	const [editData, setEditData] = useState({
		_id: "",
		category: "",
		slug: "",
		image: "",
	});

	const dispatch = useDispatch();

	const categories = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		if (categories.addStatus === "SUCCESS") {
			setAddOpen(false);
		}
		if (categories.editStatus === "SUCCESS") {
			setEditOpen(false);
		}
	}, [categories]);

	const handleClickOpen = () => {
		setAddOpen(true);
	};

	const columns = [
		{
			name: "category",
			label: "Category",
		},
		{
			name: "slug",
			label: "Slug",
		},
		{
			name: "Image",
			options: {
				customBodyRender: (value, tableMeta, updatedValue) => {
					return (
						<div>
							<img
								src={categories.data[tableMeta.rowIndex].image}
								style={{ width: "40px", height: "40px" }}
								alt=""
							/>
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
									setEditData(
										categories.data[tableMeta.rowIndex]
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
										categories.data[tableMeta.rowIndex]._id
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
		dispatch(deleteCategory({ id: deleteID }));
		setDeleteID("");
		setDeleteConfirmPopup(false);
	};

	if (categories.status === "LOADING") {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				title={"Categories"}
				data={categories.data}
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

			<AddEditCategoryDialog
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
				<AddEditCategoryDialog
					open={editOpen}
					setOpen={setEditOpen}
					categoryData={editData.category}
					slugData={editData.slug}
					imageData={editData.image}
					id={editData._id}
					editOpen={true}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Category;
