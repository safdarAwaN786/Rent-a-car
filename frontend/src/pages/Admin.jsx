import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import 'animate.css';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AdminProductsSection from '../components/AdminProductsSection'
import AdminExtras from '../components/AdminExtras'
import { useDispatch, useSelector } from 'react-redux'
import AdminPricing from '../components/AdminPricing'
import AdminBookings from '../components/AdminBookings'
import AdminSeasons from '../components/AdminSeasons'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'

import WinterPricing from '../components/WinterPricing'
import SummerPricing from '../components/SummerPricing'
import SummerHighPricing from '../components/SummerHighPricing'
import LandingPageContent from '../components/LandingPageContent';
import ReservationsContent from '../components/ReservationsContent';
import TermsConditionsContent from '../components/TermsConditionsContent';
import PrivacyCookiesContent from '../components/PrivacyCookiesContent';
import ContactUsContent from '../components/ContactUsContent';
import ExtrasPageContent from '../components/ExtrasPageContent';
import PricingSeasons from '../components/PricingSeasons';
import GroupsPrices from '../components/GroupsPrices';

export default function Admin({ tab }) {

    const [openContent, setOpenContent] = useState(false);

    const adminSidebar = useRef(null);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [openPricing, setOpenPricing] = useState(false);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (user) {
            if (user.IsAdmin === false) {
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);





    return (
        <>
            <Navbar />

            <div className='row my-5 pt-5'>
                <div ref={adminSidebar} className='col-md-3  bg-dark  p-4 admin-sidebar'>
                    <ul style={{
                        marginBottom: '120px'
                    }} className=' list-unstyled'>
                        <li onClick={() => {
                            navigate('/admin-vehicles')
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={` ${tab === 'Vehicles' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Vehicles' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Groups
                            </a>
                        </li>
                        <li onClick={() => {
                            navigate('/admin-extras')
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={` ${tab === 'Extras' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Extras' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Extras
                            </a>
                        </li>
                        <li onClick={() => {
                            navigate('/admin-pricing')
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={` ${tab === 'Pricing' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Pricing' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                VAT & Codes
                            </a>
                        </li>
                        <li onClick={() => {
                            navigate('/admin-bookings')
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={` ${tab === 'Bookings' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Bookings' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Bookings
                            </a>
                        </li>
                        <li onClick={() => {
                            navigate('/admin-seasons')
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={` ${tab === 'Seasons' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Seasons' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Seasons
                            </a>
                        </li>
                        <li onClick={() => {
                            navigate('/seasons-pricing');
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={` ${(tab === 'Seasons-Pricing' || tab === 'Groups-Prices') && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${(tab === 'Seasons-Pricing' || tab === 'Groups-Prices') ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Groups Prices
                            </a>
                        </li>




                        <li onClick={() => {
                            setOpenContent(!openContent);
                        }} style={{
                            transition: 'background-color 0.5s ease'
                        }} className={`  cursor-pointer p-2 d-flex justify-content-between  m-1 border-circle admin-sidebar-li`}>
                            <a className={` text-white text-decoration-none`}>
                                Web Content
                            </a>
                            {openContent ? (
                                <IoIosArrowDropup className={`fs-4 dropIcon text-white `} />
                            ) : (
                                <IoIosArrowDropdown className={`fs-4 dropIcon text-white `} />
                            )}
                        </li>
                        {openContent && (
                            <div className='animate__animated animate__bounceInDown  animate__faster animate__bounceInUp border-start border-white border-3 ms-3' >
                                <li onClick={() => {
                                    navigate('/landingPage-content')
                                }} style={{
                                    transition: 'background-color 0.5s ease'
                                }} className={` ${tab === 'landingPage-Content' && 'bg-white'} cursor-pointer px-2 py-1  m-1 border-circle admin-sidebar-li`}>
                                    <a className={` ${tab === 'landingPage-Content' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                        Landing Page
                                    </a>
                                </li>
                                <li onClick={() => {
                                    navigate('/reservations-content')
                                }} style={{
                                    transition: 'background-color 0.5s ease'
                                }} className={` ${tab === 'reservations-Content' && 'bg-white'} cursor-pointer px-2 py-1  m-1 border-circle admin-sidebar-li`}>
                                    <a className={` ${tab === 'reservations-Content' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                        Reservations
                                    </a>
                                </li>
                                <li onClick={() => {
                                    navigate('/terms&conditions-content')
                                }} style={{
                                    transition: 'background-color 0.5s ease'
                                }} className={` ${tab === 'terms&Conditions-Content' && 'bg-white'} cursor-pointer px-2 py-1  m-1 border-circle admin-sidebar-li`}>
                                    <a className={` ${tab === 'terms&Conditions-Content' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                        Terms & Conditions
                                    </a>
                                </li>
                                <li onClick={() => {
                                    navigate('/contactus-content')
                                }} style={{
                                    transition: 'background-color 0.5s ease'
                                }} className={` ${tab === 'contactUs-Content' && 'bg-white'} cursor-pointer px-2 py-1  m-1 border-circle admin-sidebar-li`}>
                                    <a className={` ${tab === 'contactUs-Content' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                        Contact Us
                                    </a>
                                </li>
                                <li onClick={() => {
                                    navigate('/privacy&cookies-content')
                                }} style={{
                                    transition: 'background-color 0.5s ease'
                                }} className={` ${tab === 'privacy&Cookies-Content' && 'bg-white'} cursor-pointer px-2 py-1  m-1 border-circle admin-sidebar-li`}>
                                    <a className={` ${tab === 'privacy&Cookies-Content' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                        Privacy & Cookies Policy
                                    </a>
                                </li>
                                <li onClick={() => {
                                    navigate('/extras-content')
                                }} style={{
                                    transition: 'background-color 0.5s ease'
                                }} className={` ${tab === 'extras-Content' && 'bg-white'} cursor-pointer px-2 py-1  m-1 border-circle admin-sidebar-li`}>
                                    <a className={` ${tab === 'extras-Content' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                        Extras FAQ's
                                    </a>
                                </li>

                            </div>
                        )}

                    </ul>

                </div>
                <div className={`${windowWidth < 1199 ? 'col-12'
                    : 'col-9'
                    } bg-white mt-3 p-2 admin-Box`}>

                    {tab === 'Vehicles' && (
                        <AdminProductsSection />
                    )}

                    {tab === 'Extras' && (
                        <AdminExtras />
                    )}

                    {tab === 'Pricing' && (
                        <AdminPricing />
                    )}
                    {tab === 'Bookings' && (
                        <AdminBookings />
                    )}
                    {tab === 'Seasons' && (
                        <AdminSeasons />
                    )}
                    {tab === 'Seasons-Pricing' && (
                        <PricingSeasons />
                    )}
                    {tab === 'Groups-Prices' && (
                        <GroupsPrices />
                    )}
                    {tab === 'landingPage-Content' && (
                        <LandingPageContent />
                    )}
                    {tab === 'reservations-Content' && (
                        <ReservationsContent />
                    )}
                    {tab === 'terms&Conditions-Content' && (
                        <TermsConditionsContent />
                    )}
                    {tab === 'contactUs-Content' && (
                        <ContactUsContent />
                    )}
                    {tab === 'privacy&Cookies-Content' && (
                        <PrivacyCookiesContent />
                    )}
                    {tab === 'extras-Content' && (
                        <ExtrasPageContent />
                    )}

                </div>

            </div>







        </>
    )
}
