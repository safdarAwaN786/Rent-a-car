import React from 'react'
import banner from '../assets/img/home5/home5-banner-img-01.png'

export default function ReservationsBanner() {

    return (
        <>
            <div class="home5-banner-area ">

                <div class="swiper home3-banner-slider">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="banner-bg"
                                style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${banner})` }}>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="banner-content">
                                <h1>Start Your Adventure Here</h1>
                                <p>Your Way, Your Destination</p>
                                <div class="home6-search-area mb-100">
                                    <div class="container">

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
