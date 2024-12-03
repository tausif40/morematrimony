import { configureStore } from '@reduxjs/toolkit'
import { registerUser } from './auth/userRegister-slicer2'
import userReducer from './auth/user-slice';
import profileData from './features/profileData-slice'
import userDataSlice from './features/userDetails-slice';
import userUploadImages from './features/uploadImages-slice';


export const store = configureStore({
	reducer: {
		registerUser: registerUser,
		user: userReducer,
		profileData: profileData,
		userDetails: userDataSlice,
		uploadImages: userUploadImages,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});

