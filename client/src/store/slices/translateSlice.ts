import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface TranslateRequest {
	textToTranslate: string;
	codeFrom: string;
	codeTo: string;
}

interface DetectLanguageResponse {
	source_lang_code: string;
}

interface TranslateResponse {
	trans: string;
}
export const requestTranslate = createAsyncThunk(
	"translate/requestTranslate",
	async ({ textToTranslate, codeFrom, codeTo }: TranslateRequest) => {
		if (textToTranslate != "") {
			if (codeFrom == "auto") {
				const encodedParamsDetectLanguage = new URLSearchParams();
				encodedParamsDetectLanguage.set("text", textToTranslate);
				const optionsDetectLanguage = {
					method: "POST",
					url: "https://google-translate113.p.rapidapi.com/api/v1/translator/detect-language",
					headers: {
						"content-type": "application/x-www-form-urlencoded",
						"X-RapidAPI-Key": "fc1a109cbdmsh646bcd8ec4aef92p1838e5jsn08b6a593e939",
						"X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
					},
					data: encodedParamsDetectLanguage,
				};

				const responseDetectLanguage: AxiosResponse<DetectLanguageResponse> =
					await axios.request(optionsDetectLanguage);

				codeFrom = responseDetectLanguage.data.source_lang_code;
			}

			const encodedParamsRequsetLanguage = new URLSearchParams();
			encodedParamsRequsetLanguage.set("from", codeFrom);
			encodedParamsRequsetLanguage.set("to", codeTo);
			encodedParamsRequsetLanguage.set("text", textToTranslate);

			const optionsRequsetLanguage = {
				method: "POST",
				url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					"X-RapidAPI-Key": "fc1a109cbdmsh646bcd8ec4aef92p1838e5jsn08b6a593e939",
					"X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
				},
				data: encodedParamsRequsetLanguage,
			};
			const responseRequsetLanguage: AxiosResponse<TranslateResponse> =
				await axios.request(optionsRequsetLanguage);
			return {
				textToTranslate: textToTranslate,
				translatedText: responseRequsetLanguage.data.trans,
				code: codeFrom,
			};
		} else {
			return {
				textToTranslate: "",
				translatedText: "",
				code: null,
			};
		}
	}
);

interface ITranslate {
	from: string;
	to: string;
	textToTranslate: string;
	translatedResult: string;
	detected: boolean;
	// swap: boolean
}

/*
        менять на авто если стоит детектед и мы стерли текст 
        Реализовать алгоритм, который будет делать перевод только тогда, когда мы перестали писать
*/

const initialState: ITranslate = {
	from: "auto",
	to: "en",
	textToTranslate: "",
	translatedResult: "",
	detected: false,
	// swap: false,
};

export const translateSlice = createSlice({
	name: "translate",
	initialState,
	reducers: {
		changeTextToTranslate: (state, action: PayloadAction<string>) => {
			state.textToTranslate = action.payload;
		},
		changeCodeFrom: (state, action: PayloadAction<string>) => {
			state.from = action.payload;
		},
		changeCodeTo: (state, action: PayloadAction<string>) => {
			state.to = action.payload;
		},
		changeDetected: (state, action: PayloadAction<boolean>) => {
			state.detected = action.payload;
		},
		setAuto: (state, action: PayloadAction<string>) => {
			state.from = action.payload;
			if (state.from == "auto") {
				state.detected = false;
			}
		},
		clearTranslatedResult: (state) => {
			state.translatedResult = "";
		},
		swap: (state) => {
			const temporaryText = state.textToTranslate;
			state.textToTranslate = state.translatedResult;
			state.translatedResult = temporaryText;

			const temporaryCode = state.from;
			state.from = state.to;
			state.to = temporaryCode;
			state.detected = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(requestTranslate.fulfilled, (state, action) => {
			if (action.payload) {
				state.translatedResult = action.payload.translatedText;
				state.textToTranslate = action.payload.textToTranslate;
				if (state.from == "auto") {
					if (action.payload.code == null) {
						state.from = "auto";
					} else {
						state.from = action.payload.code;
					}
					state.detected = true;
				} else if (action.payload.code == null) {
					state.from = "auto";
				}
			}
		});
	},
});

export const { changeCodeFrom } = translateSlice.actions;
export const { changeCodeTo } = translateSlice.actions;
export const { changeDetected } = translateSlice.actions;
export const { setAuto } = translateSlice.actions;
export const { swap } = translateSlice.actions;
export const { changeTextToTranslate } = translateSlice.actions;

export const { clearTranslatedResult } = translateSlice.actions;

export default translateSlice.reducer;
