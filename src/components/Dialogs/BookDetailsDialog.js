import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(1),
	},
	left: {
		paddingLeft: theme.spacing(1),
	},
	image: {
		width: "262px",
		height: "400px",
	},
	large: {
		width: "50px",
		height: "50px",
	},
}));

export default function BookDetailsDialog({
	detailsOpen,
	setDetailsOpen,
	book,
}) {
	const handleClose = () => {
		setDetailsOpen(false);
	};
	const classes = useStyles();

	return (
		<div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={detailsOpen}
				maxWidth="sm"
				fullWidth={true}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Book Details
				</DialogTitle>
				<DialogContent dividers>
					<Grid container>
						<Grid item xs={6}>
							<div>
								<img
									src={book.images[0]}
									alt=""
									className={classes.image}
								/>
							</div>
						</Grid>
						<Grid item xs={6}>
							<div>
								<Typography variant="h4">
									{book.name}
								</Typography>
								<Typography variant="h6">
									by {book.author}
								</Typography>
								<Typography variant="h5" color="textPrimary">
									Rs. {book.price}
								</Typography>
								<Typography
									variant="body"
									color="textSecondary"
									paragraph
								>
									{book.description}
								</Typography>
								<Chip
									label={book.category.category}
									className={classes.margin}
								/>
								{book.isNewBook ? (
									<Chip
										label="New Book"
										color="primary"
										className={classes.margin}
									/>
								) : (
									""
								)}
								{book.isAvailableForExchange ? (
									<Chip
										label="Available For Exchange"
										color="primary"
										className={classes.margin}
									/>
								) : (
									""
								)}
							</div>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container>
						<Grid item xs={1}>
							<Avatar
								alt="Posted By"
								src={book.userId.image}
								className={classes.large}
							>
								{book.userId.email[0]}
							</Avatar>
						</Grid>
						<Grid item xs={10} className={classes.left}>
							<Typography align="left">
								{book.userId.fullName}
							</Typography>
							<Typography align="left">
								{book.userId.email}
							</Typography>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}
