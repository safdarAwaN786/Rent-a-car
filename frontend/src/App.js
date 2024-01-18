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
import { setAllSeasons, setCurrentSeason } from './redux/slices/seasonSlice';
import { setWebContent } from './redux/slices/webContentSlice';
import { ToastContainer, toast } from 'react-toastify';
import ChangePassword from './pages/ChangePassword';
import Prices from './pages/Prices';
import SeasonPrices from './pages/SeasonPrices';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);

  const dispatch = useDispatch();

  const bookingData = useSelector(state => state.booking.bookingData);
  const webContent = useSelector(state => state.webContent);

  useEffect(() => {
    console.log(webContent);
  }, [webContent])
  useEffect(() => {
    console.log(bookingData);
  }, [bookingData])

  useEffect(() => {
    axios.get('/read-content').then((response) => {
      dispatch(setWebContent(response.data.data))
    }).catch((e) => {
      reGetContent();
    })
  }, [])

  const reGetContent = () => {
    axios.get('/read-content').then((response) => {
      dispatch(setWebContent(response.data.data))
    }).catch((e) => {
      console.log(e);
      toast.error('Server Error, Try Reload!')
    })
  }

  useEffect(() => {
    axios.get('/read-seasons').then((res) => {
      const seasons = res.data.data;
      const currentDate = new Date(); // Current date

      for (let i = 0; i < seasons?.length; i++) {
        const startDate = new Date(seasons[i].startDate);
        const endDate = new Date(seasons[i].endDate);
        if (currentDate >= startDate && currentDate <= endDate) {
          dispatch(setCurrentSeason(seasons[i]));
          break;
        }
      }
      dispatch(setAllSeasons(seasons))

    })
  }, [])

  const currentSeason = useSelector(state => state.currentSeason);
  const days = useSelector(state => state.numberOfDays);

  useEffect(() => {
    console.log(currentSeason);
  }, [currentSeason])
  useEffect(() => {
    console.log(days);
  }, [days])

  // Check if the user is logged in
  useEffect(() => {
    const userToken = Cookies.get('userToken');
    if (userToken) {
      axios.get('/user/verify-user', { headers: { Authorization: `Bearer ${userToken}` } })
        .then(response => {
          dispatch(logInUser({ loggedIn: true, user: response.data }))
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer theme='colored'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/prices-seasons" element={<Prices />} />
          <Route path="/prices-groups" element={<SeasonPrices />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-and-cookies" element={<PrivacyCookiesPolicy />} />
          <Route path="/vehicle-guide" element={<VehicleGuide />} />
          <Route path="/admin-vehicles" element={<Admin tab={'Vehicles'} />} />
          <Route path="/admin-extras" element={<Admin tab={'Extras'} />} />
          <Route path="/admin-bookings" element={<Admin tab={'Bookings'} />} />
          <Route path="/admin-pricing" element={<Admin tab={'Pricing'} />} />
          <Route path="/admin-bookings" element={<Admin tab={'Bookings'} />} />
          <Route path="/admin-seasons" element={<Admin tab={'Seasons'} />} />
          <Route path="/seasons-pricing" element={<Admin tab={'Seasons-Pricing'} />} />
          <Route path="/groups-prices" element={<Admin tab={'Groups-Prices'} />} />
          <Route path="/landingPage-content" element={<Admin tab={'landingPage-Content'} />} />
          <Route path="/reservations-content" element={<Admin tab={'reservations-Content'} />} />
          <Route path="/terms&conditions-content" element={<Admin tab={'terms&Conditions-Content'} />} />
          <Route path="/contactus-content" element={<Admin tab={'contactUs-Content'} />} />
          <Route path="/extras-content" element={<Admin tab={'extras-Content'} />} />
          <Route path="/privacy&cookies-content" element={<Admin tab={'privacy&Cookies-Content'} />} />
          <Route path="/complete-booking" element={<CompleteBooking />} />
          <Route path="/reset-password/:userId" element={<ChangePassword />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
