import React from 'react'
import saloonVehicleImg from '../assets/img/home1/01.png'
import cabriosImg from '../assets/img/home1/02.png'
import peopleCarriersImg from '../assets/img/home1/03.png'
import SUVWDImg from '../assets/img/home1/04.png'
import { useSelector } from 'react-redux'

export default function FleetSection() {

    const landingPageContent = useSelector(state => state.webContent.landingPage);

    return (
        <>
            <div class="news-section five mb-100" data-aos="fade-up">
                <div class="container">
                    <div class="row mb-60 wow fadeInUp" >
                        <div class="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
                            <div class="section-title-2">
                                <h2>Our Fleet</h2>
                                {/* <p>Explore in Comfort with Our Diverse Vehicle Range!</p> */}
                            </div>
                        </div>
                    </div>
                    <div class="row g-4 ">

                        {landingPageContent?.ourFleet?.map((fleetObj, index) => {
                            return (
                                <div class="col-lg-3 col-sm-6 col-12 wow fadeInUp" >
                                    <div class="news-card style-2">
                                        <div class="news-img">
                                            <a><img src={fleetObj.imageUrl} alt /></a>
                                            <div class="date">
                                                <a>{fleetObj.title}</a>
                                            </div>
                                        </div>
                                        <div class="content">
                                            <h6><a>{fleetObj.text}</a>
                                            </h6>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}



                    </div>
                </div>
            </div>
        </>
    )
}
