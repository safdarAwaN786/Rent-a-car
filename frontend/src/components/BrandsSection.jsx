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

export default function BrandsSection() {



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

                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" >
                                    <a class="car-category text-center text-decoration-none">
                                        <div class="icon">
                                            <img src={BMWImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>BMW Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="500ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={KiaImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Kia Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="600ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={RenaultImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Renault Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="700ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={HundaiImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Hundai Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="700ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={FordImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Ford Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>


                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="400ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={MercedesImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Mercedes Cars</h6>

                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="500ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={AudiImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Audi Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="600ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={ToyotaImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Toyota Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="700ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={NissanImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Nissan Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6 col-6 wow fadeInUp" data-wow-delay="700ms">
                                    <a class="text-decoration-none car-category text-center">
                                        <div class="icon">
                                            <img src={MazdaImg} alt />
                                        </div>
                                        <div class="content">
                                            <h6>Mazda Cars</h6>
                                            {/* <!-- <span>(5463)</span> --> */}
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
