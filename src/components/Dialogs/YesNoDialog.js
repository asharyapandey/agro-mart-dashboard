import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function YesNoDialog({ deleteConfirmPopup, onNoBtnClick, onYesBtnClick }) {
	return (
		<>
			<Dialog open={deleteConfirmPopup} onClose={onNoBtnClick}>
				<DialogTitle>
					<Typography variant="h6">
						{"Are you sure want to delete this item?"}
					</Typography>
				</DialogTitle>
				<DialogActions>
					<Button onClick={onNoBtnClick} variant="contained">
						No
					</Button>
					<Button
						onClick={onYesBtnClick}
						color="secondary"
						variant="contained"
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default YesNoDialog;
