import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/style.css'
import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-icons.css'
import './assets/css/fontawesome.min.css'
import 'bootstrap'
import { useEffect, useState } from 'react';
import Reservations from './pages/Reservations';
import ContactUs from './pages/ContactUs';
import TermsConditions from './pages/TermsConditions';
import PrivacyCookiesPolicy from './pages/PrivacyCookiesPolicy';
import VehicleGuide from './pages/VehicleGuide';
import axios from 'axios';
import Cookies from 'js-cookie'
import Admin from './pages/Admin';
import CompleteBooking from './pages/CompleteBooking';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from './redux/slices/authSlice';
import ConfirmBookingNotify from './pages/ConfirmBookingNotify';



function App() {

  useEffect(() => {
    AOS.init({ 
      duration: 2000 
    });
  }, []);

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  const bookingData = useSelector(state => state.booking.bookingData);
  const bookingSubmitted = useSelector(state => state.booking.isBookingSubmitted);
  const selectedVehicle = useSelector(state => state.vehicle);





  




  

  // Check if the user is logged in
  useEffect(() => {
    const userToken = Cookies.get('userToken');


    if (userToken) {
        console.log(userToken);
        // Make a request to the backend to verify the user token and get user information
        axios.get('/user/verify-user', { headers: { Authorization: `Bearer ${userToken}` } })
            .then(response => {
              dispatch(logInUser({loggedIn : true, user : response.data}))
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
}, []);



  return (
    <Router>
      <div className="App">
        <Routes>


          <Route path="/" element={<Home  />} />

          <Route path="/reservations" element={<Reservations     />} />

          <Route path="/contact" element={<ContactUs   />} />

          <Route path="/terms-and-conditions" element={<TermsConditions  />} />

          <Route path="/privacy-and-cookies" element={<PrivacyCookiesPolicy  />} />

          <Route path="/vehicle-guide" element={<VehicleGuide   />} />

          <Route path="/admin-vehicles" element={<Admin tab={'Vehicles'}  />} />
          
          <Route path="/admin-extras" element={<Admin tab={'Extras'}  />} />

          <Route path="/admin-bookings" element={<Admin tab={'Bookings'}  />} />

          <Route path="/admin-pricing" element={<Admin tab={'Pricing'}  />} />
          <Route path="/admin-bookings" element={<Admin tab={'Bookings'}  />} />

          <Route path="/complete-booking" element={<CompleteBooking     />} />
          <Route path="/confirm-booking/:bookingId" element={<ConfirmBookingNotify     />} />

          {/* <Route component={NotFound} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
