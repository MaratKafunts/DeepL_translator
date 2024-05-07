import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { ILanguageObject } from '../../store/slices/languagesSlice'
import styles from './DropdownTranslatePannel.module.scss'
import { changeDetected } from '../../store/slices/translateSlice'

interface IDropdownTranslatePannel {
    style: React.CSSProperties
    setLanguage: React.Dispatch<React.SetStateAction<string>>
    setCode: (code: string) => void
    rotateArrow: boolean
}

const DropdownTranslatePannel: React.FC<IDropdownTranslatePannel> = ({
    style,
    setLanguage,
    setCode,
    rotateArrow,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const languages: ILanguageObject[] = useSelector(
        (store: RootState) => store.languageReducer.languages
    )

    const [searchLanguagesInput, setSearchLanguagesInput] = useState<string>('')

    const [languagesDefault, setLanguagesDefault] = useState<ILanguageObject[]>(
        []
    )

    const [searchedLanguages, setSearchedLanguages] = useState<
        ILanguageObject[]
    >([])

    useEffect((): void => {
        if (languagesDefault.length === 0) {
            setLanguagesDefault([...languages])
        }
    }, [languages])

    useEffect((): void => {
        const filterLanguages = languages.filter((language: ILanguageObject) =>
            language.language
                .toLowerCase()
                .startsWith(searchLanguagesInput.toLowerCase())
        )
        if (filterLanguages) {
            setSearchedLanguages(filterLanguages)
        }
    }, [searchLanguagesInput])

    useEffect((): void => {
        if (!rotateArrow) {
            setSearchLanguagesInput('')
        }
    }, [rotateArrow])

    const languageDropdownClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        e.stopPropagation()
    }

    if (searchLanguagesInput === '') {
        return (
            <div
                onClick={languageDropdownClick}
                className={styles.languageDropdown}
                style={style}
            >
                <div className={styles.languageDropdown__data}>
                    <div className={styles.languageDropdown__data_search}>
                        <input
                            value={searchLanguagesInput}
                            onChange={(e): void =>
                                setSearchLanguagesInput(e.target.value)
                            }
                            placeholder="Search languages..."
                            type="text"
                        />
                    </div>
                    <div className={styles.languageDropdown__data_wrapper}>
                        <div
                            className={styles.languageDropdown__data_firstPart}
                        >
                            {languages
                                .slice(0, 10)
                                .map((language: ILanguageObject) => (
                                    <div
                                        key={language.code}
                                        className={
                                            styles.languageDropdown__data_firstPart_language
                                        }
                                        onClick={(): void => {
                                            setLanguage(language.language)
                                            setCode(language.code)
                                            dispatch(changeDetected(false))
                                        }}
                                    >
                                        {language.language}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                onClick={languageDropdownClick}
                className={styles.languageDropdown}
                style={style}
            >
                <div className={styles.languageDropdown__data}>
                    <div className={styles.languageDropdown__data_search}>
                        <input
                            value={searchLanguagesInput}
                            onChange={(e): void =>
                                setSearchLanguagesInput(e.target.value)
                            }
                            placeholder="Search languages"
                            type="text"
                        />
                    </div>
                    <div className={styles.languageDropdown__data_wrapper}>
                        <div
                            className={styles.languageDropdown__data_firstPart}
                        >
                            {searchedLanguages.map(
                                (searchedLanguage: ILanguageObject) => (
                                    <div
                                        key={searchedLanguage.code}
                                        className={
                                            styles.languageDropdown__data_firstPart_language
                                        }
                                        onClick={(): void => {
                                            setLanguage(
                                                searchedLanguage.language
                                            )
                                            setCode(searchedLanguage.code)
                                            dispatch(changeDetected(false))
                                        }}
                                    >
                                        {searchedLanguage.language}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DropdownTranslatePannel
