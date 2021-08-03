import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import VerifyBooks from "../pages/VerifyBooks";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CustomizedSnackbar from "./Snackbar/CustomizedSnackbar";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function DashboardSideBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" noWrap>
						Accord Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<NavLink
							to="/dashboard"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary={"Dashboard"} />
							</ListItem>
						</NavLink>
						<NavLink
							to="/books"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<MenuBookIcon />
								</ListItemIcon>
								<ListItemText primary={"Verify Books"} />
							</ListItem>
						</NavLink>
						<NavLink
							to="/categories"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<ListItem button>
								<ListItemIcon>
									<CategoryIcon />
								</ListItemIcon>
								<ListItemText primary={"Category"} />
							</ListItem>
						</NavLink>
					</List>
					<Divider />
					<List>
						{["Users", "All Books", "Spam"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<InboxIcon />
									) : (
										<MailIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</div>
				<CustomizedSnackbar />
			</Drawer>
			<main className={classes.content}>
				<Toolbar />

				<Switch>
					<Route exact path="/books" component={VerifyBooks} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/categories" component={Category} />
					<Route path="*" exact>
						<Redirect to="/dashboard" />
					</Route>
				</Switch>
			</main>
		</div>
	);
}
