import { configureStore } from '@reduxjs/toolkit'
import translateReducer from './slices/translateSlice'
import languageReducer from './slices/languagesSlice'
import AdminSlice from './slices/AdminSlice'
import StatsSlice from './slices/StatsSlice'

const store = configureStore({
    reducer: { translateReducer, languageReducer, AdminSlice, StatsSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
