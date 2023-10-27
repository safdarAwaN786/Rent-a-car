import React, { useEffect, useState} from 'react'
import { BsSearch } from 'react-icons/bs'
import Select from 'react-select';
import { useNavigate } from "react-router-dom"


export default function MainSection() {

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            maxHeight: '200px', // Set the maximum height of the menu
            overflowY: 'scroll', // Set overflow to auto to enable scrolling
        }),
        option: (provided) => ({
            ...provided,
            minHeight: '40px', // Set the minimum height of each option
            display: 'flex',
            alignItems: 'center',
        }),
    };

    const navigate = useNavigate()
    const pickUpLocations = [
        { value: 'Larnaka Airport', label: <div>Larnaka Airport</div> },
        { value: 'Pafos Airport', label: <div>Pafos Airport</div> },
        { value: 'Pafos Office', label: <div>Pafos Office</div> },
        { value: 'Limassol Office', label: <div>Limassol Office</div> },
        { value: 'Ayia Napa Office', label: <div>Ayia Napa Office</div> },
        { value: 'Nicosia Office', label: <div>Nicosia Office</div> },
    ]
    return (
        <>
            <div class="banner-section2">
                <div class="">
                    <div class="">
                        <div class="banner-content">
                            {/* <!-- <h1>Explore Cyprus</h1> --> */}
                            <h1 className='px-2'>Start Your Journey 'Your Way'!</h1>
                            <p className='px-2'>Drive into Unforgettable Experiences with 'Your Way' Car Hire - Your Companion for Reliable and
                                Exciting Journeys Across the Island</p>
                            <div className='bg-white py-3'>
                                <form onSubmit={(e)=>{
                                    e.preventDefault();
                                    navigate('/vehicle-guide')
                                }}>
                                    <div class="d-flex flex-row flex-wrap">
                                        <div class="m-2">

                                            <div style={{
                                                width: '200px'
                                            }} class="form-inner">
                                                <label for="pickup-location">Pick-up location</label>
                                                <Select styles={customStyles} options={pickUpLocations} required/>
                                            </div>






                                        </div>
                                        <div class="m-2">
                                            <div class="form-inner">
                                                <div class="formbuilder-date form-group field-date-1696006456045">
                                                    <label for="date-1696006456045" class="formbuilder-date-label">Pick-up
                                                        Date</label>
                                                    <input type="date" class="form-control" name="date-1696006456045"
                                                        access="false" id="date-1696006456045" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-2">
                                            <div data-v-1fd3bb87="" class="form-inner">
                                                <div class="">
                                                    <label class="formester-label">
                                                        Pick-up Time</label>

                                                    <input type="time" class="form-control" name="date-1696006456045"
                                                        access="false" id="date-1696006456045" required/>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="m-2">
                                            <div style={{
                                                width: '200px'
                                            }} class="form-inner">
                                                <label for="pickup-location">Drop-Off location</label>
                                                <Select styles={customStyles} options={pickUpLocations} required/>
                                            </div>
                                        </div>
                                        <div class="m-2">
                                            <div class="form-inner">
                                                <div class="formbuilder-date form-group field-date-1696006456045">
                                                    <label for="date-1696006456045" class="formbuilder-date-label">Drop-off
                                                        date</label>
                                                    <input type="date" class="form-control" name="date-1696006456045"
                                                        access="false" id="date-1696006456045" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-2">
                                            <div data-v-1fd3bb87="" class="form-inner">
                                                <div class="">
                                                    <label class="formester-label">
                                                        Drop-off Time</label>
                                                    <input type="time" class="form-control" name="date-1696006456045"
                                                        access="false" id="date-1696006456045" required/>
                                                </div>
                                            </div>

                                        </div>



                                        <div className='mt-3'>
                                            <div class="form-inner m-2">
                                                <button class="primary-btn3" type="submit">
                                                    <BsSearch className='fs-6' />
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
