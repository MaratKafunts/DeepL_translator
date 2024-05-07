import React from "react";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import TranslatorField from "../components/TranslatorField/TranslatorField";
import TranslatorResult from "../components/TranslatorResult/TranslatorResult";
import PannelSelectLanguage from "../components/PannelSelectLanguage/PannelSelectLanguage";
import styles from "./MainPage.module.scss";
const MainPage = (): JSX.Element => {
	return (
		<>
			<Header />
			<Navigation />
			<div className={styles.translate}>
				<PannelSelectLanguage />
				<div className={styles.translate__translationFields}>
					<TranslatorField />
					<TranslatorResult />
				</div>
			</div>
		</>
	);
};

export default MainPage;
