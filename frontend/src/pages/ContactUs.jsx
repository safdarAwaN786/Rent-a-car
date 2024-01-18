import React, { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { PiArrowBendUpRightLight, PiPhoneCallLight } from 'react-icons/pi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from 'react-bootstrap/esm/Spinner'
export default function ContactUs({ loggedIn, user, setLoggedIn, setUser }) {

    const contactUsPageContent = useSelector(state => state.webContent?.contactUsPage);
    const [messageData, setMessageData] = useState(null);
    const [sendingMessage, setSendingMessage] = useState(false);
    const updateMessageData = (e)=>{
        setMessageData({...messageData, [e.target.name] : e.target.value})
    }

    return (
        <>
            <Navbar />
            <div class="contact-page pt-100 mb-10 mt-5">
                <div class="container">
                    <div class="row g-4 mb-10">
                        <div class="section-title mb-20">
                            <h4>{contactUsPageContent?.mainHeading}</h4>
                            <p>{contactUsPageContent?.mainText}</p>
                        </div>
                        <div class="row g-4 d-flex  justify-content-between mb-1">
                            <div class="col-lg-4">
                                <div class="single-location">
                                    <div class="title-and-view-btn">
                                        <h5>Our Main Office:</h5>

                                    </div>
                                    <ul>
                                        {contactUsPageContent?.offices?.map((officeObj) => {
                                            return (


                                                <li>
                                                    <div class="icon">
                                                        <PiArrowBendUpRightLight className='fs-5' />
                                                    </div>
                                                    <div class="info">
                                                        <a className='text-decoration-none' href="tel:05661111985">{officeObj.infoText}</a>

                                                    </div>
                                                </li>
                                            )
                                        })}

                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="single-location">
                                    <div class="title-and-view-btn">
                                        <h5>Delivery Locations:</h5>

                                    </div>
                                    <ul>

                                        {contactUsPageContent?.deliveryLocations?.map((locationObj) => {
                                            return (



                                                <li>
                                                    <div class="icon">
                                                        <CiLocationOn className='fs-5' />
                                                    </div>
                                                    <div class="info">
                                                        <a>{locationObj.location}</a>
                                                    </div>

                                                </li>
                                            )
                                        })}





                                    </ul>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div>
                        <h5>
                            Need Assistance? Contact Us with Your Enquiries Using the Form Below.
                        </h5>
                    </div>
                    <div class="col-lg-7">
                        <div class="inquiry-form">

                            <form  onSubmit={(e) => {
                                e.preventDefault();
                                setSendingMessage(true)
                                axios.post('/send-message', messageData).then((res)=>{
                                    setMessageData(null)
                                    setSendingMessage(false)
                                    toast.success('Message sended successfully !')
                                }).catch((err)=>{
                                    setSendingMessage(false)
                                    toast.error('Error in sending Message, Try Again!')
                                })
                            }}>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-inner mb-10">
                                            <label>Full Name*</label>
                                            <input onChange={(e)=>{
                                                updateMessageData(e);
                                            }} type="text" placeholder="Jackson Mile" value={messageData?.fullName} name='fullName' required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-10">
                                            <label>Phone*</label>
                                            <input onChange={(e)=>{
                                                updateMessageData(e);
                                            }} value={messageData?.phone} name='phone' type="number" placeholder="Ex- +880-13* ** ***" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-10">
                                            <label>Email <span>(Optional)</span></label>
                                            <input onChange={(e)=>{
                                                updateMessageData(e);
                                            }} name='email' value={messageData?.email} type="email" placeholder="Ex- info@gmail.com" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner mb-10">
                                            <label>Subject*</label>
                                            <input onChange={(e)=>{
                                                updateMessageData(e);
                                            }} value={messageData?.subject} name='subject' type="text" placeholder="Subject" required />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner mb-10">
                                            <label>Short Notes*</label>
                                            <textarea onChange={(e)=>{
                                                updateMessageData(e);
                                            }} name='shortNotes' value={messageData?.shortNotes} placeholder="Write Something..." required />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="col-md-12">
                                            <div class="form-inner">
                                                <button type="submit" 
                                                class="primary-btn3">
                                                {sendingMessage ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    'Submit Now'
                                                )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div class="contact-page pt-1 mb-100">
                <div class="container">


                    <h5>Feedback & Suggestions:</h5>
                    <p>Your experience matters to us. We welcome your feedback to continually enhance our services and cater to
                        your car hire needs in the best way possible.</p>
                    <p><strong>Thank you for choosing "Your Way Car Hire" - Driving you the Cyprus way, your way.</strong></p>


                </div>
            </div> */}

            <div class="contact-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.604658178413!2d33.325804475512165!3d35.16647917275778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1a0cf18de4d5%3A0x4dca1fa32a0a62a1!2sPindou%202-1010%2C%20Egkomi%202408%2C%20Cyprus!5e0!3m2!1sen!2s!4v1696758222668!5m2!1sen!2s"
                    style={{ border: '0' }} allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <Footer />
        </>
    )
}
