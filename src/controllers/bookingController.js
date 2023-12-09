const nodemailer = require('nodemailer');
const User = require('../models/User');
const Booking = require('../models/bookingModel');
const Group = require('../models/groupModel');
const Vat = require('../models/VAT');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourwaycarhire@gmail.com',
    pass: 'lyio nmih nues ctxw'
  }
});


const addBooking = async (req, res) => {
  try {
    const bookingUser = await User.findById(req.body.user);
    const group = await Group.findById(req.body.group);
    const booking = new Booking({ ...req.body });
    let extrasContent = '';
    for (let i = 0; i < booking.addedExtras.length; i++) {
      const extraObj = booking.addedExtras[i];
      if (extraObj) {
        extrasContent += `
            <tr>
                <td>${extraObj.extraName}</td>
                <td>€${extraObj.price}</td>
                <td>${extraObj.quantity}</td>
                <td>€${extraObj.price * extraObj.quantity}</td>
            </tr>
        `;
      }
    }

    const mailOptions = {
      from: 'yourwaycarhire@gmail.com',
      to: 'yourwaycarhire@gmail.com', // Change this to the actual email address of the platform owner
      subject: 'New Booking Received',
      html: `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <title>New Booking Received</title>
          <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        h1 {
          text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        img {
            width: 100%;
            margin-top: 20px;
        }
        </style>
          </head>
          <body>
          <h1>New Booking Received - Your Way Car Hire</h1>
          <p>Dear Platform Owner,</p>
          <p>A new booking has been received through YourWay Car Hire. Here are the details of the reservation:</p>
          <p>Date: ${booking.bookingDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} </p>
          <h2>User Information</h2>
          <p>User: ${bookingUser.firstName} ${bookingUser.lastName}</p>
          <p>Email: ${bookingUser.email}</p>
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
                  <th>Booked Group:</th>
                  <td>${group.groupName}</td>
              </tr>
              <tr>
                  <th>Vehicle Name:</th>
                  <td>${group.vehicleName}</td>
              </tr>
              <tr>
                  <th>Total Days:</th>
                  <td>${booking.days.winterBookingDays + booking.days.summerBookingDays + booking.days.summerHighBookingDays}</td>
              </tr>
              <tr>
                  <th>Additional Comment:</th>
                  <td>${booking.comment || '---'}</td>
              </tr>
          </table>
          <h2>Booked Group Prices</h2>
          <table>
              <tr>
                  <th></th>
                  <th>1 - 6 days</th>
                  <th>7 - 14 days</th>
                  <th>15+ days</th>
              </tr>
              <tr>
                  <th>Winter Season</th>
                  <td>€${group['winterPrices']['1to6daysPrice']}</td>
                  <td>€${group['winterPrices']['7to14daysPrice']}</td>
                  <td>€${group['winterPrices']['15plusDaysPrice']}</td>
              </tr>
              <tr>
                  <th>Summer Season</th>
                  <td>€${group['summerPrices']['1to6daysPrice']}</td>
                  <td>€${group['summerPrices']['7to14daysPrice']}</td>
                  <td>€${group['summerPrices']['15plusDaysPrice']}</td>
              </tr>
              <tr>
                  <th>Summer High Season</th>
                  <td>€${group['summerHighPrices']['1to6daysPrice']}</td>
                  <td>€${group['summerHighPrices']['7to14daysPrice']}</td>
                  <td>€${group['summerHighPrices']['15plusDaysPrice']}</td>
              </tr>
          </table>
          <h2>Basic Prices</h2>
          <table>
              <tr>
                  <th></th>
                  <th>Rate per day</th>
                  <th>Days</th>
                  <th>Total Basic</th>
              </tr>
              ${booking.days.winterBookingDays > 0 ?
          `<tr>
             <th>Winter Price</th>
            <td>€${group['winterPrices'][booking.days.winterBookingDays <= 6 ? '1to6daysPrice' : booking.days.winterBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td          
                <td>${booking.days.winterBookingDays}</td>
                    <td>€${(group['winterPrices'][booking.days.winterBookingDays <= 6 ? '1to6daysPrice' : booking.days.winterBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.winterBookingDays).toFixed(2)}</td>
                </tr>` : ''}
                ${booking.days.summerBookingDays > 0 ?
          `<tr>
              <th>Summer Price</th>
              <td>€${group['summerPrices'][booking.days.summerBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td>
              <td>${booking.days.summerBookingDays}</td>
                <td>€${(group['summerPrices'][booking.days.summerBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.summerBookingDays).toFixed(2)}</td>
                  </tr>` : ''}
                  ${booking.days.summerHighBookingDays > 0 ?
          `<tr>
                        <th>Summer High Price</th>
                        <td>€${group['summerHighPrices'][booking.days.summerHighBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerHighBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td>
                        <td>${booking.days.summerHighBookingDays}</td>
                        <td>€${(group['summerHighPrices'][booking.days.summerHighBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerHighBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.summerHighBookingDays).toFixed(2)}</td>
                    </tr>` : ''}
          </table>
          ${booking.addedExtras.length > 0 && (
          `<h2>Extras Added</h2>
            <table>
          <tr>
           <th>Extra Name</th>
           <th>Price</th>
           <th>Quantity</th>
           <th>Total</th>
          </tr>
          ${extrasContent}
          </table>`
        )}
          <h2>TOTALS</h2>
          <table>
              <tr>
                  <th>Air Port Fee:</th>
                  <td>€${booking.airPortFee}</td>
              </tr>
              <tr>
                  <th>Total VAT included:</th>
                  <td>€${(parseFloat((group['winterPrices']['1to6daysPrice'] / 100) * booking.vatValue)).toFixed(2)}</td>
              </tr>
              <tr>
                  <th>Promo Code Discount:</th>
                  <td>€${(booking.promoDiscount).toFixed(2)}</td>
              </tr>
              <tr>
                  <th>Grand Total(${booking.days.winterBookingDays + booking.days.summerBookingDays + booking.days.summerHighBookingDays}days):</th>
                  <td>€${(parseFloat(booking.totalPrice)).toFixed(2)}</td>
              </tr>
          </table>
          <p>We look forward to serving the customer!</p>
          <p>Sincerely,</p>
          <p>The YourWay Car Hire Team</p>
          <img src='https://res.cloudinary.com/dzpac6i3a/image/upload/v1699596015/Screenshot_2023-11-09_144507_qgsvra.png' />
          </body>
          </html>
      `
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        res.status(500).send({ status: false, message: 'Internal server error' });
      } else {
        await booking.save();
        res.status(200).send({
          status: true, message: "The Booking is added!", data: booking
        });
      }
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
      path: 'group',
      model: 'Group'
    }).populate({
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
    }).populate({
      path: 'group',
      model: 'Group'
    });
    // To calculate the time difference

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
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        h1 {
          text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        img {
            width: 100%;
            margin-top: 20px;
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
                  <th>Booked Group:</th>
                  <td>${booking.group.groupName}</td>
              </tr>
              <tr>
                  <th>Vehicle Name:</th>
                  <td>${booking.group.vehicleName}</td>
              </tr>
              <tr>
                  <th>Total Days:</th>
                  <td>${booking.days.winterBookingDays + booking.days.summerBookingDays + booking.days.summerHighBookingDays}</td>
              </tr>
              <tr>
                  <th>Additional Comment:</th>
                  <td>${booking.comment || '---'}</td>
              </tr>
            </table>
            <h2>Basic Prices</h2>
            <table>
                <tr>
                    <th></th>
                    <th>Rate per day</th>
                    <th>Days</th>
                    <th>Total Basic</th>
                </tr>
                ${booking.days.winterBookingDays > 0 ?
          `<tr>
                             <th>Winter Price</th>
                            <td>€${booking.group['winterPrices'][booking.days.winterBookingDays <= 6 ? '1to6daysPrice' : booking.days.winterBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td          
                                <td>${booking.days.winterBookingDays}</td>
                                    <td>€${(booking.group['winterPrices'][booking.days.winterBookingDays <= 6 ? '1to6daysPrice' : booking.days.winterBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.winterBookingDays).toFixed(2)}</td>
                                </tr>` : ''}
                                ${booking.days.summerBookingDays > 0 ?
          `<tr>
                              <th>Summer Price</th>
                              <td>€${booking.group['summerPrices'][booking.days.summerBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td>
                              <td>${booking.days.summerBookingDays}</td>
                                <td>€${(booking.group['summerPrices'][booking.days.summerBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.summerBookingDays).toFixed(2)}</td>
                                  </tr>` : ''}
                                  ${booking.days.summerHighBookingDays > 0 ?
          `<tr>
                                        <th>Summer High Price</th>
                                        <td>€${booking.group['summerHighPrices'][booking.days.summerHighBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerHighBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td>
                                        <td>${booking.days.summerHighBookingDays}</td>
                                        <td>€${(booking.group['summerHighPrices'][booking.days.summerHighBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerHighBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.summerHighBookingDays).toFixed(2)}</td>
                                    </tr>` : ''}
            </table>
            <h2>Extras Added</h2>
            <table>
            <tr>
             <th>Extra Name</th>
             <th>Price</th>
             <th>Quantity</th>
             <th>Total</th>
            </tr>
            ${extrasContent}
            </table>
            <h2>TOTALS</h2>
          <table>
              <tr>
                  <th>Air Port Fee:</th>
                  <td>€${booking.airPortFee}</td>
              </tr>
              <tr>
                  <th>Total VAT included:</th>
                  <td>€${(parseFloat(booking.vatValue)).toFixed(2)}</td>
              </tr>
              <tr>
                  <th>Promo Code Discount:</th>
                  <td>€${(booking.promoDiscount).toFixed(2)}</td>
              </tr>
              <tr>
                  <th>Grand Total(${booking.days.winterBookingDays + booking.days.summerBookingDays + booking.days.summerHighBookingDays}days):</th>
                  <td>€${(parseFloat(booking.totalPrice)).toFixed(2)}</td>
              </tr>
          </table>
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


    const mailOptionsForOwner = {
      from: 'yourwaycarhire@gmail.com',
      to: 'yourwaycarhire@gmail.com',
      subject: 'Car Booking Confirmation - YourWay Car Hire',
      html: `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <title>Car Booking Confirmation - YourWay Car Hire</title>
            <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        h1 {
          text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        img {
            width: 100%;
            margin-top: 20px;
        }
        </style>
            </head>
            <body>
            <h1>Car Booking Confirmation - Your Way Car Hire</h1>
            <p>Dear Admin,</p>
            <p>Congratulations, You have just Confirmed a new booking</p>
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
                  <th>Booked Group:</th>
                  <td>${booking.group.groupName}</td>
              </tr>
              <tr>
                  <th>Vehicle Name:</th>
                  <td>${booking.group.vehicleName}</td>
              </tr>
              <tr>
                  <th>Total Days:</th>
                  <td>${booking.days.winterBookingDays + booking.days.summerBookingDays + booking.days.summerHighBookingDays}</td>
              </tr>
              <tr>
                  <th>Additional Comment:</th>
                  <td>${booking.comment || '---'}</td>
              </tr>
            </table>
            <h2>Basic Prices</h2>
            <table>
                <tr>
                    <th></th>
                    <th>Rate per day</th>
                    <th>Days</th>
                    <th>Total Basic</th>
                </tr>
                ${booking.days.winterBookingDays > 0 ?
          `<tr>
                     <th>Winter Price</th>
                    <td>€${booking.group['winterPrices'][booking.days.winterBookingDays <= 6 ? '1to6daysPrice' : booking.days.winterBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td          
                        <td>${booking.days.winterBookingDays}</td>
                            <td>€${(booking.group['winterPrices'][booking.days.winterBookingDays <= 6 ? '1to6daysPrice' : booking.days.winterBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.winterBookingDays).toFixed(2)}</td>
                        </tr>` : ''}
                        ${booking.days.summerBookingDays > 0 ?
          `<tr>
                      <th>Summer Price</th>
                      <td>€${booking.group['summerPrices'][booking.days.summerBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td>
                      <td>${booking.days.summerBookingDays}</td>
                        <td>€${(booking.group['summerPrices'][booking.days.summerBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.summerBookingDays).toFixed(2)}</td>
                          </tr>` : ''}
                          ${booking.days.summerHighBookingDays > 0 ?
          `<tr>
                                <th>Summer High Price</th>
                                <td>€${booking.group['summerHighPrices'][booking.days.summerHighBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerHighBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']}</td>
                                <td>${booking.days.summerHighBookingDays}</td>
                                <td>€${(booking.group['summerHighPrices'][booking.days.summerHighBookingDays <= 6 ? '1to6daysPrice' : booking.days.summerHighBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * booking.days.summerHighBookingDays).toFixed(2)}</td>
                            </tr>` : ''}
            </table>
            <h2>Extras Added</h2>
            <table>
            <tr>
             <th>Extra Name</th>
             <th>Price</th>
             <th>Quantity</th>
             <th>Total</th>
            </tr>
            ${extrasContent}
            </table>
            <h2>TOTALS</h2>
          <table>
              <tr>
                  <th>Air Port Fee:</th>
                  <td>€${booking.airPortFee}</td>
              </tr>
              <tr>
                  <th>Total VAT included:</th>
                  <td>€${(parseFloat(booking.vatValue)).toFixed(2)}</td>
              </tr>
              <tr>
                  <th>Promo Code Discount:</th>
                  <td>€${(booking.promoDiscount).toFixed(2)}</td>
              </tr>
              <tr>
                  <th>Grand Total(${booking.days.winterBookingDays + booking.days.summerBookingDays + booking.days.summerHighBookingDays}days):</th>
                  <td>€${(parseFloat(booking.totalPrice)).toFixed(2)}</td>
              </tr>
          </table>
          <p>We look forward to serving the customer!</p>
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
    transporter.sendMail(mailOptionsForOwner, async function (error, info) {
      if (error) {
        res.status(500).send({ status: false, message: 'Internal server error' });
      } else {
        console.log('Email sent: ' + info.response)
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}





module.exports = { addBooking, getUserBookings, getAllBookings, deleteBooking, confirmBooking };
