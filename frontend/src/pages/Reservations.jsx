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

  const formatDate = (date) => {

    const newDate = new Date(date);
    const formatDate = newDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formatDate;
  }

  useEffect(() => {
    if (user) {

      axios.get(`/booking/get-user-bookings/${user._id}`).then((res) => {
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
  }, [])

  useEffect(() => {
    if (user) {

      axios.get(`/booking/get-user-bookings/${user._id}`).then((res) => {
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

  }, [user])



  return (
    <>
      <Navbar />
      <ReservationsBanner />
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

              <form className='p-1' encType='multipart/form-data' onSubmit={(event) => {
                event.preventDefault();
              }}>
                <div className='d-flex flex-column'>


                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Your Email :</span>
                    <span className='w-50 text-end  fw-bold'>{bookingToView.user.email}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Booked Vehicle :</span>
                    <span className='w-50 text-end  fw-bold'>{bookingToView.vehicle.name}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Booking Date :</span>
                    <span className='w-50 text-end  fw-bold'>{formatDate(bookingToView.bookingDate)}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Current Status :</span>
                    <span className={`w-50 text-end fw-bold ${bookingToView.status === 'Not Confirmed' && 'text-danger'} ${bookingToView.status === 'Confirmed' && 'text-success'} ${bookingToView.status === 'Completed' && 'text-success'}`}>{bookingToView.status}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Pick Up Date :</span>
                    <span className='w-50 text-end  fw-bold'>{formatDate(bookingToView.pickUpDate)}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Pick Up Time :</span>
                    <span className='w-50 text-end  fw-bold'>{bookingToView.pickUpTime}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Pick Up Location :</span>
                    <span className='w-50 text-end  fw-bold'>{bookingToView.pickUpLocation}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Drop Off Date :</span>
                    <span className='w-50 text-end  fw-bold'>{formatDate(bookingToView.dropOffDate)}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Drop Off Time :</span>
                    <span className='w-50 text-end  fw-bold'>{bookingToView.dropOffTime}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Drop Off Location :</span>
                    <span className='w-50 text-end  fw-bold'>{bookingToView.dropOffLocation}</span>
                  </div>
                  <h4 className='text-center'>Prices</h4>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Vehicle Price :</span>
                    <span className='w-50 text-end  fw-bold'>€{bookingToView.vehicle.price}</span>
                  </div>
                  {bookingToView.addedExtras.map((extraObj) => {
                    return (
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='w-50 fw-bold'>{extraObj.extraName} :</span>
                        <span className='w-50 text-end  fw-bold'>€{extraObj.price} X {extraObj.quantity}</span>
                      </div>
                    )
                  })}
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Promo Discount :</span>
                    <span className='w-50 text-end  fw-bold'>€{Math.round(bookingToView.vehicle.price / 100) * (bookingToView.promoCode?.discountPercent || 0)}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Total VAT added :</span>
                    <span className='w-50 text-end  fw-bold'>€{Math.round(bookingToView.vehicle.price / 100) * (bookingToView.vatValue)}</span>
                  </div>
                  <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                    <span className='w-50 fw-bold'>Grand Total :</span>
                    <span className='w-50 text-end  fw-bold'>€{bookingToView.netVatedTotal}</span>
                  </div>

                  


                </div>
              </form>

            </div>


          </div>
        </div>
      )}
      <div className='my-5 mx-3'>


        <div className='myTable'>

          <div className='underTable d-flex bg-secondary text-bold text-light border-circle py-2 px-2 justify-content-between'>
            <div>
              <span className='fs-5 fw-bold'>Vehicle Name</span>
            </div>
            <div>
              <span className='fs-5 fw-bold'>Booking Status</span>
            </div>
            <div>
              <span className='fs-5 fw-bold'>Booking Date</span>
            </div>
            <div>
              <span className='fs-5 fw-bold'>Action</span>
            </div>
          </div>

          {loading && user ? (
            <div className='underTable d-flex justify-content-center my-3'>

              <Spinner />
            </div>
          ) : (
            <>


              {bookings?.map((booking) => {

                const date = new Date(booking.bookingDate); // Convert to Date object
                const formattedDate = date.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                return (
                  <div className='underTable d-flex bg-light border-circle py-2 px-2 fw-bold justify-content-between'>
                    <div>
                      <span>{booking.vehicle.name}</span>
                    </div>
                    <div>
                      <span className={`fw-bold ${booking.status === 'Not Confirmed' && 'text-danger'} ${booking.status === 'Confirmed' && 'text-success'} ${booking.status === 'Completed' && 'text-success'}`}>{booking.status}</span>
                    </div>
                    <div>
                      <span>{formattedDate}</span>
                    </div>
                    <div>



                      <button onClick={() => {
                        setViewBooking(true);
                        setBookingToView(booking);
                      }} className='btn btn-outline-dark p-1'><BsEyeFill className='fs-5' />View</button>

                    </div>

                  </div>
                )
              })}

              {!bookings || bookings.length == 0 && (
                <div className='underTable d-flex justify-content-center py-2'>
                  <p>No Bookings Found!</p>
                </div>
              )}
            </>
          )}
        </div>

      </div>
      <Footer />
    </>
  )
}
