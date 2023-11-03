const nodemailer = require('nodemailer');
const User = require('../models/User');
const Booking = require('../models/bookingModel');
const Vehicle = require('../models/vehicleModel');
const Vat = require('../models/VAT')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourwaycarhire@gmail.com',
    pass: 'sqvm jlqn xsis ysfn'
  }
});


const addBooking = async (req, res) => {
  try {

    const vat = await Vat.find();



    const user = await User.findById(req.body.user);

    const vehicle = await Vehicle.findById(req.body.vehicle);


    const vatedPrice = req.body.totalPrice + ((vehicle.price / 100) * vat[0].value)



    const booking = new Booking({ ...req.body, netVatedTotal: Math.round(vatedPrice), vatValue: vat[0].value });
    const pickUpDate = new Date(booking?.pickUpDate);
    const dropOffDate = new Date(booking?.dropOffDate);

    // To calculate the time difference
    const timeDiff = Math.abs(dropOffDate.getTime() - pickUpDate.getTime());
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


    // Get current date
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    let extrasContent = '';
    for (let i = 0; i < booking.addedExtras.length; i++) {
      const extraObj = booking.addedExtras[i];
      if (extraObj) {
        extrasContent += `
            <tr>
                <td>${extraObj.extraName}</td>
                <td>${extraObj.quantity}</td>
                <td>€${extraObj.price}</td>
                <td>€${extraObj.price * extraObj.quantity}</td>
            </tr>
        `;
      }
    }

    const mailOptions = {
      from: 'yourwaycarhire@gmail.com',
      to: user.email,
      subject: 'Car Booking Confirmation - YourWay Car Hire',
      html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <title>Car Booking Confirmation - YourWay Car Hire</title>
            <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            </style>
            </head>
            <body>
            <h1>Car Booking Confirmation - Your Way Car Hire</h1>
            
            <p>Dear ${user.firstName} ${user.lastName},</p>
            
            <p>Thank you for booking with YourWay Car Hire. We are delighted to serve you and ensure you have a smooth and enjoyable driving experience. Here are the details of your reservation:</p>
            
            <h2>Booking Confirmation</h2>
            
            <p>Date: ${currentDate} </p>
            
           
            
            <h2>Booking Info</h2>
            
            <table>
              <tr>
                <th>Pick up:</th>
                <td>${booking.pickUpLocation} on ${booking.pickUpDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} | ${booking.pickUpTime} </td>
              </tr>
              <tr>
                <th>Drop off:</th>
                <td>${booking.dropOffLocation} on ${booking.dropOffDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} | ${booking.dropOffTime} </td>
              </tr>
              <tr>
                <th>Payment Method:</th>
                <td>On Arrival</td>
              </tr>
              <tr>
                <th>Total Days:</th>
                <td>${numberOfDays}</td>
              </tr>
              
              
            </table>
            
            <h2>Booking Summary</h2>
            
            <table>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
              <tr>
                <td>${vehicle.name}</td>
                <td>1</td>
                <td>€${vehicle.price}</td>
                <td>€${vehicle.price}</td>
              </tr>
              ${extrasContent}
                
                
              </table>

              <h2>TOTALS</h2>

              <table>
              
                  <tr>
            <th>Promo Discount:</th>
            <td>€${Math.round((vehicle.price / 100) * booking.promoCode?.discountPercent || 0)}</td>
        </tr>
              <tr>
              <th>Total VAT included:</th>
              <td>€${Math.round((vehicle.price / 100) * vat[0].value)}</td>
            </tr>
              <tr>
              <th>Grand Total(${numberOfDays}days):</th>
              <td>€${Math.round(booking.netVatedTotal)}</td>
            </tr>
              </table >
              <a href="http://localhost:3000/confirm-booking/${booking._id}">
              <button style="background-color: #4CAF50; /* Green */
                            border: none;
                            color: white;
                            padding: 15px 32px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                            margin: 4px 2px;
                            cursor: pointer;">Confirm Booking</button>
            </a>


                <h2>Important Information</h2>

                <ul>
                  <li>A fee of € 20 is applicable if pick up of vehicle is either from Larnaka or Pafos Airport.</li>
                  <li>The cost of fuel is not included in the price. Our company's policy is to provide the vehicle with a full tank of fuel which is refundable if the vehicle is returned with full tank.</li>
                  <li>The Company reserves the right to waive the charge for Super Collision Damage Waiver (SCDW) for rental periods of less than 7 days and in such a case shall refund the corresponding amount to the credit/debit card used for payment.</li>
                </ul>
              
                <p>We look forward to seeing you soon!</p>
              
                <p>Sincerely,</p>
              
                <p>The YourWay Car Hire Team</p>
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    await booking.save();
    console.log(booking);

    res.status(200).send({
      status: true, message: "The Booking is added!", data: booking
    });

  } catch (error) {
    console.log(error)
    res.status(400).send({ status: false, message: error.message });
  }
};


const getUserBookings = async (req, res) => {

  try {

    const userBookings = await Booking.find({ user: req.params.userId }).populate({
      path: 'user',
      model: 'User'
    })
      .populate({
        path: 'vehicle',
        model: 'vehicle'
      });


    res.status(200).send({ status: true, message: "The Following are the User Bookings!", data: userBookings });

  } catch (error) {
    res.status(400).send({ status: false, message: error.message });

  }
}

const getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find().populate({
      path: 'user',
      model: 'User'
    })
      .populate({
        path: 'vehicle',
        model: 'vehicle'
      });


    res.status(200).send({ status: true, message: "The Following are the Bookings!", data: allBookings });

  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
}

