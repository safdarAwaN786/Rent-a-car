import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PiPhoneCallLight } from 'react-icons/pi'
import { CiLocationOn } from 'react-icons/ci'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Admin({ user, loggedIn, setLoggedIn, setUser }) {
    const [vatObj, setVatObj] = useState(null);

    const reGetVat = () => {
        {
            axios.get('admin/get-vat').then((res) => {

                setVatObj(res.data[0])
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    useEffect(() => {
        axios.get('admin/get-vat').then((res) => {

            setVatObj(res.data[0])
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    const [vatValue, setVatValue] = useState(null);
    return (
        <>
            <Navbar loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser}  />
            <div class="contact-page pt-100 mb-10 mt-5">
                <div class="container">


                    <div class="row g-4 mb-10">
                        <div class="section-title mb-20">
                            <h4>Admin Features</h4>

                        </div>
                    </div>
                    <div class="row g-4 justify-content-center mb-1">
                        <div class="col-lg-4">
                            <div class="single-location">
                                <div class="title-and-view-btn">
                                    <h5>VAT (Value Added as Tax) :</h5>

                                </div>
                                <ul>
                                    <li>


                                        <div class="info">
                                            <a className='text-decoration-none' >Cuurent value : {vatObj?.value}%</a>

                                        </div>
                                    </li>
                                    <li>

                                        <div class="info">
                                            <input onChange={(e) => {
                                                setVatValue(e.target.value);
                                            }} style={{
                                                borderRadius: '10px'
                                            }} type='number' className='p-2 bg-light  border border-secondary' placeholder='%' />
                                        </div>
                                    </li>
                                    <li>

                                        <div class="info">
                                            <button onClick={() => {
                                                if (vatValue) {
                                                    axios.post('/admin/add-vat', { id: vatObj._id, value: vatValue }).then((res) => {
                                                        toast.success('VAT updated Successfully !');
                                                        reGetVat();
                                                    }).catch((e) => {
                                                        toast.error("Please try Again !")
                                                    })
                                                } else {
                                                    toast.warning('Please provide VAT value !')
                                                }
                                            }} className='primary-btn6'>
                                                UPDATE
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
