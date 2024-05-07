import React, { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../store/slices/AdminSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";

const AdminForm = (): JSX.Element => {
	type AdminData = {
		login: string;
		password: string;
	};
	const [data, setData] = useState<AdminData>({ login: "", password: "" });

	const dispatch: AppDispatch = useDispatch();

	const authState: Readonly<RootState["AdminSlice"]["auth"]> = useSelector(
		(store: Readonly<RootState>) => store.AdminSlice.auth
	);
	const navigate: NavigateFunction = useNavigate();

	const logIn = (): void => {
		dispatch(auth(data));
	};

	useEffect((): void => {
		if (authState || localStorage.getItem("token")) {
			navigate("/admin");
		}
	}, [authState]);

	return (
		<div>
			<input
				value={data.login}
				onChange={(e: Readonly<ChangeEvent<HTMLInputElement>>): void =>
					setData({ ...data, login: e.target.value })
				}
				type="text"
				placeholder="login"
			/>
			<input
				value={data.password}
				onChange={(e: Readonly<ChangeEvent<HTMLInputElement>>): void =>
					setData({ ...data, password: e.target.value })
				}
				type="text"
				placeholder="password"
			/>
			<button onClick={logIn}>log in</button>
		</div>
	);
};

export default AdminForm;
