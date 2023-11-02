import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Select } from 'antd';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearPreSubmission, submitPreBooking, updateBookingInfo } from '../redux/slices/bookingSlices';


export default function MainSection() {

    const [customPickUp, setCustomPickUp] = useState(false);
    const [customDropOff, setCustomDropOff] = useState(false);

    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const bookingSubmitted = useSelector(state => state.booking.isBookingSubmitted);
    const bookingData = useSelector(state => state.booking.bookingData);


    const updateBookingData = (e) => {
        
        dispatch(updateBookingInfo({...bookingData, [e.target.name] : e.target.value}));

        // setBookingData({ ...bookingData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()
    const locations = [
        { value: 'Larnaka Airport', label: <div>Larnaka Airport</div> },
        { value: 'Pafos Airport', label: <div>Pafos Airport</div> },
        { value: 'Pafos Office', label: <div>Pafos Office</div> },
        { value: 'Limassol Office', label: <div>Limassol Office</div> },
        { value: 'Ayia Napa Office', label: <div>Ayia Napa Office</div> },
        { value: 'Nicosia Office', label: <div>Nicosia Office</div> },
        { value: 'Custom Location', label: <div>Custom Location</div> },

    ]
    return (
        <>
            <div class="banner-section2">
                <div class="">
                    <div class="">
                        <div class="banner-content">
                            {/* <!-- <h1>Explore Cyprus</h1> --> */}
                            <h1 className='px-2'>Start Your Journey 'Your Way'!</h1>
                            <p className='px-2'>Drive into Unforgettable Experiences with 'Your Way' Car Hire - Your Companion for Reliable and
                                Exciting Journeys Across the Island</p>
                            <div className='bg-white py-3'>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (loggedIn) {
                                        dispatch(submitPreBooking());
                                        
                                        dispatch(updateBookingInfo({...bookingData, user : user._id}));                                       
                                        navigate('/vehicle-guide')
                                    } else {
                                        dispatch(clearPreSubmission());
                                        toast.warning('Please LogIn or Sign Up!');
                                    }
                                }}>
                                    <div class="d-flex flex-row flex-wrap">
                                        <div class="m-2">

                                            <div style={{
                                                width: '200px'
                                            }} class="form-inner d-flex flex-column">
                                                <label for="pickup-location">Pick-up location</label>
                                                {customPickUp ? (
                                                    <input value={bookingData?.pickUpLocation} onChange={(e) => {
                                                        if (loggedIn) {

                                                            updateBookingData(e);
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} type='text' placeholder='Provide Your Location' className="form-control" name='pickUpLocation' required />
                                                ) : (


                                                    <Select value={bookingData?.pickUpLocation} onChange={(value) => {
                                                        // selected is now defined in the scope of this function

                                                        if (loggedIn) {
                                                            if (value != 'Custom Location') {
                                                                dispatch(updateBookingInfo({...bookingData, pickUpLocation : value}))
                                                                
                                                            } else {
                                                                
                                                                setCustomPickUp(true);
                                                            }
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} options={locations} required />
                                                )}
                                            </div>






                                        </div>
                                        <div class="m-2">
                                            <div class="form-inner">
                                                <div class="formbuilder-date form-group field-date-1696006456045">
                                                    <label for="date-1696006456045" class="formbuilder-date-label">Pick-up
                                                        Date</label>
                                                    <input value={bookingData?.pickUpDate} onChange={(e) => {
                                                        if (loggedIn) {

                                                            updateBookingData(e);
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} name='pickUpDate' type="date" class="form-control"
                                                        access="false" id="date-1696006456045" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-2">
                                            <div data-v-1fd3bb87="" class="form-inner">
                                                <div class="">
                                                    <label class="formester-label">
                                                        Pick-up Time</label>

                                                    <input value={bookingData?.pickUpTime} onChange={(e) => {
                                                        if (loggedIn) {

                                                            updateBookingData(e);
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} type="time" class="form-control" name="pickUpTime"
                                                        access="false" id="date-1696006456045" required />
                                                </div>
                                            </div>

                                        </div>
                                        <div class="m-2">
                                            <div style={{
                                                width: '200px'
                                            }} class="form-inner d-flex flex-column">
                                                <label for="pickup-location">Drop-Off location</label>
                                                {customDropOff ? (
                                                    <input value={bookingData?.dropOffLocation} onChange={(e) => {
                                                        if (loggedIn) {

                                                            updateBookingData(e);
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} type='text' placeholder='Provide Your Location' className="form-control" name='dropOffLocation' required />

                                                ) : (

                                                    <Select value={bookingData?.dropOffLocation} onChange={(value) => {
                                                        // selected is now defined in the scope of this function

                                                        if (loggedIn) {
                                                            if (value != 'Custom Location') {
                                                                dispatch(updateBookingInfo({...bookingData, dropOffLocation : value}));
                                                                
                                                            } else {
                                                                
                                                                setCustomDropOff(true);
                                                            }
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} options={locations} required />
                                                )}
                                            </div>
                                        </div>
                                        <div class="m-2">
                                            <div class="form-inner">
                                                <div class="formbuilder-date form-group field-date-1696006456045">
                                                    <label for="date-1696006456045" class="formbuilder-date-label">Drop-off
                                                        date</label>
                                                    <input value={bookingData?.dropOffDate} onChange={(e) => {
                                                        if (loggedIn) {

                                                            updateBookingData(e);
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} type="date" class="form-control" name="dropOffDate"
                                                        access="false" id="date-1696006456045" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-2">
                                            <div data-v-1fd3bb87="" class="form-inner">
                                                <div class="">
                                                    <label class="formester-label">
                                                        Drop-off Time</label>
                                                    <input value={bookingData?.dropOffTime} onChange={(e) => {
                                                        if (loggedIn) {

                                                            updateBookingData(e);
                                                        } else {
                                                            toast.warning('Please LogIn or Sign Up!');
                                                        }
                                                    }} type="time" class="form-control" name="dropOffTime"
                                                        access="false" id="date-1696006456045" required />
                                                </div>
                                            </div>

                                        </div>



                                        <div className='mt-3'>
                                            <div class="form-inner m-2">
                                                <button class="primary-btn3" type="submit">
                                                    <BsSearch className='fs-6' />
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
