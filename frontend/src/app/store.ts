import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/authSlice'
import credentialsModalSlice from '../features/credentialsModalSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    credentialsModal: credentialsModalSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;