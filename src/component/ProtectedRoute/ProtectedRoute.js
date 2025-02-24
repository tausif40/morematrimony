// components/ProtectedRoute.js
import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

	const token = Cookies.get('access_token') || sessionStorage.getItem('AT');
	// console.log("token-", token);
	const isAuthenticated = token ? true : false;
	// console.log(isAuthenticated && token !== undefined && token !== '');

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
