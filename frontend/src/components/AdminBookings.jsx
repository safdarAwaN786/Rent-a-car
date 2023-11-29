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
  const [confirming, setConfirming] = useState(false);

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
    axios.get('/get-all-bookings').then((res) => {
      setLoading(false);
      setAllBookings(res.data.data);
      console.log(res.data);
    }).catch((e) => {
      updateData();
      console.log(e);
    })
  }, []);


  const updateData = () => {
    axios.get('/get-all-bookings').then((res) => {
      setLoading(false);
      setAllBookings(res.data.data);
      console.log(res.data);
    }).catch((e) => {
      updateData();
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

          <h3 className='text-center'>All Bookings</h3>

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
                          <th>User Name</th>
                          <td>{bookingToView.user.firstName} {bookingToView.user.lastName}</td>
                        </tr>
                        <tr>
                          <th>User Email</th>
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
                          <th>Booking Date</th>
                          <td>{formatDate(bookingToView.bookingDate)}</td>
                        </tr>
                        <tr>
                          <th>Current Status</th>
                          <td className={`fw-bold ${bookingToView.status === 'Not Confirmed' && 'text-danger'} ${bookingToView.status === 'Confirmed' && 'text-success'} ${bookingToView.status === 'Completed' && 'text-success'}`}>{bookingToView.status}</td>
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

                        <tr>
                          <th>Vehicle Price</th>
                          <td>€{bookingToView.group[bookingToView.currentSeason][bookingToView.daysText]}</td>
                        </tr>
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
                          <td>€{Math.round(bookingToView.group[bookingToView.currentSeason][bookingToView.daysText] / 100) * (bookingToView.promoCode?.discountPercent || 0)}</td>
                        </tr>
                        <tr>
                          <th>Total VAT added</th>
                          <td>€{Math.round(bookingToView.group[bookingToView.currentSeason][bookingToView.daysText] / 100) * (bookingToView.vatValue)}</td>
                        </tr>
                        <tr>
                          <th>Grand Total ({bookingToView.daysNumber}days)</th>
                          <td>€{bookingToView.netVatedTotal}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                  <div className='border-circle px-2 py-2 d-flex  justify-content-center'>
                    {bookingToView.status !== 'Confirmed' && (
                      <a onClick={() => {
                        setConfirming(true);
                        axios.post(`/confirm-booking/${bookingToView._id}`).then((res) => {
                          updateData();
                          setLoading(true);
                          setConfirming(false);
                          setViewBooking(false);
                          setBookingToView(null);
                          toast.success('Booking is Confirmed!')
                        }).catch(e => {
                          setConfirming(false)
                          toast.error('Booking not Confirmed, Try Again')
                        })
                      }} className='btn btn-success'>
                        {confirming ? (
                          <Spinner size='sm' />
                        ) : (
                          'Confirm'
                        )}
                      </a>
                    )}
                    <a onClick={() => {
                      axios.delete(`/delete-booking/${bookingToView._id}`).then((res) => {
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
                </div>
              </div>
            </div>
          )}




          <div className='table-Cover'>


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

                {allBookings?.filter(booking => booking.status !== 'Completed').map((booking, index) => {

                  const date = new Date(booking.bookingDate); // Convert to Date object
                  const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  return (
                    <tr>
                      <th scope="row">{index + 1}. {booking.group?.vehicleName}</th>
                      <td scope='row' className={`${booking.status === 'Not Confirmed' && 'text-danger'} ${booking.status === 'Confirmed' && 'text-success'} `}>{booking.status}</td>
                      <td scope="row">{formattedDate}</td>
                      <td><button onClick={() => {
                        setViewBooking(true);
                        setBookingToView(booking);
                      }} className='btn btn-outline-dark px-1'><BsEyeFill className='fs-5' />View</button></td>




                    </tr>
                  )
                })}
                {allBookings?.filter(booking => booking.status === 'Completed').map((booking, index) => {

                  const date = new Date(booking.bookingDate); // Convert to Date object
                  const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                  return (
                    <tr>
                      <th scope="row">{index + 1}. {booking.group?.vehicleName}</th>
                      <td scope='row' className={`${booking.status === 'Not Confirmed' && 'text-danger'} ${booking.status === 'Confirmed' && 'text-success'} `}>{booking.status}</td>
                      <td scope="row">{formattedDate}</td>
                      <td><button onClick={() => {
                        setViewBooking(true);
                        setBookingToView(booking);
                      }} className='btn btn-outline-dark px-1'><BsEyeFill className='fs-5' />View</button></td>




                    </tr>
                  )
                })}





              </tbody>
            </table>




            {!allBookings || allBookings.length === 0 && (
              <div className='d-flex justify-content-center py-2'>
                <p>No Bookings Found!</p>
              </div>
            )}
          </div>





        </div>
      )}
    </>
  )
}
