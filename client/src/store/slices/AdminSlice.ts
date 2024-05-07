import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface MyResponseDataAuth {
	login: string;
	password: string;
	token: string;
}

interface MyResponseDataRefreshToken {
	token: string;
}

export const auth = createAsyncThunk("admin/auth", async (data: { login: string; password: string }) => {
	const response: AxiosResponse<MyResponseDataAuth> = await axios.post("http://localhost:3001/api/admin/login", data);
	return response.data;
});

export const refreshToken = createAsyncThunk("admin/refreshToken", async (data: string) => {
	const response: AxiosResponse<MyResponseDataRefreshToken> = await axios.get(
		"http://localhost:3001/api/admin/check_refresh",
		{
			headers: {
				Authorization: `Bearer ${data}`,
			},
		}
	);
	return response.data;
});

const AdminSlice = createSlice({
	name: "admin",
	initialState: { auth: false, stateRefresh: "idle" },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(auth.fulfilled, (state, action) => {
			state.auth = true;
			localStorage.setItem("token", action.payload.token);
		});
		builder.addCase(refreshToken.fulfilled, (state, action) => {
			state.auth = true;
			state.stateRefresh = "success";
		});
		builder.addCase(refreshToken.rejected, (state) => {
			state.auth = false;
			state.stateRefresh = "error";
			localStorage.removeItem("token");
		});
	},
});

export default AdminSlice.reducer;
