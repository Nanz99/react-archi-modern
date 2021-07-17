import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getListUsersData } from "./../../apis/api"

export const getListUsers = createAsyncThunk("users/getListUsers", async () => {
   const response = await getListUsersData()
   return response.data
})
const usersSlice = createSlice({
   name: "users",
   initialState: {
      accounts: [],
      user_loading: false,
      user_error: "",
      login: {
         email: "",
         passWord: ""
      }
   },
   reducers: {
      handleValue: (state, action) => {
         const { email, passWord } = action.payload
         return {
            ...state,
            login: {
               ...state.login,
              email: email,
              passWord: passWord
            }
         }
      }
   },
   extraReducers: {
      [getListUsers.pending]: state => {
         state.user_loading = true
      },
      [getListUsers.fulfilled]: (state, action) => {
         state.user_loading = false
         state.accounts = action.payload
      },
      [getListUsers.rejected]: (state, action) => {
         state.user_loading = false
         state.user_error = action.error
      }
   }
})

export const { handleValue } = usersSlice.actions
export default usersSlice.reducer
