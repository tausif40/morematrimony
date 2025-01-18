import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth-slice';
import profileData from './features/profileData-slice'
import userDataSlice from './features/userDetails-slice';
import userUploadImages from './features/images-slice';
import matchProfileSlice from './features/matchProfile-slice';
import userAction from './features/userAction-slice'


export const store = configureStore({
	reducer: {
		auth: authSlice,
		profileData: profileData,
		userDetails: userDataSlice,
		image: userUploadImages,
		matchProfile: matchProfileSlice,
		userAction: userAction,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});

