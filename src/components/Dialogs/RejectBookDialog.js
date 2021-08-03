import { DialogContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { rejectBooks } from "../../redux/slices/book.slice";

function RejectBookDialog({ rejectConfirmDialog, onCancelBtnClick, bookID }) {
	const [rejectionMessage, setRejectionMessage] = useState("");
	const [rejectionMessageError, setRejectionMessageError] = useState("");
	const dispatch = useDispatch();
	const handleRejectionMessageChange = (e) => {
		setRejectionMessage(e.target.value);
		setRejectionMessageError("");
	};
	const handleSubmit = () => {
		if (rejectionMessage === "") {
			setRejectionMessageError("Rejection Message Can't Be Empty.");
			return;
		}
		dispatch(rejectBooks({ id: bookID, rejectionMessage }));
		setRejectionMessage("");
		setRejectionMessageError("");
		onCancelBtnClick();
	};

	return (
		<>
			<Dialog open={rejectConfirmDialog} onClose={onCancelBtnClick}>
				<DialogTitle>
					<Typography variant="h6">
						Are you sure you want to reject this book?
					</Typography>
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="rejectionMessage"
						label="Rejection Message"
						type="text"
						variant="outlined"
						fullWidth
						value={rejectionMessage}
						onChange={handleRejectionMessageChange}
						error={rejectionMessageError !== ""}
						onKeyDown={() => setRejectionMessageError("")}
						helperText={rejectionMessageError}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancelBtnClick} variant="outlined">
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant="contained"
						color="primary"
					>
						Reject
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default RejectBookDialog;
