import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ConfirmBookingNotify() {

    const { bookingId } = useParams();
    console.log(bookingId);
    const [confirming, setConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);



    return (
        <div className='d-flex justify-content-center flex-column m-3'>
            {confirmed ? (

                <h2>Congratulations, Your Booking has been confirmed, 👏😇!</h2>

            ) : (
                <>

                    <h2>Are you Sure, You want to Confirm this Booking ?</h2>
                    <button onClick={() => {
                        setConfirming(true)
                        axios.post(`/booking/confirm-booking/${bookingId}`).then(() => {
                            setConfirmed(true);
                            toast.success('Booking Confirmed!');
                            setConfirming(false)
                        }).catch((err) => {
                            toast.error('Error in Booking Confirmation, Try Again');
                            setConfirming(false);
                        })
                    }} className='btn btn-lg btn-success'>{confirming ? (
                        <Spinner />
                    ) : (
                        'Yes, Confirm'
                    )}</button>
                </>
            )}
        </div>
    )
}
