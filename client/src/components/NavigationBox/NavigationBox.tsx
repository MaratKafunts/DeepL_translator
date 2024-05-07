import React, { ReactElement } from "react";
import styles from "./NavigationBox.module.scss";
interface INavigationBox {
	image: ReactElement;
	mainText: string;
	detailedText: string;
}

const NavigationBox: React.FC<INavigationBox> = ({ image, mainText, detailedText }) => {
	return (
		<div className={styles.navigationBox}>
			{image}
			<div className={styles.navigationBox__description}>
				<div className={styles.navigationBox__description_mainText}>{mainText}</div>
				<div className={styles.navigationBox__description_detailedText}>{detailedText}</div>
			</div>
		</div>
	);
};

export default NavigationBox;
