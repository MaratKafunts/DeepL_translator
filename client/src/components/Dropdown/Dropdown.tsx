import React, { ReactElement, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styles from './Dropdown.module.scss'

interface IDropdown {
    text: string
    children: ReactElement
    dropdownStyle?: React.CSSProperties
    dropStatus: boolean
    changeStatus: () => void
}

const Dropdown: React.FC<IDropdown> = ({
    text,
    children,
    dropStatus,
    changeStatus,
}): JSX.Element => {
    useEffect((): (() => void) => {
        const click = (): void => {
            if (dropStatus) {
                changeStatus()
            }
        }
        window.addEventListener('click', click)

        return () => window.removeEventListener('click', click)
    })

    return (
        <>
            <div
                onClick={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                ): void => {
                    e.stopPropagation()
                    changeStatus()
                }}
                style={dropStatus ? { color: '#006494' } : { color: 'black' }}
                className={styles.dropdown}
            >
                <div>{text}</div>
                <div
                    className={
                        dropStatus
                            ? styles.dropdown__rotate
                            : styles.dropdown__noRotate
                    }
                >
                    <KeyboardArrowDownIcon />
                </div>
                <div
                    className={`${styles.dropdown_hover} ${
                        dropStatus
                            ? styles.dropdown_hover_active
                            : styles.dropdown_hover_notActive
                    }`}
                ></div>
                {dropStatus ? (
                    <div className={styles.dropdown__active}>
                        <div className={styles.children}>{children}</div>
                    </div>
                ) : (
                    <div className={styles.dropdown_notActive}></div>
                )}
            </div>
        </>
    )
}

export default Dropdown
