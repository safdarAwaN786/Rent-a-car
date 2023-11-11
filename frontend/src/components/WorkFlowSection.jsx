import React from 'react'
import locationImg from '../assets/img/home2/icon/location.svg'
import selectCarImg from '../assets/img/home2/icon/recieve.svg'
import extrasImg from '../assets/img/home2/icon/body-01.svg'
import payImg from '../assets/img/home2/icon/pay.svg'
import { useSelector } from 'react-redux'

export default function WorkFlowSection() {

    const landingPageContent = useSelector(state => state.webContent?.landingPage)
    return (
        <>
            <div class="how-it-work-section style-3 mb-0" data-aos="fade-up">
                <div class="container">
                    <div class="row mb-50 wow fadeInUp animated"
                        style={{ visibility: 'visible', animationDelay: '200ms', }}>
                        <div class="col-lg-12 d-flex align-items-end justify-content-between gap-3 flex-wrap">
                            <div class="section-title-2">
                                <h2>How Does It Work</h2>
                                {/* <p>Confirm your choices online and simply pay on arrival at our office. Get ready to explore Cyprus, Your Way!</p> */}
                            </div>

                        </div>
                    </div>
                    <div class=" wow fadeInUp" style={{ visibility: 'visible', animationDelay: '200ms', }}>
                        <div>
                            <div class="work-process-group">
                                <div class="row  g-xl-0 gy-5">

                                    {landingPageContent?.workFlow?.map((workObj, index) => {
                                        return (
                                           <div class="col-lg-3 col-sm-6 col-12">
                                                <div class="single-work-process text-center">
                                                    <div class="steps mb-1">
                                                        <span>0{index + 1}</span>
                                                    </div>
                                                    <div class="icon">
                                                        <img src={workObj.iconUrl} alt />
                                                    </div>
                                                    <div class="content">
                                                        <h6>{workObj.heading}</h6>
                                                        <p>{workObj.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {/* <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps mb-1">
                                                <span>02</span>
                                            </div>
                                            <div class="icon">
                                                <img src={selectCarImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Select your car</h6>
                                                <p>Explore and choose from our diverse fleet of vehicles, picking the perfect companion that aligns with your travel needs and preferences.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps mb-1">
                                                <span>03</span>
                                            </div>
                                            <div class="icon">
                                                <img src={extrasImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Add Optional Extras</h6>
                                                <p>Customise your rental with options like child seats, booster seats, additional insurance, etc., ensuring a tailored travel experience.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 col-12">
                                        <div class="single-work-process text-center">
                                            <div class="steps mb-1">
                                                <span>04</span>
                                            </div>
                                            <div class="icon">
                                                <img src={payImg} alt />
                                            </div>
                                            <div class="content">
                                                <h6>Secure Your Booking</h6>
                                                <p>Confirm your choices online and simply pay on arrival at our office. Get ready to explore Cyprus, Your Way!</p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
