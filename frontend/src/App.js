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
import { setCurrentSeason } from './redux/slices/seasonSlice';
import { setWebContent } from './redux/slices/webContentSlice';
import { toast } from 'react-toastify';
import ChangePassword from './pages/ChangePassword';




function App() {

  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


  const bookingData = useSelector(state => state.booking.bookingData);
  const bookingSubmitted = useSelector(state => state.booking.isBookingSubmitted);
  const selectedVehicle = useSelector(state => state.vehicle);
  const webContent = useSelector(state => state.webContent);

  useEffect(() => {
    console.log(webContent);
  }, [webContent])
  useEffect(() => {
    console.log(bookingData);
  }, [bookingData])


  useEffect(() => {
    console.log(selectedVehicle);
  }, [selectedVehicle])

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
      const seasons = res.data.data.Seasons;
      const currentDate = new Date(); // Current date

      let currentSeason = null;

      // Loop through the seasons and check if the current date falls within any season
      for (let i = 0; i < seasons.length; i++) {
        const startDate = new Date(seasons[i].startDate);
        const endDate = new Date(seasons[i].endDate);

        if (currentDate >= startDate && currentDate <= endDate) {
          currentSeason = seasons[i].seasonName;
          break;
        }
      }

      // Output the current season
      if (currentSeason) {
        if (currentSeason === 'Winter') {
          dispatch(setCurrentSeason('winterPrices'));
        } else if (currentSeason === 'Summer') {
          dispatch(setCurrentSeason('summerPrices'));
        } else {
          dispatch(setCurrentSeason('summerHighPrices'));
        }
      } else {
        dispatch(setCurrentSeason('winterPrices'))
      }
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
      console.log(userToken);
      // Make a request to the backend to verify the user token and get user information
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
      
        <Routes>


          <Route path="/" element={<Home />} />

          <Route path="/reservations" element={<Reservations />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/terms-and-conditions" element={<TermsConditions />} />

          <Route path="/privacy-and-cookies" element={<PrivacyCookiesPolicy />} />

          <Route path="/vehicle-guide" element={<VehicleGuide />} />

          <Route path="/admin-vehicles" element={<Admin tab={'Vehicles'} />} />

          <Route path="/admin-extras" element={<Admin tab={'Extras'} />} />

          <Route path="/admin-bookings" element={<Admin tab={'Bookings'} />} />

          <Route path="/admin-pricing" element={<Admin tab={'Pricing'} />} />
          <Route path="/admin-bookings" element={<Admin tab={'Bookings'} />} />
          <Route path="/admin-seasons" element={<Admin tab={'Seasons'} />} />
          <Route path="/winter-pricing" element={<Admin tab={'Winter-Pricing'} />} />
          <Route path="/summer-pricing" element={<Admin tab={'Summer-Pricing'} />} />
          <Route path="/summerHigh-pricing" element={<Admin tab={'SummerHigh-Pricing'} />} />
          <Route path="/landingPage-content" element={<Admin tab={'landingPage-Content'} />} />
          <Route path="/reservations-content" element={<Admin tab={'reservations-Content'} />} />
          <Route path="/terms&conditions-content" element={<Admin tab={'terms&Conditions-Content'} />} />
          <Route path="/contactus-content" element={<Admin tab={'contactUs-Content'} />} />
          <Route path="/privacy&cookies-content" element={<Admin tab={'privacy&Cookies-Content'} />} />

          <Route path="/complete-booking" element={<CompleteBooking />} />
          <Route path="/reset-password/:userId" element={<ChangePassword />} />


          {/* <Route component={NotFound} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
