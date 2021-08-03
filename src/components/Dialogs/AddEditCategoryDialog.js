import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import slugify from "slugify";
import Dropzone from "react-dropzone";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewCategory,
	editCategory,
} from "../../redux/slices/category.slice";
import CircularProgress from "@material-ui/core/CircularProgress";
import categorySchema from "../../validation/category.validation";
import { Typography } from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils/utils";

export default function AddEditCategoryDialog({
	open,
	setOpen,
	categoryData = "",
	slugData = "",
	imageData = "",
	id = "",
	editOpen = false,
}) {
	const [category, setCategory] = useState(categoryData);
	const [slug, setSlug] = useState(slugData);
	const [image, setImage] = useState(imageData);
	const [categoryError, setCategoryError] = useState("");
	const [slugError, setSlugError] = useState("");
	const [imageError, setImageError] = useState("");
	const handleClose = () => {
		setOpen(false);
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		const slugifiedCategory = slugify(e.target.value, { lower: true });
		setSlug(slugifiedCategory);
	};
	const handleDrop = (acceptedFiles) => {
		setImageError("");
		const selectedImage = acceptedFiles[0];
		const fileReader = new FileReader();
		fileReader.readAsDataURL(selectedImage);
		fileReader.onload = (event) => {
			setImage(event.target.result);
		};
	};
	const dispatch = useDispatch();
	const categoryState = useSelector((state) => state.category);

	const handleSubmit = async () => {
		const categoryData = { category, slug, image };
		categorySchema
			.validate(categoryData)
			.then((isValid) => {
				if (editOpen) {
					dispatch(
						editCategory({
							...categoryData,
							id,
							sameImage: imageData === image,
						})
					);
				} else {
					dispatch(addNewCategory(categoryData));
				}
			})
			.catch((err) => {
				err.errors.forEach((error) => {
					if (error.includes("image")) {
						setImageError(capitalizeFirstLetter(error));
					}
					if (error.includes("category")) {
						setCategoryError(capitalizeFirstLetter(error));
					}
					if (error.includes("slug")) {
						setSlugError(capitalizeFirstLetter(error));
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
				<DialogTitle id="form-dialog-title">Category</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="category"
						label="Category"
						type="text"
						variant="outlined"
						fullWidth
						value={category}
						onChange={handleCategoryChange}
						error={categoryError !== ""}
						onKeyDown={() => setCategoryError("")}
						helperText={categoryError}
					/>
					<TextField
						margin="dense"
						id="slug"
						label="Slug"
						type="text"
						variant="outlined"
						value={slug}
						fullWidth
						error={slugError !== ""}
						helperText={slugError}
					/>
					<Dropzone
						onDrop={handleDrop}
						accept="image/*"
						minSize={1024}
						maxSize={3072000}
						maxFiles={1}
					>
						{({ getRootProps, getInputProps }) => (
							<div {...getRootProps({ className: "dropzone" })}>
								<input {...getInputProps()} />
								<p>
									Drag'n'drop images, or click to select files
								</p>
							</div>
						)}
					</Dropzone>
					{imageError !== "" ? (
						<div style={{ marginLeft: "1rem", paddingTop: "5px" }}>
							<Typography color="error" variant="p">
								{imageError}
							</Typography>
						</div>
					) : (
						""
					)}
					{image !== "" ? (
						<div className="previewDiv">
							<img
								src={image}
								alt="category"
								className="previewImage"
							/>
							<Button
								className="previewButton"
								variant="contained"
								color="secondary"
								onClick={() => {
									setImage("");
								}}
							>
								<DeleteIcon />
							</Button>
						</div>
					) : (
						""
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit} color="primary">
						{editOpen ? (
							categoryState.editStatus === "" ||
							categoryState.editStatus === "SUCCESS" ? (
								"Edit Category"
							) : (
								<CircularProgress size={17} />
							)
						) : categoryState.addStatus === "" ||
						  categoryState.addStatus === "SUCCESS" ? (
							"Add Category"
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
