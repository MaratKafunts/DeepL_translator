import React, { useState } from "react";
import styles from "./NavLink.module.scss";

interface INavLink {
	text: string;
}

const NavLink: React.FC<INavLink> = ({ text }): JSX.Element => {
	const [hover, setHover] = useState(false);
	const NavLinkMouseOver = (): void => {
		setHover(true);
	};

	const NavLinkMouseOut = (): void => {
		setHover(false);
	};
	return (
		<div onMouseOver={NavLinkMouseOver} onMouseOut={NavLinkMouseOut} className={styles.navItem}>
			{text}
			<div className={`${styles.navItem_hover} ${hover ? styles.navItem_hover_active : ""}`}></div>
		</div>
	);
};

export default NavLink;
