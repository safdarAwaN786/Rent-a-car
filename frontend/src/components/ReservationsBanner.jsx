import React from 'react'
import banner from '../assets/img/home5/home5-banner-img-01.png'
import { useSelector } from 'react-redux'

export default function ReservationsBanner() {

    const reservationsPageContent = useSelector(state => state.webContent?.reservationsPage);

    return (
        <>
            <div class="home5-banner-area ">

                <div class="swiper home3-banner-slider">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="banner-bg"
                                style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${reservationsPageContent?.backgroundImageUrl})` }}>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="banner-content">
                                <h1>{reservationsPageContent?.mainHeading}</h1>
                                <p>{reservationsPageContent?.mainText}</p>
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
