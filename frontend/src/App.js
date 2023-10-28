import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './assets/css/style.css'

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-icons.css'

// import './assets/css/animate.min.css'

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


function App() {

  useEffect(() => {
    AOS.init({ 
      duration: 2000 
    });
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const userToken = Cookies.get('userToken');


    if (userToken) {
        console.log(userToken);
        // Make a request to the backend to verify the user token and get user information
        axios.get('https://my-car-backend.vercel.app/user/verify-user', { headers: { Authorization: `Bearer ${userToken}` } })
            .then(response => {
                setUser(response.data);
                setLoggedIn(true);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
}, []);

const [selectedVehicle, setSelectedVehicle] = useState(null);



  return (
    <Router>
      <div className="App">
        <Routes>


          <Route path="/" element={<Home loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn}  setUser={setUser} />} />

          <Route path="/reservations" element={<Reservations setSelectedVehicle={setSelectedVehicle} setLoggedIn={setLoggedIn}  setUser={setUser}  loggedIn={loggedIn} user={user} />} />

          <Route path="/contact" element={<ContactUs setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          <Route path="/terms-and-conditions" element={<TermsConditions setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          <Route path="/privacy-and-cookies" element={<PrivacyCookiesPolicy setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          <Route path="/vehicle-guide" element={<VehicleGuide setSelectedVehicle={setSelectedVehicle} setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          <Route path="/admin-vehicles" element={<Admin tab={'Vehicles'} setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />
          
          <Route path="/admin-extras" element={<Admin tab={'Extras'} setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          <Route path="/admin-bookings" element={<Admin tab={'Bookings'} setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          <Route path="/complete-booking" element={<CompleteBooking selectedVehicle={selectedVehicle}  setLoggedIn={setLoggedIn}  setUser={setUser} loggedIn={loggedIn} user={user} />} />

          {/* <Route component={NotFound} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
