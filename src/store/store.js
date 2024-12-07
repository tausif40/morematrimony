import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth-slice';
import profileData from './features/profileData-slice'
import userDataSlice from './features/userDetails-slice';
import userUploadImages from './features/uploadImages-slice';


export const store = configureStore({
	reducer: {
		auth: authSlice,
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

