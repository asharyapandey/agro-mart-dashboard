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
import { getProducts } from "../redux/slices/product.slice";
import AddEditProductDialog from "../components/Dialogs/AddEditProductDialog";

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

function Product() {
	document.title = "Products";
	const classes = useStyles();
	// states
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
	const [deleteID, setDeleteID] = useState("");

	const [editData, setEditData] = useState({
		_id: "",
		kalimatiPrice: "",
		slug: "",
		productName: "",
		unit: "",
		category: "",
	});

	const dispatch = useDispatch();

	const products = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		if (products.addStatus === "SUCCESS") {
			setAddOpen(false);
		}
		if (products.editStatus === "SUCCESS") {
			setEditOpen(false);
		}
	}, [products]);

	const handleClickOpen = () => {
		setAddOpen(true);
	};

	const columns = [
		{
			name: "productName",
			label: "Name",
		},
		{
			name: "slug",
			label: "Slug",
		},
		{
			name: "kalimatiPrice",
			label: "Kalimati Price",
		},
		{
			name: "category",
			label: "Category",
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return <div>{value.displayName}</div>;
				},
			},
		},
		{
			name: "unit",
			label: "Unit",
			options: {
				customBodyRender: (value, tableMeta, updateValue) => {
					return <div>{value.displayName}</div>;
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
										products.data[tableMeta.rowIndex]
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
										products.data[tableMeta.rowIndex]._id
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

	if (products.status === "LOADING") {
		return <CircularProgress />;
	}

	return (
		<div>
			<MUIDataTable
				title={"Categories"}
				data={products.data}
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

			<AddEditProductDialog
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
				<AddEditProductDialog
					open={editOpen}
					setOpen={setEditOpen}
					productNameData={editData.productName}
					slugData={editData.slug}
					kalimatiPriceData={editData.kalimatiPrice}
					categoryData={editData.category._id}
					unitData={editData.unit._id}
					id={editData._id}
					editOpen={true}
				/>
			) : (
				""
			)}
		</div>
	);
}

export default Product;
