import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReservationsBanner from '../components/ReservationsBanner'
import ProductsSection from '../components/ProductsSection'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from 'react-bootstrap/esm/Spinner'
import { CiLocationArrow1 } from 'react-icons/ci'
import { AiFillEye, AiOutlineCloseSquare } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { BsEyeFill } from 'react-icons/bs'


export default function Reservations() {

  const [sendingEmail, setSendingEmail] = useState(false);
  const user = useSelector(state => state.auth.user);
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewBooking, setViewBooking] = useState(false);
  const [bookingToView, setBookingToView] = useState(null);

  const [numberOfdays, setNumberOfDays] = useState(null);


  useEffect(() => {
    if (bookingToView) {
      const pickUpDate = new Date(bookingToView?.pickUpDate);
      const dropOffDate = new Date(bookingToView?.dropOffDate);
      // To calculate the time difference
      const timeDiff = Math.abs(dropOffDate.getTime() - pickUpDate.getTime());
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNumberOfDays(numberOfDays)
    }

  }, [bookingToView])

  const formatDate = (date) => {

    const newDate = new Date(date);
    const formatDate = newDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formatDate;
  }
  const reGetReservations = () => {
    if (user) {
      axios.get(`/get-user-bookings/${user._id}`).then((res) => {
        console.log(res.data);
        setLoading(false)
        setBookings(res.data.data);
      }).catch((e) => {
        console.log(e);
        setLoading(false);
        toast.error('Server error, Please Try Reload!')
      })
    } else {
      toast.warning('LogIn required !')
    }
  }

  useEffect(() => {
    if (user) {
      axios.get(`/get-user-bookings/${user._id}`).then((res) => {
        console.log(res.data);
        setLoading(false)
        setBookings(res.data.data);
      }).catch((e) => {
        console.log(e);
        setLoading(false);
        reGetReservations();
      })
    } else {
      toast.warning('LogIn required !')
    }
  }, [])

  useEffect(() => {
    if (user) {
      axios.get(`/get-user-bookings/${user._id}`).then((res) => {
        console.log(res.data);
        setLoading(false)
        setBookings(res.data.data);
      }).catch((e) => {
        console.log(e);
        setLoading(false);
        reGetReservations();
      })
    } else {
      toast.warning('LogIn required !')
    }

  }, [user])



  return (
    <>
      <Navbar />
      <ReservationsBanner />

      <h3 className='text-center my-3'>Your Bookings</h3>

      {loading && user ? (
        <div className='underTable d-flex justify-content-center my-3'>

          <Spinner />
        </div>
      ) : (
        <>



          {viewBooking && (
            <div className='addProductBox justify-content-center pt-5  '>
              <div className='formBox border-circle  mt-5 pt-4 '>


                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                  <div className='d-flex justify-content-end'>

                    <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                      setViewBooking(false);
                      setBookingToView(null);
                    }} />
                  </div>
                  <h1 className='text-center fs-4'>Booking Information</h1>
                  <div className='table-Cover'>
                    <table class="table infoTable table-striped table-bordered">
                      <tbody>
                        <tr>
                          <th>Your Name</th>
                          <td>{bookingToView.user.firstName} {bookingToView.user.lastName}</td>
                        </tr>
                        <tr>
                          <th>Your Email</th>
                          <td>{bookingToView.user.email}</td>
                        </tr>
                        <tr>
                          <th>Booked Group</th>
                          <td>{bookingToView.group?.groupName}</td>
                        </tr>
                        <tr>
                          <th>Booked Vehicle</th>
                          <td>{bookingToView.group?.vehicleName}</td>
                        </tr>
                        <tr>
                          <th>Additional Comment</th>
                          <td>{bookingToView?.comment || '---'}</td>
                        </tr>
                        <tr>
                          <th>Booking Date</th>
                          <td>{formatDate(bookingToView.bookingDate)}</td>
                        </tr>
                        <tr>
                          <th>Current Status</th>
                          <td className={`fw-bold ${bookingToView.status === 'Not Confirmed' && 'text-warning'} ${bookingToView.status === 'Confirmed' && 'text-success'} ${bookingToView.status === 'Canceled' && 'text-danger'}`}>{bookingToView.status}</td>
                        </tr>
                        <tr>
                          <th>Pick Up Date</th>
                          <td>{formatDate(bookingToView.pickUpDate)}</td>
                        </tr>
                        <tr>
                          <th>Pick Up Time</th>
                          <td>{bookingToView.pickUpTime}</td>
                        </tr>
                        <tr>
                          <th>Pick Up Location</th>
                          <td>{bookingToView.pickUpLocation}</td>
                        </tr>
                        <tr>
                          <th>Drop Off Date</th>
                          <td>{formatDate(bookingToView.dropOffDate)}</td>
                        </tr>
                        <tr>
                          <th>Drop Off Time</th>
                          <td>{bookingToView.dropOffTime}</td>
                        </tr>
                        <tr>
                          <th>Drop Off Location</th>
                          <td>{bookingToView.dropOffLocation}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h4 className='text-center my-2'>Prices</h4>
                  <div className='table-Cover'>
                    <table class="table infoTable table-striped table-bordered">
                      <tbody>
                        {bookingToView?.days.winterBookingDays > 0 && (
                          <tr>
                            <th>Winter Basic Price</th>
                            <td>€{bookingToView.group['winterPrices'][bookingToView.days.totalBookingDays <= 6 ? '1to6daysPrice' : bookingToView.days.totalBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']} X {bookingToView.days.winterBookingDays} = {(bookingToView.group['winterPrices'][bookingToView.days.totalBookingDays <= 6 ? '1to6daysPrice' : bookingToView.days.totalBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * bookingToView.days.winterBookingDays).toFixed(2)}</td>
                          </tr>
                        )}
                        {bookingToView?.days.summerBookingDays > 0 && (
                          <tr>
                            <th>Summer Basic Price</th>
                            <td>€{bookingToView.group['summerPrices'][bookingToView.days.totalBookingDays <= 6 ? '1to6daysPrice' : bookingToView.days.totalBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']} X {bookingToView.days.summerBookingDays} = {(bookingToView.group['summerPrices'][bookingToView.days.totalBookingDays <= 6 ? '1to6daysPrice' : bookingToView.days.totalBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * bookingToView.days.summerBookingDays).toFixed(2)}</td>
                          </tr>
                        )}
                        {bookingToView?.days.summerHighBookingDays > 0 && (
                          <tr>
                            <th>Summer High Basic Price</th>
                            <td>€{bookingToView.group['summerHighPrices'][bookingToView.days.totalBookingDays <= 6 ? '1to6daysPrice' : bookingToView.days.totalBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice']} X {bookingToView.days.summerHighBookingDays} = {(bookingToView.group['summerHighPrices'][bookingToView.days.totalBookingDays <= 6 ? '1to6daysPrice' : bookingToView.days.totalBookingDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice'] * bookingToView.days.summerHighBookingDays).toFixed(2)}</td>
                          </tr>
                        )}
                        <tr>
                          <th>Airport Fee</th>
                          <td>€{bookingToView.airPortFee}</td>
                        </tr>
                        {bookingToView.addedExtras.map((extraObj) => {
                          return (
                            <tr>
                              <th>{extraObj.extraName} </th>
                              <td>€{extraObj.price} X {extraObj.quantity}</td>
                            </tr>
                          )
                        }
                        )}
                        <tr>
                          <th>Promo Discount</th>
                          <td>€{(bookingToView.promoDiscount || 0).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>Total VAT added</th>
                          <td>€{(bookingToView.vatValue).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>Grand Total ({bookingToView.days.totalBookingDays}days)</th>
                          <td>€{(bookingToView.totalPrice).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='table-Cover mx-3 my-3'>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>

                  <th scope="col"># Vehicle</th>

                  <th scope="col">Status</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>


                {bookings?.map((booking, index) => {

                  const date = new Date(booking.bookingDate); // Convert to Date object
                  const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  return (
                    <tr>
                      <th scope="row">{index + 1}. {booking.group?.vehicleName}</th>
                      <td scope='row' className={`${booking.status === 'Not Confirmed' && 'text-warning'} ${booking.status === 'Confirmed' && 'text-success'}  ${booking.status === 'Canceled' && 'text-danger'}`}>{booking.status}</td>
                      <td scope="row">{formattedDate}</td>
                      <td><button onClick={() => {
                        setViewBooking(true);
                        setBookingToView(booking);
                      }} className='btn btn-outline-dark px-1'><BsEyeFill className='fs-5' />View</button></td>
                    </tr>
                  )
                })}
                {!bookings || bookings.length == 0 && (
                  <div className='underTable d-flex justify-content-center py-2'>
                    <p className='text-center'>No Bookings Found!</p>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Footer />
    </>
  )
}
