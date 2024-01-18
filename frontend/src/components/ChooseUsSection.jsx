import React from 'react'
import ratesImg from '../assets/img/home1/icon/affordable.svg'
import carImg from '../assets/img/home1/icon/av-car.svg'
import warrantyImg from '../assets/img/home1/icon/warranty.svg'
import assistanceImg from '../assets/img/home1/icon/hotline-icon.svg'
import mileageImg from '../assets/img/home1/icon/guarantee.svg'
import driverImg from '../assets/img/home1/icon/happy-customar.svg'
import { useSelector } from 'react-redux'



export default function ChooseUsSection() {

    const landingPageContent = useSelector(state => state.webContent?.landingPage);

    return (
        <>
            <div class="why-choose-area pt-10 pb-90 mb-10" data-aos="fade-up">
                <div class="container">
                    <div class="row mb-60 wow fadeInUp" >
                        <div class="col-lg-12 d-flex justify-content-center">
                            <div class="section-title1 text-center">
                                {/* <!-- <span>Best Car Agency</span> --> */}
                                <h2>Why Choose Us?</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-50 g-4 ">
                        {/* <div class="col-lg-4 col-sm-6 col-12 wow fadeInUp" >
                            <div class="choose-card">
                                <div class="choose-top">
                                    <div class="choose-icon">
                                        <img src={ratesImg} alt />
                                    </div>
                                    <h5><span>Competitive </span> Rates</h5>
                                </div>
                                <p>Get the best value for your money.</p>
                            </div>
                        </div> */}
                        {landingPageContent?.chooseUs?.map((chooseObj, index) => {
                            return (
                                <div class="col-lg-4 col-sm-6 col-12 wow fadeInUp" data-wow-delay="300ms">
                                    <div class="choose-card">
                                        <div class="choose-top">
                                            <div class="choose-icon">
                                                <img src={chooseObj.iconUrl} alt />
                                            </div>
                                            <h5>{chooseObj.heading}</h5>
                                        </div>
                                        <p>{chooseObj.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                        {/* <div class="col-lg-4 col-sm-6 col-12 wow fadeInUp" data-wow-delay="400ms">
                            <div class="choose-card">
                                <div class="choose-top">
                                    <div class="choose-icon">
                                        <img src={warrantyImg} alt />
                                    </div>
                                    <h5><span>Full </span> Insurance</h5>
                                </div>
                                <p>Enjoy no excess on rentals of 7 days or more.</p>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-6 col-12 wow fadeInUp" data-wow-delay="200ms">
                            <div class="choose-card">
                                <div class="choose-top">
                                    <div class="choose-icon">
                                        <img src={assistanceImg} alt />
                                    </div>
                                    <h5><span>24/7 </span> Road Assistance</h5>
                                </div>
                                <p>We're here for you, round the clock.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-12 wow fadeInUp" data-wow-delay="300ms">
                            <div class="choose-card">
                                <div class="choose-top">
                                    <div class="choose-icon">
                                        <img src={mileageImg} alt />
                                    </div>
                                    <h5><span>Unlimited </span> Mileage</h5>
                                </div>
                                <p>Roam freely without worries. Absolutely free.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-12 wow fadeInUp" data-wow-delay="400ms">
                            <div class="choose-card">
                                <div class="choose-top">
                                    <div class="choose-icon">
                                        <img src={driverImg} alt />
                                    </div>
                                    <h5><span>Additional </span> Driver</h5>
                                </div>
                                <p>Share the wheel, at no extra cost.</p>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>

        </>
    )
}
