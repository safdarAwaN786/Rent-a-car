import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import Spinner from 'react-bootstrap/esm/Spinner';

export default function AdminBookings() {

  const [allBookings, setAllBookings] = useState(null);
  const [viewBooking, setViewBooking] = useState(false);
  const [bookingToView, setBookingToView] = useState(null);
  const [loading, setLoading] = useState(true);

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
    axios.get('/booking/get-all-bookings').then((res) => {
      setLoading(false);
      setAllBookings(res.data.data);
      console.log(res.data);
    }).catch((e) => {
      toast.error('Server Error, Try Reload !');
      console.log(e);
    })
  }, []);


  const updateData = () => {
    axios.get('/booking/get-all-bookings').then((res) => {
      setLoading(false);
      setAllBookings(res.data.data);
      console.log(res.data);
    }).catch((e) => {
      toast.error('Server Error, Try Reload !');
      console.log(e);
    })
  }
  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center my-3'>
          <Spinner />
        </div>
      ) : (
        <div className='p-3'>

          <h3 className='text-center'>Current Bookings</h3>

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
                        <span className='fw-bold'>User Name :</span>
                        <span className=' fw-bold'>{bookingToView.user.firstName} {bookingToView.user.lastName}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>User Email :</span>
                        <span className=' fw-bold'>{bookingToView.user.email}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Booked Vehicle :</span>
                        <span className=' fw-bold'>{bookingToView.vehicle.name}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Booking Date :</span>
                        <span className=' fw-bold'>{formatDate(bookingToView.bookingDate)}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Current Status :</span>
                        <span className={`fw-bold ${bookingToView.status === 'Not Confirmed' && 'text-danger'} ${bookingToView.status === 'Confirmed' && 'text-primary'} ${bookingToView.status === 'Completed' && 'text-success'}`}>{bookingToView.status}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Pick Up Date :</span>
                        <span className=' fw-bold'>{formatDate(bookingToView.pickUpDate)}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Pick Up Time :</span>
                        <span className=' fw-bold'>{bookingToView.pickUpTime}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Pick Up Location :</span>
                        <span className=' fw-bold'>{bookingToView.pickUpLocation}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Drop Off Date :</span>
                        <span className=' fw-bold'>{formatDate(bookingToView.dropOffDate)}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Drop Off Time :</span>
                        <span className=' fw-bold'>{bookingToView.dropOffTime}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Drop Off Location :</span>
                        <span className=' fw-bold'>{bookingToView.dropOffLocation}</span>
                      </div>
                      <h4 className='text-center'>Prices</h4>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Vehicle Price :</span>
                        <span className=' fw-bold'>€{bookingToView.vehicle.price}</span>
                      </div>
                      {bookingToView.addedExtras.map((extraObj) => {
                        return (
                          <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                            <span className='fw-bold'>{extraObj.extraName} :</span>
                            <span className=' fw-bold'>€{extraObj.price} X {extraObj.quantity}</span>
                          </div>
                        )
                      })}
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Promo Discount :</span>
                        <span className=' fw-bold'>€{Math.round(bookingToView.vehicle.price / 100) * (bookingToView.promoCode?.discountPercent || 0)}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Total VAT added :</span>
                        <span className=' fw-bold'>€{Math.round(bookingToView.vehicle.price / 100) * (bookingToView.vatValue)}</span>
                      </div>
                      <div className=' border-circle px-2 py-1 d-flex  justify-content-between'>
                        <span className='fw-bold'>Grand Total :</span>
                        <span className=' fw-bold'>€{bookingToView.netVatedTotal}</span>
                      </div>

                      {bookingToView.status === 'Confirmed' && (

                        <div className='border-circle px-2 py-2 d-flex  justify-content-center'>
                          <a onClick={() => {
                            axios.post(`/booking/complete-booking/${bookingToView._id}`).then((res) => {
                              updateData();
                              setLoading(true);
                              setViewBooking(false);
                              setBookingToView(null);
                              toast.success('Booking is Completed!')
                            }).catch(e => {
                              toast.error('Booking not Completed, Try Again')
                            })
                          }} className='btn btn-success'>Complete</a>
                          <a onClick={() => {
                            axios.delete(`/booking/delete-booking/${bookingToView._id}`).then((res) => {
                              setLoading(true);
                              updateData()
                              setViewBooking(false);
                              setBookingToView(null);
                              toast.success('Booking is Deleted!')
                            }).catch(e => {
                              toast.error('Booking not Deleted, Try Again')
                            })
                          }} className='btn btn-dark mx-1 p-1 px-2'><MdDelete className='fs-4' /></a>
                        </div>
                      )}


                    </div>
                  </form>

                </div>


              </div>
            </div>
          )}

          <div className='d-flex bg-secondary text-white p-2 fw-bold justify-content-between'>
            <span>#. Vehicle</span>
            <span>Status</span>
            <span>Booing Date</span>
            <span>Action</span>
          </div>

          {allBookings?.filter(booking => booking.status !== 'Completed').map((booking, index) => {

            const date = new Date(booking.bookingDate); // Convert to Date object
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            return (
              <div className='d-flex bg-light p-2 fw-bold justify-content-between'>
                <span>{index + 1}. {booking.vehicle.name}</span>
                <span className={`${booking.status === 'Not Confirmed' && 'text-danger'} ${booking.status === 'Confirmed' && 'text-primary'} ${booking.status === 'Completed' && 'text-success'}`}>{booking.status}</span>
                <span>{formattedDate}</span>
                <span><button onClick={() => {
                  setViewBooking(true);
                  setBookingToView(booking);
                }} className='btn btn-outline-dark px-1'><BsEyeFill className='fs-5' />View
                  {/* <button className='btn btn-outline-success mx-1' onClick={()=>{
                axios.post(`/booking/send-confirmation-email/${booking._id}`).then((res) => {
                        toast.success('Booking is Completed!')
                      }).catch(e => {
                        toast.error('Booking not Completed, Try Again')
                      })
              }}>Complete</button> */}
                </button></span>
              </div>
            )
          })}
          {!allBookings || allBookings.length === 0 && (
            <div className='d-flex justify-content-center py-2'>
                <p>No Bookings Found!</p>
              </div>
          )}

        </div>
      )}
    </>
  )
}
