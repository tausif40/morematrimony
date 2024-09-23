import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './component/NavBar/TopNav'
import NavMain from './component/NavBar/NavMain';
import HomePageLayout from './component/Layout/HomePageLayout';
import PremiumPlans from './component/PremiumPlans/PremiumPlans';
import ContactUs from './component/Form/ContactUs';
import RegistrationForm from './component/Form/RegistrationForm';
import LoginPage from './component/Form/LoginPage';
import ActiveMembers from './component/ActiveMembers/ActiveMembers';
import HappyStories from './component/HappyStories/HappyStories';
import Footer from './component/Footer/Footer';
import DashboardLayout from './component/Layout/DashboardLayout';

const App = () => {
  return (
    <>
      <div className="">
        <TopNav />
        <NavMain />
        {/* <DashboardMenu /> */}
        <Routes>
          <Route path="/" element={<HomePageLayout />} />
          <Route path="/premium-plans" element={<PremiumPlans />} />
          <Route path="/active-members" element={<ActiveMembers />} />
          <Route path="/happy-stories" element={<HappyStories />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardLayout />} />

        </Routes>
        <Footer />
      </div >

    </>
  );
};

export default App;
