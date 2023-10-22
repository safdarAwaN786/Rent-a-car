import React from 'react'
import {BsSearch} from 'react-icons/bs'
import Select from 'react-select';

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

    const pickUpLocations = [
        { value : 'Larnaka Airport', label : <div>Larnaka Airport</div>   },
        { value : 'Pafos Airport', label : <div>Pafos Airport</div>   },
        { value : 'Pafos Office', label : <div>Pafos Office</div>   },
        { value : 'Limassol Office', label : <div>Limassol Office</div>   },
        { value : 'Ayia Napa Office', label : <div>Ayia Napa Office</div>   },
        { value : 'Nicosia Office', label : <div>Nicosia Office</div>   },
    ]
  return (
    <>
        <div class="banner-section2">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="banner-content">
                            {/* <!-- <h1>Explore Cyprus</h1> --> */}
                            <h1>Start Your Journey 'Your Way'!</h1>
                            <p>Drive into Unforgettable Experiences with 'Your Way' Car Hire - Your Companion for Reliable and
                                Exciting Journeys Across the Island</p>
                            <div class="justify-content-center">
                                <form>
                                    <div class="justify-content-center">
                                        <div class="col">

                                            <div style={{
                                                width : '200px'
                                            }} class="form-inner">
                                                <label for="pickup-location">Pick-up location</label>
                                                <Select  styles={customStyles} options={pickUpLocations} />
                                            </div>






                                        </div>
                                        <div class="col">
                                            <div class="form-inner">
                                                <div class="formbuilder-date form-group field-date-1696006456045">
                                                    <label for="date-1696006456045" class="formbuilder-date-label">Pick-up
                                                        Date</label>
                                                    <input type="date" class="form-control" name="date-1696006456045"
                                                        access="false" id="date-1696006456045" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div data-v-1fd3bb87="" class="form-inner">
                                                <div class="">
                                                    <label class="formester-label">
                                                        Pick-up Time</label>
                                                    <p
                                                        style={{ color: 'rgba(61, 61, 61, 0.7)', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'normal', fontWeight: '400', lineHeight: '10%', margin: '0px' }}>
                                                    </p>
                                                    <div class="bordered-div">
                                                        <input id="Time88157478-3b95-4ec5-bb50-46bb38c05693" type="time"
                                                            class="formester-input formester-input__shorttext" min="" max=""
                                                            placeholder="Enter a time" name="Time"
                                                            style={{ backgroundColor: 'rgb(255, 255, 255)', step: '300' }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col">
                                            <div style={{
                                                width : '200px'
                                            }} class="form-inner">
                                                <label for="pickup-location">Drop-Off location</label>
                                                <Select  styles={customStyles} options={pickUpLocations} />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-inner">
                                                <div class="formbuilder-date form-group field-date-1696006456045">
                                                    <label for="date-1696006456045" class="formbuilder-date-label">Drop-off
                                                        date</label>
                                                    <input type="date" class="form-control" name="date-1696006456045"
                                                        access="false" id="date-1696006456045" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div data-v-1fd3bb87="" class="form-inner">
                                                <div class="">
                                                    <label class="formester-label">
                                                        Drop-off Time</label>
                                                    <p
                                                        style={{ color: 'rgba(61, 61, 61, 0.7)', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'normal', fontWeight: '400', lineHeight: '10%', margin: '0px' }}>
                                                    </p>
                                                    <div class="bordered-div">
                                                        <input id="Time88157478-3b95-4ec5-bb50-46bb38c05693" type="time"
                                                            class="formester-input formester-input__shorttext" min="" max=""
                                                            placeholder="Enter a time" name="Time"
                                                            style={{ backgroundColor: 'rgb(255, 255, 255)', step: '300' }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>



                                        <div class="col d-flex align-items-end">
                                            <div class="form-inner">
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
