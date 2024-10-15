import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop/ScrollToTop';
import TopNav from './component/NavBar/TopNav';
import NavMain from './component/NavBar/NavMain';
import HomePageLayout from './component/Layout/HomePageLayout';
import ContactUs from './component/Form/ContactUs';
import RegistrationForm from './component/Form/RegistrationForm';
import LoginPage from './component/Form/LoginPage';
import ActiveMembers from './component/ActiveMembers/ActiveMembers';
import HappyStories from './component/HappyStories/HappyStories';
import Footer from './component/Footer/Footer';
import BackToTopButton from './component/BackToTop/backToTop';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './component/PageNotFound/PageNotFound';
// layout page
import DashboardLayout from './component/Layout/DashboardLayout';
import MemberProfileLayout from './component/Layout/MemberProfileLayout';

const App = () => {
  const dashboardPaths = [
    '/dashboard',
    '/profile-setting',
    '/my-interest',
    '/shortlist',
    '/message',
    '/ignored-list',
    '/change-password',
    '/gallery',
    '/deactivate-account',
    '/delete-account'
  ];


  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="">
        {/* <ScrollToTop /> */}
        <TopNav />
        <NavMain />
        <Routes>
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/" element={<HomePageLayout />} />
          <Route path="/active-members" element={<ActiveMembers />} />
          <Route path="/happy-stories" element={<HappyStories />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />

          {dashboardPaths.map((path) => (
            <Route key={path} path={path} element={<DashboardLayout />} />
          ))}

          <Route path="/member-profile" element={<MemberProfileLayout />} />
        </Routes>

        <Footer />
        <BackToTopButton />
      </div >
    </>
  );
};

export default App;
