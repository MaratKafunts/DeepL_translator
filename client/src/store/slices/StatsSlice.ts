import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
/*
    Запросы на получение
    Запросы на добавления

*/

interface IPostStatistics {
    translateFrom: string
    translateTo: string
    textToTranslate: string
    resultTranslate: string
}

// interface IStatisticsDaily {
// 	daily: object[] | never[] | null | undefined;
// }

export const postStatistics = createAsyncThunk(
    'statistics/postStatistics',
    async (data: IPostStatistics) => {
        const response: AxiosResponse<IPostStatistics> = await axios.post(
            'http://localhost:3001/api/requests',
            data
        )
        return response.data
    }
)

export const dailyRequests = createAsyncThunk(
    'statistics/dailyRequests',
    async (data: string) => {
        const response = await axios.get(
            'http://localhost:3001/api/requests/daily',
            {
                headers: {
                    Authorization: `Bearer ${data}`,
                },
            }
        )
        return response.data
    }
)

export const monthlyRequests = createAsyncThunk(
    'statistics/mothlyRequests',
    async (data: string) => {
        const response = await axios.get(
            'http://localhost:3001/api/requests/monthly',
            {
                headers: {
                    Authorization: `Bearer ${data}`,
                },
            }
        )
        return response.data
    }
)

export const yearlyRequests = createAsyncThunk(
    'statistics/yearlyRequests',
    async (data: string) => {
        const response = await axios.get(
            'http://localhost:3001/api/requests/yearly',
            {
                headers: {
                    Authorization: `Bearer ${data}`,
                },
            }
        )
        return response.data
    }
)

export interface IStats {
    id: number
    resultTranslate: string
    textToTranslate: string
    translateFrom: string
    translateTo: string
    createdAt: string
    updatedAt: string
}

// доделать за день, за неделю и за год

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        daily: [] as IStats[],
        monthly: [] as IStats[],
        yearly: [] as IStats[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            dailyRequests.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.daily = action.payload
            }
        ),
            builder.addCase(
                monthlyRequests.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.monthly = action.payload
                }
            ),
            builder.addCase(
                yearlyRequests.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.yearly = action.payload
                }
            )
    },
})

export default statisticsSlice.reducer
