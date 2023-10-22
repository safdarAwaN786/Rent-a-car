import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { PiPhoneCallLight } from 'react-icons/pi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function ContactUs({loggedIn, user, setLoggedIn, setUser }) {



    return (
        <>
            <Navbar loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser}  />
            <div class="contact-page pt-100 mb-10 mt-5">
                <div class="container">


                    <div class="row g-4 mb-10">
                        <div class="section-title mb-20">
                            <h4>Contact Us at "Your Way” Car Hire</h4>
                            <p>
                                Whether you're eager to explore the heart of Cyprus with our impeccable car rentals or need
                                assistance with your booking, our dedicated team is here to guide you every step of the way.
                                Reach out to us for any inquiries, feedback, or reservations, ensuring your car hire experience
                                is smooth and memorable.

                            </p>
                        </div>
                        <div class="row g-4 justify-content-center mb-1">
                            <div class="col-lg-4">
                                <div class="single-location">
                                    <div class="title-and-view-btn">
                                        <h5>Our Main Office:</h5>

                                    </div>
                                    <ul>
                                        <li>
                                            <div class="icon">
                                                <PiPhoneCallLight className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a className='text-decoration-none' href="tel:05661111985">+357-22459945</a>

                                            </div>
                                        </li>
                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>2 Pindou Street,
                                                    1010, Nicosia,
                                                    Cyprus.</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="single-location">
                                    <div class="title-and-view-btn">
                                        <h5>Delivery Locations:</h5>

                                    </div>
                                    <ul>

                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>Larnaka Airport</a>
                                            </div>

                                        </li>

                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>Paphos Airport</a>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>Nicosia</a>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>Limassol</a>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>Ayia Napa</a>
                                            </div>

                                        </li>
                                        <li>
                                            <div class="icon">
                                                <CiLocationOn className='fs-5' />
                                            </div>
                                            <div class="info">
                                                <a>Paphos Area</a>
                                            </div>

                                        </li>

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

                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-inner mb-10">
                                            <label>Full Name*</label>
                                            <input type="text" placeholder="Jackson Mile" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-10">
                                            <label>Phone*</label>
                                            <input type="text" placeholder="Ex- +880-13* ** ***" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-inner mb-10">
                                            <label>Email <span>(Optional)</span></label>
                                            <input type="email" placeholder="Ex- info@gmail.com" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner mb-10">
                                            <label>Subject*</label>
                                            <input type="email" placeholder="Subject" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-inner mb-10">
                                            <label>Short Notes*</label>
                                            <textarea placeholder="Write Something..."></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="col-md-12">
                                            <div class="form-inner">
                                                <button type="submit" class="primary-btn3">Submit Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-page pt-1 mb-100">
                <div class="container">

                    <p>We take pride in offering competitive rates, full insurance options, quality vehicles, and 24/7 road
                        assistance, ensuring that your journey through Cyprus is memorable.
                    </p>
                    <h5>Feedback & Suggestions:</h5>
                    <p>Your experience matters to us. We welcome your feedback to continually enhance our services and cater to
                        your car hire needs in the best way possible.</p>
                    <p><strong>Thank you for choosing "Your Way Car Hire" - Driving you the Cyprus way, your way.</strong></p>


                </div>
            </div>

            <div class="contact-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.604658178413!2d33.325804475512165!3d35.16647917275778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1a0cf18de4d5%3A0x4dca1fa32a0a62a1!2sPindou%202-1010%2C%20Egkomi%202408%2C%20Cyprus!5e0!3m2!1sen!2s!4v1696758222668!5m2!1sen!2s"
                    style={{border:'0'}} allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <Footer />
        </>
    )
}
