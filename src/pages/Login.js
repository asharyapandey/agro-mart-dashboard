import { useState } from "react";
import "./Auth.scss";
import LoginImage from "./login.jpg";
import { publicFetch } from "../utils/fetch";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/user.slice";
import BASE_URL from "../utils/baseUrl";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	// redux
	const dispatch = useDispatch();

	const validate = () => {
		if (email === "") {
			setUsernameError("Email is Required");
			return false;
		} else {
			setUsernameError("");
		}
		if (password === "") {
			setPasswordError("Password is Required");
			return false;
		} else {
			setPasswordError("");
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			const data = { email, password };
			try {
				const response = await publicFetch.post(
					`${BASE_URL}api/v1/admin/login`,
					data
				);
				localStorage.setItem("token", response.data.token);
				dispatch(setToken(response.data.token));
				toast.success(response.data.message);
			} catch (error) {
				console.log(error);
				toast.error(error.response.data.message);
			}
		}
	};
	return (
		<div className="auth-container">
			<div className="auth-container__content">
				<div className="content">
					<h1 className="heading">Accord</h1>
					<p>Administrator Dashboard</p>
					<form onSubmit={handleSubmit}>
						<div className="form-g">
							<label htmlFor="username">Email:</label>
							<input
								type="text"
								id="username"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<span className="error">{usernameError}</span>
						</div>
						<div className="form-g">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<span className="error">{passwordError}</span>
						</div>
						<button type="submit" className="button">
							Login
						</button>
					</form>
				</div>
			</div>
			<div
				className="auth-container__image"
				style={{ backgroundImage: `url(${LoginImage})` }}
			></div>
		</div>
	);
}

export default Login;
