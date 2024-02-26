const nodemailer = require('nodemailer');
const User = require('../models/User');
const Booking = require('../models/bookingModel');
const Group = require('../models/groupModel');

// Curretly, this one is under use.
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "yourwaycarhire@gmail.com",
//     pass: "kvvh fsme ckfc mxjv"
//   },
// });

// Create a Nodemailer transporter using Outlook settings
// const transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com', // Outlook SMTP server
//   port: 587, // Outlook SMTP port (587 is the standard non-encrypted port)
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'yourway-carhire@outlook.com', // Your Outlook email address
//     pass: 'abc123ABC', // Your Outlook email password
//   },
// });

var transporter = nodemailer.createTransport({
  host: "smtp-legacy.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "info@yourway-carhire.com",
    pass: "Par75568"
  }
});

// var transporter = nodemailer.createTransport({
//   host: "mail-out.cytanet.com.cy",
//   port: 25, // or 587 for TLS
//   secure: true,
//   auth: {
//     user: "apetsas",
//     pass: "User!0802ap"
//   },
//   tls: {
//     // Add SSL options here
//     secureOptions: 0x02000000
// }
// });

const addBooking = async (req, res) => {
  try {
    const bookingUser = await User.findById(req.body.user);
    const group = await Group.findById(req.body.group).populate({
      path: 'prices.season',
      model: 'season'
    });
    const booking = new Booking({ ...req.body });
    let extrasContent = '';
    booking.addedExtras.forEach(extraObj => {
      extrasContent += `
            <tr>
                <td>${extraObj.extraName}</td>
                <td>€${extraObj.price}</td>
                <td>${extraObj.quantity}</td>
                <td>${(extraObj.extraName === 'Super Collision Damage Waiver (SCDW)' || extraObj.extraName === 'Tyres, Windscreen, Underbody') ? booking.totalBookingDays : '-'}</td>
                <td>€${(extraObj.extraName === 'Super Collision Damage Waiver (SCDW)' || extraObj.extraName === 'Tyres, Windscreen, Underbody') ? extraObj.price * extraObj.quantity * booking.totalBookingDays : extraObj.price * extraObj.quantity}</td>
            </tr>
        `;
    })
    let groupPrices = '';
    group.prices.forEach(priceObj => {
      if(priceObj.season){
        groupPrices += `
        <tr>
        <td>${priceObj.season?.seasonName}</td>
        <td>€${priceObj.sixDaysPrice}</td>
        <td>${priceObj.fourteenDaysPrice}</td>
        <td>€${priceObj.fifteenDaysPrice}</td>
        </tr>
        `;
      }
    })
    let basicPrices = '';
    booking.days.forEach(dayObj => {
      const priceObj = group.prices.find(priceObj => priceObj.season?._id.equals(dayObj.season));
      basicPrices += `
            <tr>
                <td>${priceObj.season?.seasonName}</td>
                <td>€${booking.totalBookingDays <= 6 ? priceObj.sixDaysPrice : booking.totalBookingDays <= 14 ? priceObj.fourteenDaysPrice : priceObj.fifteenDaysPrice}</td>
                <td>${dayObj.days}</td>
                <td>€${(booking.totalBookingDays <= 6 ? priceObj?.sixDaysPrice : booking.totalBookingDays <= 14 ? priceObj?.fourteenDaysPrice : priceObj?.fifteenDaysPrice) * dayObj.days}</td>
            </tr>
        `;
    })



    const mailOptionsForOwner = {
      from: 'info@yourway-carhire.com',
      to: 'info@yourway-carhire.com',
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
            width: 60%;
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
                  <td>${booking.totalBookingDays}</td>
              </tr>
              <tr>
                  <th>Additional Comment:</th>
                  <td>${booking.comment || '---'}</td>
              </tr>
          </table>
          <h2>Booked Group Prices</h2>
          <table>
              <tr>
                  <th>Season</th>
                  <th>1 - 6 days</th>
                  <th>7 - 14 days</th>
                  <th>15+ days</th>
              </tr>
              ${groupPrices}
          </table>
          <h2>Basic Prices</h2>
         
            <table>
            ${booking.totalBookingDays > 3 ? (

          ` <tr>
                      <th></th>
                      <th>Rate per day</th>
                      <th>Days</th>
                      <th>Total Basic</th>
                  </tr>
                  ${basicPrices}
                      `
        ) : ''}
        <tr>
                  <th>Promo Code Discount:</th>
                  <td>€${(booking.promoDiscount).toFixed(2)}</td>
              </tr>
                    <tr>
                    <th>Total Basic Price</th>
                    <td>€${booking.basicPrice}</td>
                    </tr>
          </table>
          
          ${booking.addedExtras.length > 0 ? (
          `<h2>Extras Added</h2>
            <table>
          <tr>
           <th>Extra Name</th>
           <th>Price</th>
           <th>Quantity</th>
           <th>Days</th>
           <th>Total</th>
          </tr>
          ${extrasContent}
          </table>`
        ) : ''}

          <h2>TOTALS</h2>
          <table>
              <tr>
                  <th>Airport Fee:</th>
                  <td>€${booking.airPortFee}</td>
              </tr>
              <tr>
                  <th>Total VAT included:</th>
                  <td>€${(parseFloat(booking.vatValue)).toFixed(2)}</td>
              </tr>
              
              <tr>
                  <th>Grand Total(${booking.totalBookingDays}days):</th>
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
    const mailOptionsForUser = {
      from: 'info@yourway-carhire.com', //this will be replaced with "info@yourway-carhire.com"
      to: bookingUser.email, 
      subject: 'Booking Received',
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
            width: 60%;
            margin-top: 20px;
        }
        </style>
          </head>
          <body>
          <h1>Booking Received - Your Way Car Hire</h1>
          <p>Dear ${bookingUser.firstName} ${bookingUser.lastName},</p>
          <p>Thank you for choosing our service for your booking. We appreciate your trust in us.</p>
          <p>We would like to inform you that your booking is currently in a pending status and is awaiting confirmation. Our team is working diligently to process your request and will get back to you with the confirmation details as soon as possible.</p>

          <p>Date: ${booking.bookingDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} </p>
          
          <h2>Booking Information</h2>
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
                  <td>${booking.totalBookingDays}</td>
              </tr>
              <tr>
                  <th>Additional Comment:</th>
                  <td>${booking.comment || '---'}</td>
              </tr>
          </table>
         
          <h2>Basic Prices</h2>
         
            <table>
            ${booking.totalBookingDays > 3 ? (

          ` <tr>
                      <th></th>
                      <th>Rate per day</th>
                      <th>Days</th>
                      <th>Total Basic</th>
                  </tr>
                  
                    ${basicPrices}
                      `
        ) : ''}
        <tr>
                  <th>Promo Code Discount:</th>
                  <td>€${(booking.promoDiscount).toFixed(2)}</td>
              </tr>
                    <tr>
                    <th>Total Basic Price</th>
                    <td>€${booking.basicPrice}</td>
                    </tr>
          </table>
          
          ${booking.addedExtras.length > 0 ? (
          `<h2>Extras Added</h2>
            <table>
          <tr>
           <th>Extra Name</th>
           <th>Price</th>
           <th>Quantity</th>
           <th>Days</th>
           <th>Total</th>
          </tr>
          ${extrasContent}
          </table>`
        ) : ''}

          <h2>TOTALS</h2>
          <table>
              <tr>
                  <th>Airport Fee:</th>
                  <td>€${booking.airPortFee}</td>
              </tr>
              <tr>
                  <th>Total VAT included:</th>
                  <td>€${(parseFloat(booking.vatValue)).toFixed(2)}</td>
              </tr>
              
              <tr>
                  <th>Grand Total(${booking.totalBookingDays}days):</th>
                  <td>€${(parseFloat(booking.totalPrice)).toFixed(2)}</td>
              </tr>
          </table>
          <p>We appreciate your patience and understanding. We look forward to serving you and ensuring a seamless experience.</p>
          <p>Sincerely,</p>
          <p>The YourWay Car Hire Team</p>
          <img src='https://res.cloudinary.com/dzpac6i3a/image/upload/v1699596015/Screenshot_2023-11-09_144507_qgsvra.png' />
          </body>
          </html>
      `
    };



    transporter.sendMail(mailOptionsForOwner, async function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({ status: false, message: 'Internal server error' });
      } else {
        transporter.sendMail(mailOptionsForUser, async function (error, info) {
          if (error) {
            console.log(error);
            res.status(500).send({ status: false, message: 'Internal server error' });
          } else {
            await booking.save();
            res.status(200).send({
              status: true, message: "The Booking is added!", data: booking
            });
          }
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
      model: 'Group',
      populate: {
        path: 'prices.season',
        model: 'season'
      }
    }).populate({
      path: 'days.season',
      model: 'season'
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
      model: 'Group',
      populate: {
        path: 'prices.season',
        model: 'season'
      }
    }).populate({
      path: 'days.season',
      model: 'season'
    });

    res.status(200).send({ status: true, message: "The Following are the Bookings!", data: allBookings });
  } catch (error) {
    console.log(error);
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
      model: 'Group',
      populate: {
        path: 'prices.season',
        model: 'season'
      }
    }).populate({
      path: 'days.season',
      model: 'season'
    });
    const group = await Group.findById(booking.group._id).populate({
      path: 'prices.season',
      model: 'season'
    });

    let extrasContent = '';
    booking.addedExtras.forEach(extraObj => {
      extrasContent += `
            <tr>
                <td>${extraObj.extraName}</td>
                <td>€${extraObj.price}</td>
                <td>${extraObj.quantity}</td>
                <td>${(extraObj.extraName === 'Super Collision Damage Waiver (SCDW)' || extraObj.extraName === 'Tyres, Windscreen, Underbody') ? booking.totalBookingDays : '-'}</td>
                <td>€${(extraObj.extraName === 'Super Collision Damage Waiver (SCDW)' || extraObj.extraName === 'Tyres, Windscreen, Underbody') ? extraObj.price * extraObj.quantity * booking.totalBookingDays : extraObj.price * extraObj.quantity}</td>
            </tr>
        `;
    })

    let basicPrices = '';
    booking.days.forEach(dayObj => {
      const priceObj = group.prices.find(priceObj => priceObj.season?._id.equals(dayObj.season?._id));
      basicPrices += `
            <tr>
                <td>${dayObj.season?.seasonName}</td>
                <td>€${booking.totalBookingDays <= 6 ? priceObj?.sixDaysPrice : booking.totalBookingDays <= 14 ? priceObj?.fourteenDaysPrice : priceObj?.fifteenDaysPrice}</td>
                <td>${dayObj.days}</td>
                <td>€${(booking.totalBookingDays <= 6 ? priceObj?.sixDaysPrice : booking.totalBookingDays <= 14 ? priceObj?.fourteenDaysPrice : priceObj?.fifteenDaysPrice) * dayObj.days}</td>
            </tr>
        `;
    })

    const mailOptions = {
      from: 'info@yourway-carhire.com',
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
            width: 60%;
            margin-top: 20px;
        }
        </style>
            </head>
            <body>
            <h1>Car Booking Confirmation - Your Way Car Hire</h1>
            <p>Dear ${booking.user.firstName} ${booking.user.lastName},</p>
            <p>Congratulations, Your Booking has been Confirmed with "Your Way - Car Hire". We are delighted to serve you and ensure you have a smooth and enjoyable driving experience. Here are the details of your reservation:</p>
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
                  <td>${booking.totalBookingDays}</td>
              </tr>
              <tr>
                  <th>Additional Comment:</th>
                  <td>${booking.comment || '---'}</td>
              </tr>
          </table>
          <h2>Basic Prices</h2>      
      <table>
            ${booking.totalBookingDays > 3 ? (

          ` <tr>
                      <th></th>
                      <th>Rate per day</th>
                      <th>Days</th>
                      <th>Total Basic</th>
                  </tr>
                    ${basicPrices}
                      `
        ) : ''}
        <tr>
                  <th>Promo Code Discount:</th>
                  <td>€${(booking.promoDiscount).toFixed(2)}</td>
              </tr>
                    <tr>
                    <th>Total Basic Price</th>
                    <td>€${booking.basicPrice}</td>
                    </tr>
          </table>
          
          ${booking.addedExtras.length > 0 ? (
          `<h2>Extras Added</h2>
            <table>
          <tr>
           <th>Extra Name</th>
           <th>Price</th>
           <th>Quantity</th>
           <th>Days</th>
           <th>Total</th>
          </tr>
          ${extrasContent}
          </table>`
        ) : ''}

          <h2>TOTALS</h2>
          <table>
              <tr>
                  <th>Airport Fee:</th>
                  <td>€${booking.airPortFee}</td>
              </tr>
              <tr>
                  <th>Total VAT included:</th>
                  <td>€${(parseFloat(booking.vatValue)).toFixed(2)}</td>
              </tr>
              
              <tr>
                  <th>Grand Total(${booking.totalBookingDays}days):</th>
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

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
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
    console.log(error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate({
      path: 'user',
      model: 'User'
    }).populate({
      path: 'group',
      model: 'Group'
    }).populate({
      path: 'days.season',
      model: 'season'
    });

    booking.status = 'Canceled';
    await booking.save();
    res.status(200).send({
      status: true,
      message: 'The Boooking is Canceled!',
      data: booking
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
}


module.exports = { addBooking, getUserBookings, getAllBookings, deleteBooking, confirmBooking, cancelBooking };
