import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop/ScrollToTop';
import TopNav from './component/NavBar/TopNav';
import NavMain from './component/NavBar/NavMain';
import HomePageLayout from './component/Layout/HomePageLayout';
import PremiumPlans from './component/PremiumPlans/PremiumPlans';
import ContactUs from './component/Form/ContactUs';
import RegistrationForm from './component/Form/RegistrationForm';
import LoginPage from './component/Form/LoginPage';
import ActiveMembers from './component/ActiveMembers/ActiveMembers';
import HappyStories from './component/HappyStories/HappyStories';
import Footer from './component/Footer/Footer';
import BackToTopButton from './component/BackToTop/backToTop';

// layout page
import DashboardLayout from './component/Layout/DashboardLayout';

// render this page
import Dashboard from './component/Dashboard/Dashboard';
import Reviews from './component/HomePage/Reviews';

const App = () => {
  return (
    <>
      <div className="">
        <ScrollToTop />
        <TopNav />
        <NavMain />
        <Routes>
          <Route path="/" element={<HomePageLayout />} />
          <Route path="/premium-plans" element={<PremiumPlans />} />
          <Route path="/active-members" element={<ActiveMembers />} />
          <Route path="/happy-stories" element={<HappyStories />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/profile-setting" element={<DashboardLayout />} />
        </Routes>

        {/* <DashboardLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setting" element={<Reviews />} />
          </Routes>
        </DashboardLayout> */}

        <Footer />
        <BackToTopButton />
      </div >
    </>
  );
};

export default App;
