import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const requestLanguages = createAsyncThunk("languages/requestLanguages", async () => {
	const options = {
		method: "GET",
		url: "https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages",
		headers: {
			"X-RapidAPI-Key": "fc1a109cbdmsh646bcd8ec4aef92p1838e5jsn08b6a593e939",
			"X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
		},
	};

	try {
		const response: AxiosResponse<ILanguageObject[]> = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
});

export interface ILanguageObject {
	code: string;
	language: string;
}

export interface ILanguage {
	languages: ILanguageObject[];
}

const initialState: ILanguage = {
	languages: [],
};
const languagesSlice = createSlice({
	name: "languages",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(requestLanguages.fulfilled, (state, action) => {
			if (action.payload) {
				state.languages = action.payload;
			}
		});
	},
});

export default languagesSlice.reducer;
