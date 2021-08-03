import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSideBar from "./components/DashboardSideBar";
import { useSelector } from "react-redux";

function App() {
	// const [isAuth, setIsAuth] = useState(false);
	const user = useSelector((state) => state.user);
	return (
		<div className="App">
			<Router>
				{user.token !== "" ? <DashboardSideBar /> : <PublicRoutes />}
				<ToastContainer position="top-center" />
			</Router>
		</div>
	);
}
const PublicRoutes = () => {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route path="*" exact>
				<Redirect to="/login" />
			</Route>
		</Switch>
	);
};

export default App;
