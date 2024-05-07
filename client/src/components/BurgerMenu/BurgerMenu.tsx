import React, { ReactElement, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./BurgerMenu.module.scss";
import CloseIcon from "@mui/icons-material/Close";

interface IBurgerMenu {
	children: ReactElement;
}
const BurgerMenu: React.FC<IBurgerMenu> = ({ children }): JSX.Element => {
	const [isOpened, setIsOpened] = useState<string>("none");

	useEffect((): (() => void) => {
		return () => {
			window.removeEventListener("click", windowClick);
		};
	}, []);

	const windowClick: EventListener = (e: Event): void => {
		if (isOpened) {
			window.removeEventListener("click", windowClick);
			setIsOpened("none");
			document.body.style.overflow = "visible";
		}
	};

	const openBurger: React.MouseEventHandler<SVGSVGElement> = (e): void => {
		e.stopPropagation();

		if (isOpened == "block") {
			setIsOpened("none");
		} else {
			setIsOpened("block");
			document.body.style.overflow = "hidden";
			window.addEventListener("click", windowClick);
		}
	};

	const closeBurgerMenu = (): void => {
		setIsOpened("none");
	};

	return (
		<>
			<MenuIcon onClick={openBurger}></MenuIcon>
			<div style={{ display: isOpened }} className={styles.burgerDropdownWrapper}>
				<div
					onClick={(e): void => {
						e.stopPropagation();
					}}
					className={styles.burgerDropdown}
				>
					<CloseIcon onClick={closeBurgerMenu} className={styles.burgerDropdown__closeIcon}></CloseIcon>
					<div className={styles.burgerDropdown__children}>{children}</div>
				</div>
			</div>
		</>
	);
};

export default BurgerMenu;
