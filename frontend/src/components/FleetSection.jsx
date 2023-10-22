import React from 'react'
import saloonVehicleImg from '../assets/img/home1/01.png'
import cabriosImg from '../assets/img/home1/02.png'
import peopleCarriersImg from '../assets/img/home1/03.png'
import SUVWDImg from '../assets/img/home1/04.png'

export default function FleetSection() {


    return (
        <>
            <div class="news-section five mb-100" data-aos="fade-up">
                <div class="container">
                    <div class="row mb-60 wow fadeInUp" >
                        <div class="col-lg-12 d-flex align-items-end justify-content-between flex-wrap gap-4">
                            <div class="section-title-2">
                                <h2>Our Fleet</h2>
                                <p>Explore in Comfort with Our Diverse Vehicle Range!</p>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4 ">
                        <div class="col-lg-3 col-sm-6 col-12 wow fadeInUp" data-wow-delay="200ms">
                            <div class="news-card style-2">
                                <div class="news-img">
                                    <a><img src={saloonVehicleImg} alt /></a>
                                    <div class="date">
                                        <a>Saloon Vehicles </a>
                                    </div>
                                </div>
                                <div class="content">
                                    <h6><a>Sleek and formal, known for comfort and spacious trunks</a>
                                    </h6>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12 wow fadeInUp" data-wow-delay="300ms">
                            <div class="news-card style-2">
                                <div class="news-img">
                                    <a><img src={cabriosImg} alt /></a>
                                    <div class="date">
                                        <a>Cabrios </a>
                                    </div>
                                </div>
                                <div class="content">
                                    <h6><a>Exhilarating open-air driving with retractable roofs</a>
                                    </h6>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12 wow fadeInUp" data-wow-delay="400ms">
                            <div class="news-card style-2">
                                <div class="news-img">
                                    <a><img src={peopleCarriersImg} alt /></a>
                                    <div class="date">
                                        <a>People Carriers</a>
                                    </div>
                                </div>
                                <div class="content">
                                    <h6><a>Spacious and versatile, perfect for larger groups</a>
                                    </h6>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12 wow fadeInUp" data-wow-delay="400ms">
                            <div class="news-card style-2">
                                <div class="news-img">
                                    <a><img src={SUVWDImg} alt /></a>
                                    <div class="date">
                                        <a>SUV/4WD</a>
                                    </div>
                                </div>
                                <div class="content">
                                    <h6><a>Rugged and off-road capable, with ample interior space</a>
                                    </h6>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
