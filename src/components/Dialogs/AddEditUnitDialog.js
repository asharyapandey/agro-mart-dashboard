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
import { Typography } from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils/utils";
import { addUnit, editUnit } from "../../redux/slices/unit.slice";
import unitSchema from "../../validation/unit.validation";

export default function AddEditUnitDialog({
	open,
	setOpen,
	unitData = "",
	displayNameData = "",
	id = "",
	editOpen = false,
}) {
	const [unit, setUnit] = useState(unitData);
	const [displayName, setDisplayName] = useState(displayNameData);
	const [unitError, setUnitError] = useState("");
	const [displayNameError, setDisplayNameError] = useState("");
	const handleClose = () => {
		setOpen(false);
	};

	const handleUnitChange = (e) => {
		setUnit(e.target.value);
	};
	const dispatch = useDispatch();
	const unitState = useSelector((state) => state.unit);

	const handleSubmit = async () => {
		const unitData = { unit, displayName };
		unitSchema
			.validate(unitData)
			.then((isValid) => {
				if (editOpen) {
					dispatch(
						editUnit({
							...unitData,
							id,
						})
					);
				} else {
					dispatch(addUnit(unitData));
				}
			})
			.catch((err) => {
				err.errors.forEach((error) => {
					if (error.includes("displayName")) {
						setDisplayName(capitalizeFirstLetter(error));
					}
					if (error.includes("unit")) {
						setUnitError(capitalizeFirstLetter(error));
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
				<DialogTitle id="form-dialog-title">Unit</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="unit"
						label="Unit"
						type="text"
						variant="outlined"
						fullWidth
						value={unit}
						onChange={handleUnitChange}
						error={unitError !== ""}
						onKeyDown={() => setUnitError("")}
						helperText={unitError}
					/>
					<TextField
						margin="dense"
						id="displayName"
						label="Display Name"
						type="text"
						variant="outlined"
						value={displayName}
						fullWidth
						onKeyDown={() => setDisplayNameError("")}
						onChange={(e) => setDisplayName(e.target.value)}
						error={displayNameError !== ""}
						helperText={displayNameError}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmit} color="primary">
						{editOpen ? (
							unitState.editStatus === "" ||
							unitState.editStatus === "SUCCESS" ? (
								"Edit Unit"
							) : (
								<CircularProgress size={17} />
							)
						) : unitState.addStatus === "" ||
						  unitState.addStatus === "SUCCESS" ? (
							"Add Unit"
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
