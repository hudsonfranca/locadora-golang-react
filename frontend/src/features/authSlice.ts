import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Response {
  status: number,
  data: {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: null,
    name: string,
    lastName: string,
    cpf: string,
    phoneNumber: string,
    address: {
      ID: number,
      CreatedAt: string,
      UpdatedAt: string,
      DeletedAt: null,
      streetAddress: string,
      zipCode: string,
      number: number,
      city: string,
      district: string,
      state: string,
      usersID: number
    },
    rent: null,
    password: string,
    email: string,
    role: string
  }
}

interface AuthState {
  id: number
  name: string
  email: string
  role: string
  isAuthenticated: boolean
}

const initialState: AuthState = {
  id: 0,
  email: "",
  name: "",
  role: "",
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, { payload: { id, email, name, role, isAuthenticated } }: PayloadAction<AuthState>) => {
      state.id = id
      state.email = email
      state.name = name
      state.role = role
      state.isAuthenticated = isAuthenticated
    },
    logOut: (state, action: PayloadAction<boolean>) => {
      state.email = ""
      state.name = ""
      state.role = ""
      state.isAuthenticated = false
    }
  }
})

export const { authenticateUser, logOut, } = authSlice.actions

export default authSlice.reducer