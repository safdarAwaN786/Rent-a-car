const nodemailer = require('nodemailer');
const User = require('../models/User');
const Booking = require('../models/bookingModel');
const Group = require('../models/groupModel');
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
    console.log(req.body);
    const group = await Group.findById(req.body.group);
    const vatedPrice = req.body.totalPrice + ((group[req.body.currentSeason][req.body.daysText] / 100) * vat[0].value)
    const booking = new Booking({ ...req.body, netVatedTotal: Math.round(vatedPrice), vatValue: vat[0].value });
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
    }).populate({
      path : 'group',
      model : 'Group'
    })
      .populate({
        path: 'group',
        model: 'Group'
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
    }).populate({
        path: 'group',
        model: 'Group'
      });

     console.log(allBookings);

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





const confirmBooking = async (req, res) => {
  try {


    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate({
      path: 'user',
      model: 'User'
    })
      .populate({
        path: 'group',
        model: 'Group'
      });



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
            img{
              width : 100%;
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
                <td>${booking.group.vehicleName}</td>
                <td>1</td>
                <td>€${booking.group[booking.currentSeason][booking.daysText]}</td>
                <td>€${booking.group[booking.currentSeason][booking.daysText]}</td>
              </tr>
              ${extrasContent}
                
                
              </table>

              <h2>TOTALS</h2>

              <table>
              
                  <tr>
            <th>Promo Discount:</th>
            <td>€${Math.round((booking.group[booking.currentSeason][booking.daysText] / 100) * (booking.promoCode?.discountPercent || 0))}</td>
        </tr>
              <tr>
              <th>Total VAT included:</th>
              <td>€${Math.round((booking.group[booking.currentSeason][booking.daysText] / 100) * booking.vatValue)}</td>
            </tr>
              <tr>
              <th>Grand Total(${numberOfDays}days):</th>
              <td>€${Math.round(booking.netVatedTotal)}</td>
            </tr>
              </table >

              



                <h2>Important Information</h2>

                <ul>
                  <li>A fee of € 20 is applicable if pick up of vehicle is either from Larnaka or Pafos Airport.</li>
                  <li>The cost of fuel is not included in the price. Our company's policy is to provide the vehicle with a full tank of fuel which is refundable if the vehicle is returned with full tank.</li>
                  <li>The Company reserves the right to waive the charge for Super Collision Damage Waiver (SCDW) for rental periods of less than 7 days and in such a case shall refund the corresponding amount to the credit/debit card used for payment.</li>
                </ul>
              
                <p>We look forward to seeing you soon!</p>
              
                <p>Sincerely,</p>
              
                <p>The YourWay Car Hire Team</p>
                <img src='https://res.cloudinary.com/dzpac6i3a/image/upload/v1699596015/Screenshot_2023-11-09_144507_qgsvra.png' />
`
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        res.status(500).send({ status: false, message: 'Internal server error' });
      } else {

        console.log('Email sent: ' + info.response);
        booking.status = 'Confirmed';

        await booking.save();

        res.status(200).send({
          status: true,
          message: 'The Boooking is Confirmed!',
          data: booking
        });
      }
    });



  } catch (error) {
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}





module.exports = { addBooking, getUserBookings, getAllBookings, deleteBooking, confirmBooking };
