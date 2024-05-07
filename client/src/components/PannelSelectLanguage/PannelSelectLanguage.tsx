import React, { useEffect, useState } from "react";
import DropdownTranslatePannel from "../DropdownTranslatePannel/DropdownTranslatePannel";
import { useDispatch, useSelector } from "react-redux";
import { requestLanguages } from "../../store/slices/languagesSlice";
import { AppDispatch, RootState } from "../../store";
import styles from "./PannelSelectLanguage.module.scss";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Button from "../Button/Button";
import { changeCodeFrom, changeCodeTo, swap } from "../../store/slices/translateSlice";

const PannelSelectLanguage = (): JSX.Element => {
	const dispatch: AppDispatch = useDispatch();
	const languageState = useSelector((store: RootState) => store.translateReducer);
	const languages = useSelector((store: RootState) => store.languageReducer.languages);

	const [displayLanguages, setDisplayLanguages] = useState({
		left: "none",
		right: "none",
	});

	const [rotateArrow, setRotateArrow] = useState({
		left: false,
		right: false,
	});

	const [swapArrow, setSwapArrow] = useState(false);

	useEffect(() => {
		dispatch(requestLanguages());
	}, []);

	useEffect(() => {
		window.addEventListener("click", windowClick);

		return () => {
			window.removeEventListener("click", windowClick);
		};
	}, []);

	const windowClick = (): void => {
		setDisplayLanguages({
			right: "none",
			left: "none",
		});
		setRotateArrow({ left: false, right: false });
	};

	const openDropdownLanguagesLeft = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.stopPropagation();
		setDisplayLanguages({
			right: "none",
			left: "block",
		});
		setRotateArrow({ left: true, right: false });
		if (displayLanguages.left == "block") {
			setDisplayLanguages({ right: "none", left: "none" });
			setRotateArrow({ left: false, right: false });
		}
	};

	const openDropdownLanguagesRight = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.stopPropagation();
		setDisplayLanguages({ right: "block", left: "none" });
		setRotateArrow({ left: false, right: true });

		if (displayLanguages.right == "block") {
			setDisplayLanguages({ right: "none", left: "none" });
			setRotateArrow({ left: false, right: false });
		}
	};

	const [from, setFrom] = useState<string>("Automatic");
	const [to, setTo] = useState<string>("English");

	const swapLanguages = (): void => {
		if (from != "Automatic") {
			setSwapArrow(true);
			if (swapArrow) {
				setSwapArrow(false);
			}
			if (from.includes("(detected")) {
				const endIndex = from.indexOf("(detected)");
				const result = from.substring(0, endIndex);
				setTo(result);
				setFrom(to);
				dispatch(swap());
			} else {
				setTo(from);
				setFrom(to);
				dispatch(swap());
			}
		}
		console.log(languageState);
	};

	useEffect((): void => {
		if (languageState.detected == true) {
			for (const language of languages) {
				if (language.code == languageState.from) {
					if (languageState.from != "auto") {
						setFrom(language.language + "(detected)");
						break;
					} else {
						setFrom(language.language);
						break;
					}
				}
			}
		} else {
			if (languageState.from == "auto") {
				setFrom("Automatic");
			}
		}
	}, [languageState.from]);

	useEffect((): void => {
		setDisplayLanguages({ right: "none", left: "none" });
		setRotateArrow({ left: false, right: false });
	}, [from, to]);

	return (
		<div className={styles.translatePannel}>
			<div className={styles.translatePannel__dropdown}>
				<Button
					rotateArrow={rotateArrow.left}
					openDropdownLanguages={openDropdownLanguagesLeft}
					language={from}
				/>
				<DropdownTranslatePannel
					rotateArrow={rotateArrow.left}
					style={{
						left: "0px",
						display: displayLanguages.left,
					}}
					setCode={(code: string): { payload: string; type: "translate/changeCodeFrom" } =>
						dispatch(changeCodeFrom(code))
					}
					setLanguage={setFrom}
				/>
			</div>
			<SwapHorizIcon
				className={`${swapArrow ? styles.translatePannel__rotate : styles.translatePannel__noRotate} ${
					styles.translatePannel__swapicon
				}`}
				onClick={swapLanguages}
			></SwapHorizIcon>
			<div className={styles.translatePannel__dropdown}>
				<Button
					rotateArrow={rotateArrow.right}
					openDropdownLanguages={openDropdownLanguagesRight}
					language={to}
				/>
				<DropdownTranslatePannel
					rotateArrow={rotateArrow.right}
					style={{ right: "0px", display: displayLanguages.right }}
					setCode={(code): { payload: string; type: "translate/changeCodeTo" } =>
						dispatch(changeCodeTo(code))
					}
					setLanguage={setTo}
				/>
			</div>
		</div>
	);
};

export default PannelSelectLanguage;
