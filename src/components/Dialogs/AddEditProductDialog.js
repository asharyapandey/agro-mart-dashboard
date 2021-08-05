import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import categorySchema from "../../validation/category.validation";
import { Select, Typography } from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils/utils";
import { addUnit, editUnit } from "../../redux/slices/unit.slice";
import unitSchema from "../../validation/unit.validation";
import slugify from "slugify";
import productSchema from "../../validation/product.validation";
import { addNewProduct, editProduct } from "../../redux/slices/product.slice";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

export default function AddEditProductDialog({
	open,
	setOpen,
	productNameData = "",
	slugData = "",
	kalimatiPriceData = "",
	unitData = "",
	categoryData = "",
	id = "",
	editOpen = false,
}) {
	const [productName, setProductName] = useState(productNameData);
	const [slug, setSlug] = useState(slugData);
	const [kalimatiPrice, setKalimatiPrice] = useState(kalimatiPriceData);
	const [unit, setUnit] = useState(unitData);
	const [category, setCategory] = useState(categoryData);
	const [productNameError, setProductNameError] = useState("");
	const [slugError, setSlugError] = useState("");
	const [kalimatiPriceError, setKalimatiPriceError] = useState("");
	const [categoryError, setCategoryError] = useState("");
	const [unitError, setUnitError] = useState("");
	const handleClose = () => {
		setOpen(false);
	};

	const handleProductNameChange = (e) => {
		setUnit(e.target.value);
		const slugifiedCategory = slugify(e.target.value, { lower: true });
		setSlug(slugifiedCategory);
	};
	const dispatch = useDispatch();
	const productState = useSelector((state) => state.product);
	const categoryState = useSelector((state) => state.category);
	const unitState = useSelector((state) => state.unit);

	const handleSubmit = async () => {
		const unitData = { productName, slug, kalimatiPrice, unit, category };
		productSchema
			.validate(unitData)
			.then((isValid) => {
				if (editOpen) {
					dispatch(
						editProduct({
							...unitData,
							id,
						})
					);
				} else {
					dispatch(addNewProduct(unitData));
				}
			})
			.catch((err) => {
				err.errors.forEach((error) => {
					if (error.includes("slug")) {
						setSlugError(capitalizeFirstLetter(error));
					}
					if (error.includes("unit")) {
						setUnitError(capitalizeFirstLetter(error));
					}
					if (error.includes("category")) {
						setCategoryError(capitalizeFirstLetter(error));
					}
					if (error.includes("productName")) {
						setProductNameError(capitalizeFirstLetter(error));
					}
					if (error.includes("kalimatiPrice")) {
						setKalimatiPriceError(capitalizeFirstLetter(error));
					}
				});
			});
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={"sm"}
			>
				<DialogTitle id="form-dialog-title">Product</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="productName"
						label="Product Name"
						type="text"
						variant="outlined"
						fullWidth
						value={productName}
						onChange={handleProductNameChange}
						error={productNameError !== ""}
						onKeyDown={() => setProductNameError("")}
						helperText={unitError}
					/>
					<TextField
						margin="dense"
						id="slug"
						label="slug"
						type="text"
						variant="outlined"
						value={slug}
						fullWidth
						error={slugError !== ""}
						helperText={slugError}
					/>
					<TextField
						margin="dense"
						id="kalimatiPrice"
						label="Kalimati Price"
						type="number"
						variant="outlined"
						value={kalimatiPrice}
						fullWidth
						error={kalimatiPrice !== ""}
						helperText={kalimatiPriceError}
					/>
					<FormControl variant="outlined" fullWidth margin="dense">
						<InputLabel id="category-label">Category</InputLabel>
						<Select
							labelId="category-label"
							value={category}
							labelWidth={65}
							onChange={(e) => setCategory(e.target.value)}
						>
							{categoryState.data.map((category) => {
								return (
									<MenuItem value={category._id}>
										{category.displayName}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl variant="outlined" fullWidth margin="dense">
						<InputLabel id="unit-label">Unit</InputLabel>
						<Select
							labelId="unit-label"
							labelWidth={40}
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
						>
							{unitState.data.map((unit) => {
								return (
									<MenuItem value={unit._id}>
										{unit.displayName}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit} color="primary">
						{editOpen ? (
							productState.editStatus === "" ||
							productState.editStatus === "SUCCESS" ? (
								"Edit Product"
							) : (
								<CircularProgress size={17} />
							)
						) : productState.addStatus === "" ||
						  productState.addStatus === "SUCCESS" ? (
							"Add Product"
						) : (
							<CircularProgress size={17} />
						)}
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
