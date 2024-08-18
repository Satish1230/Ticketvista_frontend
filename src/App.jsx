import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './Pages/Landing';
import EventListPage from './Pages/EventListPage';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import EventDetailsPage from './Pages/EventDetails';
import Myevents from './Pages/Myevents'; // Capitalized import
import Dashboard from './Pages/Dashboard';
import ContactUs from './Pages/ContactUs';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Determine whether to hide the header and footer based on the route
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="bg-[#380c44] text-white min-h-screen flex flex-col">
      {!hideHeader && <Header />}

      <div className="flex-grow flex items-center justify-center p-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myevents" element={<Myevents />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/event-details" element={<EventDetailsPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