const deleteBooking = async (req, res) => {
  try {

    const deletedBooking = await Booking.findByIdAndDelete(req.params.bookingId);
    res.status(200).send({
      status: true,
      message: 'The Boooking is Deleted!',
      data: deletedBooking
    });

  } catch (error) {
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}


const sendConfirmationEmail = async (req, res) => {
  try {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate({
      path: 'user',
      model: 'User'
    })
      .populate({
        path: 'vehicle',
        model: 'vehicle'
      });

    const vat = await Vat.find();

    const pickUpDate = new Date(booking?.pickUpDate);
    const dropOffDate = new Date(booking?.dropOffDate);

    // To calculate the time difference
    const timeDiff = Math.abs(dropOffDate.getTime() - pickUpDate.getTime());
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


    let extrasContent = '';
    for (let i = 0; i < booking.addedExtras.length; i++) {
      const extraObj = booking.addedExtras[i];
      if (extraObj) {
        extrasContent += `
            <tr>
                <td>${extraObj.extraName}</td>
                <td>${extraObj.quantity}</td>
                <td>€${extraObj.price}</td>
                <td>€${extraObj.price * extraObj.quantity}</td>
            </tr>
        `;
      }
    }

    const mailOptions = {
      from: 'yourwaycarhire@gmail.com',
      to: booking.user.email,
      subject: 'Car Booking Confirmation - YourWay Car Hire',
      html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <title>Car Booking Confirmation - YourWay Car Hire</title>
            <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            </style>
            </head>
            <body>
            <h1>Car Booking Confirmation - Your Way Car Hire</h1>
            
            <p>Dear ${booking.user.firstName} ${booking.user.lastName},</p>
            
            <p>Thank you for booking with YourWay Car Hire. We are delighted to serve you and ensure you have a smooth and enjoyable driving experience. Here are the details of your reservation:</p>
            
            <h2>Booking Confirmation</h2>
            
            <p>Date: ${booking.bookingDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} </p>
            
           
            
            <h2>Booking Info</h2>
            
            <table>
              <tr>
                <th>Pick up:</th>
                <td>${booking.pickUpLocation} on ${booking.pickUpDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} | ${booking.pickUpTime} </td>
              </tr>
              <tr>
                <th>Drop off:</th>
                <td>${booking.dropOffLocation} on ${booking.dropOffDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} | ${booking.dropOffTime} </td>
              </tr>
              <tr>
                <th>Payment Method:</th>
                <td>On Arrival</td>
              </tr>
              <tr>
                <th>Total Days:</th>
                <td>${numberOfDays}</td>
              </tr>
              
              
            </table>
            
            <h2>Booking Summary</h2>
            
            <table>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
              <tr>
                <td>${booking.vehicle.name}</td>
                <td>1</td>
                <td>€${booking.vehicle.price}</td>
                <td>€${booking.vehicle.price}</td>
              </tr>
              ${extrasContent}
                
                
              </table>

              <h2>TOTALS</h2>

              <table>
              
                  <tr>
            <th>Promo Discount:</th>
            <td>€${Math.round((booking.vehicle.price / 100) * (booking.promoCode?.discountPercent || 0))}</td>
        </tr>
              <tr>
              <th>Total VAT included:</th>
              <td>€${Math.round((booking.vehicle.price / 100) * booking.vatValue)}</td>
            </tr>
              <tr>
              <th>Grand Total(${numberOfDays}days):</th>
              <td>€${Math.round(booking.netVatedTotal)}</td>
            </tr>
              </table >

              <a href="http://localhost:3000/confirm-booking/${booking._id}">
      <button style="background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;">Confirm Booking</button>
    </a>



                <h2>Important Information</h2>

                <ul>
                  <li>A fee of € 20 is applicable if pick up of vehicle is either from Larnaka or Pafos Airport.</li>
                  <li>The cost of fuel is not included in the price. Our company's policy is to provide the vehicle with a full tank of fuel which is refundable if the vehicle is returned with full tank.</li>
                  <li>The Company reserves the right to waive the charge for Super Collision Damage Waiver (SCDW) for rental periods of less than 7 days and in such a case shall refund the corresponding amount to the credit/debit card used for payment.</li>
                </ul>
              
                <p>We look forward to seeing you soon!</p>
              
                <p>Sincerely,</p>
              
                <p>The YourWay Car Hire Team</p>
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send({ status: false, message: 'Internal server error' });
      } else {
        res.status(200).send({
          status: true,
          message: 'The Email is sended!'

        });
        console.log('Email sent: ' + info.response);
      }
    });





  } catch (error) {
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}


const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    booking.status = 'Confirmed';

    await booking.save();

    res.status(200).send({
      status: true,
      message: 'The Boooking is Confirmed!',
      data: booking
    });

  } catch (error) {
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}

const completeBooking = async (req, res) => {
  console.log('completing');
  try {
    const booking = await Booking.findById(req.params.bookingId);

    booking.status = 'Completed';

    await booking.save();

    res.status(200).send({
      status: true,
      message: 'The Boooking is Completed!',
      data: booking
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}



module.exports = { addBooking, getUserBookings, getAllBookings, deleteBooking, sendConfirmationEmail, confirmBooking, completeBooking };
