import { configureStore } from '@reduxjs/toolkit'
import { registerUser } from './auth/userRegister-slicer2'
import userReducer from './auth/user-slice';


export const store = configureStore({
	reducer: {
		registerUser: registerUser,
		user: userReducer
	},
})