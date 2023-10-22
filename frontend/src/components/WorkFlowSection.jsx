import React from 'react'
import locationImg from '../assets/img/home2/icon/location.svg'
import selectCarImg from '../assets/img/home2/icon/recieve.svg'
import extrasImg from '../assets/img/home2/icon/body-01.svg'
import payImg from '../assets/img/home2/icon/pay.svg'

export default function WorkFlowSection() {
    return (
        <>
            <div class="how-it-work-section style-3 mb-0" data-aos="fade-up">
                <div class="container">
                    <div class="row mb-50 wow fadeInUp animated" 
                        style={{ visibility: 'visible', animationDelay: '200ms', }}>
                        <div class="col-lg-12 d-flex align-items-end justify-content-between gap-3 flex-wrap">
                            <div class="section-title-2">
                                <h2>How Does It Work</h2>
                                <p>Embark on a seamless car rental experience with Your Way! Just select your location, pick a
                                    car, customize with extras, and secure your booking upon arrival.</p>
                            </div>

                        </div>
                    </div>
                    <div class=" wow fadeInUp"  style={{ visibility: 'visible', animationDelay: '200ms', }}>
                        <div>
                            <div class="work-process-group">
                                <div class="row  g-xl-0 gy-5">
                                    <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps">
                                                <span>01</span>
                                            </div>
                                            <div class="icon">
                                                <img src={locationImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Choose your location</h6>
                                                <p>Kickstart your journey by selecting your pick-up location from our widespread
                                                    network across Cyprus.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps">
                                                <span>02</span>
                                            </div>
                                            <div class="icon">
                                                <img src={selectCarImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Select your car</h6>
                                                <p>Explore and choose from our diverse fleet of vehicles, picking the perfect
                                                    companion that aligns with your travel needs and preferences.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps">
                                                <span>03</span>
                                            </div>
                                            <div class="icon">
                                                <img src={extrasImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Add Optional Extras</h6>
                                                <p>Customise your rental with options like child seats, booster seats,
                                                    additional insurance, etc., ensuring a tailored travel experience.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps d-lg-none d-block">
                                                <span>04</span>
                                            </div>
                                            <div class="icon">
                                                <img src={payImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Secure Your Booking</h6>
                                                <p>Confirm your choices online and simply pay on arrival at our office. Get
                                                    ready to explore Cyprus, Your Way!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
