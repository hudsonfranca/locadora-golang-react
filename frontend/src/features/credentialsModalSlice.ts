import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CredentialsModalSliceState {
  isActive: boolean
}

const initialState: CredentialsModalSliceState = {
  isActive: false
}


export const credentialsModalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isActive: (state, { payload: { isActive } }: PayloadAction<CredentialsModalSliceState>) => {
      state.isActive = isActive

    }
  }
})

export const { isActive } = credentialsModalSlice.actions

export default credentialsModalSlice.reducer