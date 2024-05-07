import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import NavigationBox from "../NavigationBox/NavigationBox";
import styles from "./Navigation.module.scss";

const Navigation = (): JSX.Element => {
	return (
		<div className={styles.navigation}>
			<NavigationBox image={<LanguageIcon />} mainText={"Translate text"} detailedText={"31 languages"} />
			<NavigationBox
				image={<DescriptionIcon />}
				mainText={"Translate files"}
				detailedText={".pdf, .docx, .pptx"}
			/>
			<NavigationBox
				image={<DriveFileRenameOutlineIcon />}
				mainText={"DeepL write"}
				detailedText={"AI-powered edits"}
			/>
		</div>
	);
};

export default Navigation;
