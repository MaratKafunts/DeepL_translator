import React, { MouseEventHandler } from "react";
import styles from "./Button.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface IButton {
	openDropdownLanguages: MouseEventHandler;
	rotateArrow: boolean;
	language: string;
}

const Button: React.FC<IButton> = ({ openDropdownLanguages, rotateArrow, language }): JSX.Element => {
	return (
		<div onClick={openDropdownLanguages} className={styles.button}>
			<button className={styles.button__element}>
				<div className={styles.button__element_language}>{language}</div>
				<div className={rotateArrow ? styles.button__rotate : styles.button__noRotate}>
					<KeyboardArrowDownIcon />
				</div>
			</button>
		</div>
	);
};

export default Button;
