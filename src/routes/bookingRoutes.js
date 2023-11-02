const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/add-booking', bookingController.addBooking);
router.post('/confirm-booking/:bookingId', bookingController.confirmBooking);

router.post('/complete-booking/:bookingId', bookingController.completeBooking);

router.get('/get-user-bookings/:userId', bookingController.getUserBookings);

router.get('/get-all-bookings', bookingController.getAllBookings);

router.delete('/delete-booking/:bookingId', bookingController.deleteBooking);

router.post('/send-confirmation-email/:bookingId', bookingController.sendConfirmationEmail)





module.exports = router;