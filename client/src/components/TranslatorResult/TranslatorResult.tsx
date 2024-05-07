import React from "react";
import styles from "./TranslatorResult.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const TranslatorResult = (): JSX.Element => {
	const translatedText: string = useSelector((store: RootState) => store.translateReducer.translatedResult);
	return (
		<div className={styles.translatorResult}>
			<textarea value={translatedText} className={styles.translatorResult__textarea}>
				{translatedText}
			</textarea>
		</div>
	);
};

export default TranslatorResult;
