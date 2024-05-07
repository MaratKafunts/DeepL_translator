import React, { useEffect, useRef, useState } from "react";
import styles from "./TranslatorField.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	changeTextToTranslate,
	clearTranslatedResult,
	requestTranslate,
	setAuto,
} from "../../store/slices/translateSlice";
import { AppDispatch, RootState } from "../../store";
import CloseIcon from "@mui/icons-material/Close";
import { postStatistics } from "../../store/slices/StatsSlice";

const TranslatorField = (): JSX.Element => {
	// const [transArea, setTransArea] = useState<string>('')
	const [closeIcon, setCloseIcon] = useState<string>("none");
	const [textAreaPlacrholder, setTextAreaPlaceholder] = useState<string>("Type to translate...");
	const dispatch: AppDispatch = useDispatch();
	const translateState = useSelector((store: RootState) => store.translateReducer);

	// Достаем коды from/to

	useEffect(() => {
		if (translateState.textToTranslate != "") {
			setCloseIcon("block");
			setTextAreaPlaceholder("");
		} else {
			setCloseIcon("none");
			setTextAreaPlaceholder("Type to translate...");
			dispatch(clearTranslatedResult());
			if (translateState.detected == true) {
				dispatch(setAuto("auto"));
			}
		}
	}, [translateState.textToTranslate]);

	const clearText = (): void => {
		dispatch(changeTextToTranslate(""));
		dispatch(clearTranslatedResult());
	};

	const timeId = useRef<NodeJS.Timeout>();

	/*
        Дожидаться результата перевода - Если был сделан перевод
        Вызывать слайс на добавление в базу данных
    */
	useEffect(() => {
		if (translateState.textToTranslate != "" && translateState.translatedResult != "") {
			dispatch(
				postStatistics({
					translateFrom: translateState.from,
					translateTo: translateState.to,
					textToTranslate: translateState.textToTranslate,
					resultTranslate: translateState.translatedResult,
				})
			);
		}
	}, [translateState.translatedResult]);

	const resetTime = (): void => {
		clearTimeout(timeId.current);
		const test = setTimeout(() => {
			dispatch(
				requestTranslate({
					textToTranslate: translateState.textToTranslate,
					codeFrom: translateState.from,
					codeTo: translateState.to,
				})
			);
		}, 500);
		timeId.current = test;
	};

	return (
		<div className={styles.translationField}>
			<CloseIcon
				className={styles.translationField__closeIcon}
				style={{ display: closeIcon }}
				onClick={clearText}
			></CloseIcon>
			<textarea
				value={translateState.textToTranslate}
				onKeyUp={resetTime}
				onChange={(e): { payload: string; type: "translate/changeTextToTranslate" } =>
					dispatch(changeTextToTranslate(e.target.value))
				}
				className={styles.translationField__textarea}
				placeholder={textAreaPlacrholder}
			></textarea>
		</div>
	);
};

export default TranslatorField;
