import React from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import logo from '../assets/img/bottom_logo.png'
import { useNavigate } from 'react-router-dom'
export default function Footer() {
    const navigate = useNavigate()
    return (
        <>

            <footer class="style-2">
                <div class="container-fluid">
                    <div class="footer-top">
                        <div
                            class="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-1 justify-content-center g-lg-4 gy-5 ">
                            <div class="col d-flex justify-content-lg-start">
                                <div class="footer-widget">
                                    <div class="widget-title">
                                        <h5>Our Goal</h5>
                                    </div>
                                    <div class="menu-container">
                                        <ul>
                                            <li><a className='text-decoration-none cursor-pointer' onClick={()=>{
                                                navigate('/')
                                            }}>To provide top-notch car rental services tailored to your
                                                needs.
                                                <BsArrowUpRight className='fs-2' />
                                            </a></li>


                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-sm-center">
                                <div class="footer-widget">
                                    <div class="widget-title">
                                        <h5>Search & Explore</h5>
                                    </div>
                                    <div class="menu-container">
                                        <ul>
                                            <li><a className='text-decoration-none cursor-pointer' onClick={()=>{
                                                navigate('/reservations')
                                            }}>Reservations
                                                <BsArrowUpRight className='fs-6 ' />
                                            </a></li>
                                            <li><a className='text-decoration-none cursor-pointer' onClick={()=>{
                                                navigate('/vehicle-guide')
                                            }}>Vehicle Guide
                                                <BsArrowUpRight className='fs-6 ' />
                                            </a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-lg-center justify-content-sm-end">
                                <div class="footer-widget">
                                    <div class="widget-title">
                                        <h5>Info</h5>
                                    </div>
                                    <div class="menu-container">
                                        <ul>
                                            {/* <li><a className='text-decoration-none curso' href="single-brand-category.html">Price
                                                <BsArrowUpRight className='fs-6 ' />
                                            </a></li> */}
                                            <li><a className='text-decoration-none cursor-pointer' onClick={()=>{
                                                navigate('/contact')
                                            }}>About Us
                                                <BsArrowUpRight className='fs-6 ' />
                                            </a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-xl-center justify-content-lg-end justify-content-sm-center">
                                <div class="footer-widget">
                                    <div class="widget-title">
                                        <h5>External Links</h5>
                                    </div>
                                    <div class="menu-container">
                                        <ul>
                                            <li><a className='text-decoration-none cursor-pointer' onClick={()=>{
                                                navigate('/privacy-and-cookies')
                                            }}>Privacy & Cookie Policy
                                                <BsArrowUpRight className='fs-6 ' />
                                            </a></li>
                                            <li><a className='text-decoration-none cursor-pointer' onClick={()=>{
                                                navigate('/terms-and-conditions')
                                            }}>Terms & Conditions
                                                <BsArrowUpRight className='fs-6 ' />
                                            </a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="footer-center">
                        <div class="footer-logo">
                            <a className='text-decoration-none' href="index.html"><img src={logo} alt /></a>
                        </div>
                        <div class="contact-area">
                            <div class="hotline-area">
                                
                                <div class="content">
                                    <span>To More Inquiry</span>
                                    <h6><a className='text-decoration-none' href="tel:+990737621432">+357-22459945</a></h6>
                                </div>
                            </div>
                            <div class="hotline-area">

                                <div class="content">
                                    <span>To Send Mail</span>
                                    <h6><a className='text-decoration-none' href="mailto:info@yourway-carhire.com"><span class="__cf_email__"
                                        data-cfemail="a8c1c6cec7e8cfc5c9c1c486cbc7c5">info@yourway-carhire.com</span></a>
                                    </h6>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </footer>
        </>
    )
}
