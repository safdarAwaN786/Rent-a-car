import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'

import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AdminProductsSection from '../components/AdminProductsSection'
import AdminExtras from '../components/AdminExtras'
import { useDispatch, useSelector } from 'react-redux'
import AdminPricing from '../components/AdminPricing'
import AdminBookings from '../components/AdminBookings'

export default function Admin({ tab }) {
    

    const adminSidebar = useRef(null);
    const loggedIn = useSelector(state => state.auth.loggedIn);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        if(user){
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
            <Navbar  />

            <div className='row my-5 pt-5'>
                <div ref={adminSidebar} className='col-md-3  bg-dark mt-3 p-4 admin-sidebar'>
                    <ul className=' list-unstyled'>
                        <li onClick={()=>{
                            navigate('/admin-vehicles')
                        }} className={` ${tab === 'Vehicles' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Vehicles' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Vehicles
                            </a>
                        </li>
                        <li onClick={()=>{
                            navigate('/admin-extras')
                        }} className={` ${tab === 'Extras' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Extras' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Extras
                            </a>
                        </li>
                        <li onClick={()=>{
                            navigate('/admin-pricing')
                        }} className={` ${tab === 'Pricing' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Pricing' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                VAT & Codes
                            </a>
                        </li>
                        <li onClick={()=>{
                            navigate('/admin-bookings')
                        }} className={` ${tab === 'Bookings' && 'bg-white'} cursor-pointer p-2  m-1 border-circle admin-sidebar-li`}>
                            <a className={` ${tab === 'Bookings' ? 'text-dark' : 'text-white'} text-decoration-none`}>
                                Bookings
                            </a>
                        </li>
                       
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
                    
                </div>

            </div>





           

        </>
    )
}
