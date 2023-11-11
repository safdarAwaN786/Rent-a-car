import React from 'react'
import BMWImg from '../assets/img/home2/icon/BMW-removebg-preview.png'
import KiaImg from '../assets/img/home2/icon/kia-removebg-preview.png'
import RenaultImg from '../assets/img/home2/icon/renault-removebg-preview.png'
import HundaiImg from '../assets/img/home2/icon/hundai-removebg-preview.png'
import FordImg from '../assets/img/home2/icon/Ford-removebg-preview.png'
import MercedesImg from '../assets/img/home2/icon/mercedes.svg'
import AudiImg from '../assets/img/home2/icon/audi.svg'
import ToyotaImg from '../assets/img/home2/icon/toyota.svg'
import NissanImg from '../assets/img/home2/icon/nissan.svg'
import MazdaImg from '../assets/img/home2/icon/mazda.svg'
import { useSelector } from 'react-redux'

export default function BrandsSection() {

    const landingPageContent = useSelector(state => state.webContent.landingPage);

    return (
        <>
            <div class="dream-car-area pt-100 pb-100" data-aos="fade-up"  >
                <div class="container" >
                    <div class="row mb-50 wow fadeInUp" >
                        <div class="col-lg-12">
                            <div class="section-title-2 text-center">
                                <h2>Our Trusted Brands</h2>
                                {/* <!-- <p>Tailored Brand Categories at Your Fingertips </p> --> */}
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-make" role="tabpanel" aria-labelledby="pills-make-tab">
                            <div class="row g-4 ">

                                {landingPageContent?.brands?.map((brandObj, index) => {
                                    return (
                                        <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" >
                                            <a class="car-category text-center text-decoration-none">
                                                <div class="icon">
                                                    <img src={brandObj.logoUrl} alt />
                                                </div>
                                                <div class="content">
                                                    <h6>{brandObj.brandName}</h6>
                                                    
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })}


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
