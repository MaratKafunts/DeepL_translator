import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { refreshToken } from '../store/slices/AdminSlice'
import {
    IStats,
    dailyRequests,
    monthlyRequests,
    yearlyRequests,
} from '../store/slices/StatsSlice'
import styles from './AdminPage.module.scss'
// import { dailyRequests } from "../store/slices/StatsSlice";

export const AdminPage = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const adminState = useSelector((store: RootState) => store.AdminSlice)
    const statsState = useSelector((store: RootState) => store.StatsSlice)
    const [stats, setStats] = useState([])

    const navigate: NavigateFunction = useNavigate()

    useEffect((): void => {
        if (localStorage.getItem('token')) {
            dispatch(refreshToken(localStorage.getItem('token') as string))
        } else {
            navigate('/admin/login')
        }
    }, [])

    useEffect((): void => {
        if (adminState.stateRefresh == 'error') {
            navigate('/admin/login')
        }
    }, [adminState.stateRefresh])

    useEffect(() => {
        dispatch(dailyRequests(localStorage.getItem('token') as string))
        dispatch(monthlyRequests(localStorage.getItem('token') as string))
        dispatch(yearlyRequests(localStorage.getItem('token') as string))
    }, [])

    if (adminState.stateRefresh == 'success' || adminState.auth == true) {
        return (
            <>
                <div className={styles.stats}>
                    <h1>Daily Statistic</h1>
                    {statsState.daily.map((daily, index) => {
                        return (
                            <div className={styles.stats__data} key={index}>
                                <div>{index + 1}).</div>
                                <div>Code From:{daily.translateFrom}, </div>
                                <div>Code To:{daily.translateTo}, </div>
                                <div>
                                    Text To Translate:{daily.textToTranslate},
                                </div>
                                <div>
                                    Translated Result: {daily.resultTranslate}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.stats}>
                    <h1>Monthly Statistic</h1>
                    {statsState.monthly.map((daily, index) => {
                        return (
                            <>
                                <div className={styles.stats__data} key={index}>
                                    <div>{index + 1}).</div>
                                    <div>Code From:{daily.translateFrom}, </div>
                                    <div>Code To:{daily.translateTo}, </div>
                                    <div>
                                        Text To Translate:
                                        {daily.textToTranslate},
                                    </div>
                                    <div>
                                        Translated Result:{' '}
                                        {daily.resultTranslate}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className={styles.stats}>
                    <h1>Yearly Statistic</h1>
                    {statsState.yearly.map((daily, index) => {
                        return (
                            <div className={styles.stats__data} key={index}>
                                <div>{index + 1}).</div>
                                <div>Code From:{daily.translateFrom}, </div>
                                <div>Code To:{daily.translateTo}, </div>
                                <div>
                                    Text To Translate:{daily.textToTranslate},
                                </div>
                                <div>
                                    Translated Result: {daily.resultTranslate}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    } else {
        return <div>Загрузка...</div>
    }
}
