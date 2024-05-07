import React, { useState } from 'react'
import styles from './Header.module.scss'
import Dropdown from '../Dropdown/Dropdown'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import logo from './images/deepl.svg'
import NavLink from '../NavLink/NavLink'
import BurgerMenu from '../BurgerMenu/BurgerMenu'

const Header = (): JSX.Element => {
    const defaultItems = {
        translator: false,
        business: false,
        deepl: false,
        burgerMenu: false,
    }
    const [dropsItems, setDropsItems] = useState(defaultItems)

    return (
        <header className={styles.header__wrapper}>
            <div className={styles.header}>
                <div className={styles.header__start}>
                    <img
                        className={styles.header__start_logo}
                        src={logo}
                        alt=""
                    />
                    <Dropdown
                        dropStatus={dropsItems.translator}
                        text="Translator"
                        changeStatus={(): void => {
                            setDropsItems({
                                ...defaultItems,
                                translator: !dropsItems.translator,
                            })
                        }}
                    >
                        <div>hello</div>
                    </Dropdown>
                </div>
                <nav className={styles.header__nav}>
                    <ul className={styles.header__nav_ul}>
                        <li
                            id={styles.deeplPro}
                            className={styles.header__nav_ul_item}
                        >
                            <NavLink text="DeepL pro" />
                        </li>
                        <li
                            id={styles.forBussiness}
                            className={styles.header__nav_ul_item}
                        >
                            <Dropdown
                                dropStatus={dropsItems.business}
                                text="For business"
                                changeStatus={(): void => {
                                    setDropsItems({
                                        ...defaultItems,
                                        business: !dropsItems.business,
                                    })
                                }}
                            >
                                <div
                                    className={
                                        styles.header__nav_ul_item_forBusiness
                                    }
                                >
                                    <div
                                        className={
                                            styles.header__nav_ul_item_forBusiness_leftPart
                                        }
                                    >
                                        <div
                                            className={
                                                styles.header__nav_ul_item_forBusiness_leftPart_discover
                                            }
                                        >
                                            Discover
                                        </div>
                                        <div
                                            className={
                                                styles.header__nav_ul_item_forBusiness_leftPart_overview
                                            }
                                        >
                                            Overview
                                        </div>
                                        <button
                                            className={
                                                styles.header__nav_ul_item_forBusiness_leftPart_button
                                            }
                                        >
                                            Contact sales
                                        </button>
                                    </div>
                                    <div
                                        className={
                                            styles.header__nav_ul_item_forBusiness_separatorColumn
                                        }
                                    ></div>
                                    <div
                                        className={
                                            styles.header__nav_ul_item_forBusiness_rightPart
                                        }
                                    >
                                        <div
                                            className={
                                                styles.header__nav_ul_item_forBusiness_rightPart_forTeams
                                            }
                                        >
                                            For Teams
                                        </div>
                                        <div
                                            className={
                                                styles.header__nav_ul_item_forBusiness_rightPart_legal
                                            }
                                        >
                                            Legal
                                        </div>
                                        <div
                                            className={
                                                styles.header__nav_ul_item_forBusiness_rightPart_customerSuccess
                                            }
                                        >
                                            Customer Success
                                        </div>
                                        <div
                                            className={
                                                styles.header__nav_ul_item_forBusiness_rightPart_sales
                                            }
                                        >
                                            Sales
                                        </div>
                                    </div>
                                </div>
                            </Dropdown>
                        </li>
                        <li
                            id={styles.whyDeepl}
                            className={styles.header__nav_ul_item}
                        >
                            <Dropdown
                                dropStatus={dropsItems.deepl}
                                text="why DeepL?"
                                changeStatus={(): void => {
                                    setDropsItems({
                                        ...defaultItems,
                                        deepl: !dropsItems.deepl,
                                    })
                                }}
                            >
                                <div
                                    className={
                                        styles.header__nav_ul_item_whyDeepl
                                    }
                                >
                                    <div
                                        className={
                                            styles.header__nav_ul_item_whyDeepl_translationQuality
                                        }
                                    >
                                        Translation quality
                                    </div>
                                    <div
                                        className={
                                            styles.header__nav_ul_item_whyDeepl_whyPro
                                        }
                                    >
                                        Why Pro?
                                    </div>
                                    <div
                                        className={
                                            styles.header__nav_ul_item_whyDeepl_features
                                        }
                                    >
                                        Features
                                    </div>
                                </div>
                            </Dropdown>
                        </li>
                        <li
                            id={styles.api}
                            className={styles.header__nav_ul_item}
                        >
                            <NavLink text="API" />
                        </li>
                        <li
                            id={styles.plansAndPricing}
                            className={styles.header__nav_ul_item}
                        >
                            <NavLink text="Plans and Pricing" />
                        </li>
                    </ul>
                </nav>
                <div className={styles.header__actions}>
                    <button
                        id={styles.startFreeTrial}
                        className={styles.header__actions_item}
                    >
                        Start Free Trial
                    </button>
                    <WbSunnyIcon
                        id={styles.changeThemeIcon}
                        className={styles.header__actions_item}
                    ></WbSunnyIcon>
                    <BookmarkBorderIcon
                        id={styles.savedTranslations}
                        className={styles.header__actions_item}
                    ></BookmarkBorderIcon>
                    <div
                        id={styles.burgerMenu}
                        className={styles.header__action_item}
                    >
                        <BurgerMenu>
                            <div className={styles.header__actions_burgerMenu}>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Deepl Pro
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    For Business
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    why DeepL?
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    API
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Plans and Pricing
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Windows / macOS apps
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Android / iOS apps
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Chrome extension
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Microsoft Word add-in
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    API technical documentation
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Help Center
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Blog
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    Press Information
                                </div>
                                <div
                                    className={
                                        styles.header__actions_burgerMenu_item
                                    }
                                >
                                    DeepL is hiring
                                </div>
                            </div>
                        </BurgerMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
