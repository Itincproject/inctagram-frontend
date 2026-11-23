import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/shared/api/baseApi'
import { appReducer, appSlice } from '@/app/providers/app-slice'

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            [appSlice.name]: appReducer,
            [baseApi.reducerPath]: baseApi.reducer,
        },
        middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    })
    setupListeners(store.dispatch)
    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
