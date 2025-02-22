import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth-slice';
import emailSlice from './auth/email-slice';
import profileData from './features/profileData-slice'
import userDataSlice from './features/userDetails-slice';
import userUploadImages from './features/images-slice';
import matchProfileSlice from './features/matchProfile-slice';
import userAction from './features/userAction-slice';
import notificationSlice from './features/notification-slice';
import planSlice from './features/plan-slice';


export const store = configureStore({
	reducer: {
		auth: authSlice,
		emailAuth: emailSlice,
		profileData: profileData,
		userDetails: userDataSlice,
		image: userUploadImages,
		matchProfile: matchProfileSlice,
		userAction: userAction,
		notification: notificationSlice,
		planSlice: planSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			ignoredPaths: [ 'registerUser.abortController' ],
		}),
});

