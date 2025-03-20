import React, { useEffect } from 'react';
import './App.css'
import Cookies from 'js-cookie';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop/ScrollToTop';
import NavMain from './component/NavBar/NavMain';
import HomePageLayout from './component/Layout/HomePageLayout';
import ContactUs from './component/Form/ContactUs';
import RegistrationForm from './component/Form/RegistrationForm';
import LoginPage from './component/pages/LoginPage';
import Footer from './component/Footer/Footer';
import BackToTopButton from './component/BackToTop/backToTop';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './component/PageNotFound/PageNotFound';
// layout page
import DashboardLayout from './component/Layout/DashboardLayout';
import MemberProfileLayout from './component/Layout/MemberProfileLayout';
import ViewProfileLayout from './component/Layout/ViewProfileLayout';
import ProfileDetails from './component/ViewProfile/ProfileDetails';
import MatchesList from './component/Matches/MatchesList';
import AllPlans from './component/Plans/AllPlans';
import Help from './component/Help/Help';
import AgentProfile from './component/AgentProfile/AgentProfile';

import { getProfileImages, getUserDetails } from './store/features/userDetails-slice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchEducation, fetchIndianState, fetchOccupations, fetchReligions } from './store/features/profileData-slice';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import { getNotification } from './store/features/notification-slice';
import ResetPassword from './component/Form/ResetPassword';
import VerifyEmail from './component/Form/VerifyEmail';
import { getPlan } from './store/features/plan-slice';
import socket from './lib/socket';

const App = () => {
  const location = useLocation()
  const dispatch = useDispatch();
  const token = Cookies.get('access_token') || sessionStorage.getItem('AT');
  const userId = useSelector((state) => state.userDetails.userId);
  const agentId = useSelector((state) => state.userDetails.agentId);
  const dashboardPaths = [
    '/dashboard',
    '/dashboard/matches',
    '/dashboard/profile-setting',
    '/dashboard/accept-interest',
    '/dashboard/send-interest',
    '/dashboard/shortlist',
    '/dashboard/viewed',
    '/dashboard/viewed-you',
    '/dashboard/received-interest',
    '/dashboard/Skip',
    '/dashboard/notification',
    '/dashboard/change-password',
    '/dashboard/gallery',
    '/dashboard/plan-history',
    '/dashboard/delete-account'
  ];

  // document.addEventListener('contextmenu', (e) => e.preventDefault());
  // document.addEventListener('keydown', (e) => {
  //   if (e.key === 'F12' ||
  //     (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
  //     (e.ctrlKey && e.key === 'U')) {
  //     e.preventDefault();
  //   }
  // });

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchIndianState());
    dispatch(getUserDetails());
    dispatch(getProfileImages());
    dispatch(fetchEducation());
    dispatch(fetchOccupations());
    dispatch(fetchReligions());
    dispatch(getPlan());
    dispatch(getNotification(userId));
  }, [ dispatch, token, userId ]);

  // useEffect(() => {
  //   dispatch(getNotification(userId));
  // }, [ location.pathname, dispatch, userId ]);

  const isConnected = useSelector((state) => state.socket.isConnected);

  useEffect(() => {
    // console.log("is Connected - ", isConnected);
    // console.log("userId-", userId);
    // console.log("agentId-", agentId);
    if (isConnected) {
      socket.emit("logIn", agentId);
    } else {
      console.error("Socket is not connected.");
    }
  }, [ isConnected, agentId, userId ]);

  // useEffect(() => {
  // if (token === undefined) {
  //   window.location.reload();
  //   navigate('/')
  // }
  // }, [])


  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="">
        {/* <ScrollToTop /> */}
        {/* <TopNav /> */}
        <NavMain />

        <Routes>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<HomePageLayout />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* <Route path="/dashboard" element={<DashboardLayout />} /> */}

          <Route element={<ProtectedRoute />}>
            <Route path="/my-profile" element={<AgentProfile />} />
            <Route path="/matches" element={<MatchesList />} />
            {dashboardPaths.map((path) => (
              <Route key={path} path={path} element={<DashboardLayout />} />
            ))}
            <Route path="/member-profile" element={<MemberProfileLayout />} />
            <Route path="/matches/profile-details/:targetId/:userId" element={<ProfileDetails />} />
          </Route>

          <Route path="/plans" element={<AllPlans />} />
          <Route path="/help" element={<Help />} />
          {!token && <Route path="/reset-password" element={<ResetPassword />} />}
        </Routes>

        <Footer />
        <BackToTopButton />
      </div >
    </>
  );
};

export default App;
