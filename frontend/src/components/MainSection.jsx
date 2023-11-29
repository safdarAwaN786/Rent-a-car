import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Select } from 'antd';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearPreSubmission, submitPreBooking, updateBookingInfo } from '../redux/slices/bookingSlices';
import { setNumberOfDays } from '../redux/slices/daysNumberSlice';


export default function MainSection() {

    const [customPickUp, setCustomPickUp] = useState(false);
    const [customDropOff, setCustomDropOff] = useState(false);

    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const bookingSubmitted = useSelector(state => state.booking.isBookingSubmitted);
    const bookingData = useSelector(state => state.booking.bookingData);
    const landingPageContent = useSelector(state => state.webContent?.landingPage);

    const updateBookingData = (e) => {
        dispatch(updateBookingInfo({ ...bookingData, [e.target.name]: e.target.value }));
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
            <div style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.15) 100%), url(${landingPageContent?.backgroundImageUrl})`
            }} class="banner-section2">
                <div class="">
                    <div class=" mx-5">
                        <div class="banner-content">
                            {/* <!-- <h1>Explore Cyprus</h1> --> */}
                            <h1 className='px-2'>{landingPageContent?.mainHeading}</h1>
                            <p className='px-2'>{landingPageContent?.mainText}</p>
                            <div className='bg-white py-3 me-3 w-100 border-circle'>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const { pickUpLocation, dropOffLocation, pickUpDate, dropOffDate, pickUpTime, dropOffTime } = bookingData;
                                        if (!pickUpLocation) {
                                            return toast.warning('Please Provide Pick Up Location!');
                                        } else if (!dropOffLocation) {
                                            return toast.warning('Please Provide Drop Off Location!');
                                        }

                                        const pickupDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
                                        const dropoffDateTime = new Date(`${dropOffDate}T${dropOffTime}`);
                                        const currentDate = new Date();

                                        if (dropoffDateTime <= pickupDateTime) {
                                            return toast.warning('Drop off date should be later than Pick Up Date!');
                                        }

                                        const hoursDifference = (pickupDateTime.getTime() - currentDate.getTime()) / (1000 * 60 * 60);

                                        if (hoursDifference <= 48) {
                                            return toast.warning('Booking cannot be made within 48 hours before pick Up!');
                                        }

                                        const timeDiff = Math.abs(new Date(dropOffDate).getTime() - new Date(pickUpDate).getTime());

                                        // Check if drop-off time is greater than pick-up time + 2 hours
                                        if (dropOffDate !== pickUpDate && dropoffDateTime.getHours() >= (pickupDateTime.getHours() + 2)) {
                                            const numberOfDays = Math.ceil((timeDiff / (1000 * 3600 * 24)) + 1);
                                            dispatch(setNumberOfDays({ number: numberOfDays, priceText: numberOfDays <= 6 ? '1to6daysPrice' : numberOfDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice' }));
                                        } else if (dropOffDate === pickUpDate) {
                                            const numberOfDays = 1;
                                            dispatch(setNumberOfDays({ number: numberOfDays, priceText: numberOfDays <= 6 ? '1to6daysPrice' : numberOfDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice' }));
                                        } else {
                                            const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                            dispatch(setNumberOfDays({ number: numberOfDays, priceText: numberOfDays <= 6 ? '1to6daysPrice' : numberOfDays <= 14 ? '7to14daysPrice' : '15plusDaysPrice' }));
                                        }

                                        dispatch(submitPreBooking());
                                        navigate('/vehicle-guide');
                                    }}
                                >


                                    <div class="d-flex flex-row flex-wrap">
                                        <div class="m-2">

                                            <div style={{
                                                width: '200px'
                                            }} class="form-inner d-flex flex-column">
                                                <label for="pickup-location">Pick-up location</label>
                                                {customPickUp ? (
                                                    <input value={bookingData?.pickUpLocation} onChange={(e) => {
                                                        updateBookingData(e);
                                                    }} type='text' placeholder='Provide Your Location' className="form-control" name='pickUpLocation' required />
                                                ) : (


                                                    <Select value={bookingData?.pickUpLocation} onChange={(value) => {
                                                        if (value != 'Custom Location') {
                                                            if (value === 'Larnaka Airport' || value === 'Pafos Airport') {
                                                                dispatch(updateBookingInfo({ ...bookingData, pickUpLocation: value, airPortFee: 20 }))
                                                            } else {
                                                                dispatch(updateBookingInfo({ ...bookingData, pickUpLocation: value, airPortFee: 0 }))
                                                            }

                                                        } else {

                                                            setCustomPickUp(true);
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
                                                    <input min={new Date().toISOString().split('T')[0]} value={bookingData?.pickUpDate} onChange={(e) => {


                                                        updateBookingData(e);

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


                                                        updateBookingData(e);

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


                                                        updateBookingData(e);

                                                    }} type='text' placeholder='Provide Your Location' className="form-control" name='dropOffLocation' required />

                                                ) : (

                                                    <Select value={bookingData?.dropOffLocation} onChange={(value) => {
                                                        // selected is now defined in the scope of this function


                                                        if (value != 'Custom Location') {
                                                            dispatch(updateBookingInfo({ ...bookingData, dropOffLocation: value }));

                                                        } else {

                                                            setCustomDropOff(true);
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
                                                    <input min={bookingData?.pickUpDate ? (new Date(bookingData?.pickUpDate).toISOString().split('T')[0]) : (new Date().toISOString().split('T')[0])} value={bookingData?.dropOffDate} onChange={(e) => {
                                                        updateBookingData(e);
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
                                                        updateBookingData(e);
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
