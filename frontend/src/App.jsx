import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignInStudent from './pages/Studentsignin';
import SignUpStudent from './pages/Studentsignup';
import SignUp from './pages/SignUp';
import Fdashboard from './pages/F_Dashboard';
import ResetPassword from './pages/ResetPassword';
import Group from './partials/Group';
import SendtoGrp from './partials/SendtoGrp';
import FormSearch from './partials/FormSearch';

function App() {

  const location = useLocation();

  const options = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry','pple', 'nana', 'herry', 'urian', 'lderberry','ple', 'anana', 'erry', 'rian', 'Eeberry'];
  const handleSubmit = (selectedOption) => {
    alert(`You selected: ${selectedOption}`);
  };


  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signinstudent" element={<SignInStudent/>} />
        <Route path="/signupstudent" element={<SignUpStudent/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Fdashboard/>} />
        <Route path="/sendtoGrp" element={<SendtoGrp/>} />
        <Route path="/group/:ClusterId" element={<Group/>} />
        <Route path="/formsearch" element={<FormSearch options={options} onSubmit={handleSubmit} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;

 