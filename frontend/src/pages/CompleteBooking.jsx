import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import SCDW from '../assets/img/inner-page/icon/collision.png';
import Tyre from '../assets/img/inner-page/icon/tyre1.png';
import GPS from '../assets/img/inner-page/icon/gps.png';
import babySeat from '../assets/img/inner-page/icon/baby.png';
import boosterSeat from '../assets/img/inner-page/icon/seat.png';
import rack from '../assets/img/inner-page/icon/rack.png';
import skiRack from '../assets/img/inner-page/icon/ski.png';
import axios from 'axios';

export default function CompleteBooking({ selectedVehicle }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!selectedVehicle) {
            navigate('/vehicle-guide')
        }
    })
    const [extrasArr, setExtrasArr] = useState(null);

    useEffect(() => {
        axios.get(`/extras/read-extras-by-group/${selectedVehicle?.group}`).then((res) => {
            console.log(res.data)
            setExtrasArr(res.data.data.extrasAdded);
        })
    }, [])
    return (
        <>
            <Navbar />

            <div class="inner-page-banner1 mt-5 pt-4">
                <div class="banner-wrapper">
                    <div class="container-fluid">

                        <div class="banner-main-content-wrap">
                            <div class="row">
                                <div class="col-xl-6 col-lg-7 d-flex align-items-center">
                                    <div class="banner-content style-2">
                                        <div class="price-model-and-fav-area">
                                            <div class="price-and-model">
                                                <div class="price">
                                                    <h3>${selectedVehicle?.price}/day</h3>
                                                </div>

                                            </div>

                                        </div>
                                        <h1>{selectedVehicle?.name}</h1>
                                        <div class="location-and-notification">
                                            <ul>
                                                <li><i ></i>Engine Size: {selectedVehicle?.engineSize}</li>
                                                <li><i ></i>Adults: {selectedVehicle?.adults}</li>
                                                <li><i ></i>Doors: {selectedVehicle?.doors}</li>

                                            </ul>
                                            <ul>
                                                <li><i ></i>Children: {selectedVehicle?.children}</li>
                                                <li><i ></i>Seats: {selectedVehicle?.seats}</li>
                                                <li><i ></i>Big Luggage: {selectedVehicle?.bigLuggage}</li>

                                            </ul>
                                            <ul>
                                                <li><i ></i>Small Luggage: {selectedVehicle?.smallLuggage}</li>
                                                <li><i ></i>Transmission: {selectedVehicle?.transmissionType}</li>
                                                {selectedVehicle?.AC && (

                                                    <li><i ></i>AC</li>
                                                )}

                                            </ul>


                                        </div>
                                        <div class="col d-flex align-items-end">
                                            <div class="form-inner">
                                                <button onClick={() => {
                                                    navigate('/vehicle-guide')
                                                }} class="primary-btn3" type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                                        <path
                                                            d="M10.2746 9.04904C11.1219 7.89293 11.5013 6.45956 11.3371 5.0357C11.1729 3.61183 10.4771 2.30246 9.38898 1.36957C8.30083 0.436668 6.90056 -0.050966 5.46831 0.00422091C4.03607 0.0594078 2.67747 0.653346 1.66433 1.66721C0.651194 2.68107 0.0582276 4.04009 0.00406556 5.47238C-0.0500965 6.90466 0.43854 8.30458 1.37222 9.39207C2.30589 10.4795 3.61575 11.1744 5.03974 11.3376C6.46372 11.5008 7.89682 11.1203 9.05232 10.2722H9.05145C9.07769 10.3072 9.10569 10.3405 9.13719 10.3729L12.5058 13.7415C12.6699 13.9057 12.8924 13.9979 13.1245 13.998C13.3566 13.9981 13.5793 13.906 13.7435 13.7419C13.9076 13.5779 13.9999 13.3553 14 13.1232C14.0001 12.8911 13.908 12.6685 13.7439 12.5043L10.3753 9.13566C10.344 9.104 10.3104 9.07562 10.2746 9.04904ZM10.5004 5.68567C10.5004 6.31763 10.3759 6.9434 10.1341 7.52726C9.89223 8.11112 9.53776 8.64162 9.0909 9.08849C8.64403 9.53535 8.11352 9.88983 7.52967 10.1317C6.94581 10.3735 6.32003 10.498 5.68807 10.498C5.05611 10.498 4.43034 10.3735 3.84648 10.1317C3.26262 9.88983 2.73211 9.53535 2.28525 9.08849C1.83838 8.64162 1.48391 8.11112 1.24207 7.52726C1.00023 6.9434 0.875753 6.31763 0.875753 5.68567C0.875753 4.40936 1.38276 3.18533 2.28525 2.28284C3.18773 1.38036 4.41177 0.873346 5.68807 0.873346C6.96438 0.873346 8.18841 1.38036 9.0909 2.28284C9.99338 3.18533 10.5004 4.40936 10.5004 5.68567Z">
                                                        </path>
                                                    </svg>
                                                    Select another
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-5 d-lg-flex d-none align-items-center justify-content-end">
                                    <div class="banner-img">
                                        <img src={selectedVehicle?.imageUrl} alt />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="car-details-area pt-10 mb-100">
                <div class="container">
                    <div class="row mb-50">

                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0"
                                class="scrollspy-example" tabindex="0">

                                {extrasArr && (

                                    <>


                                        <div class="single-item mb-50" id="car-info">
                                            <div class="car-info">
                                                <div class="title mb-20">
                                                    <h4>Recommended Extras</h4>
                                                </div>
                                                <div class="title mb-20">
                                                    <h5></h5>
                                                </div>



                                                {extrasArr?.map((extraObj) => {
                                                    return (
                                                        <ul>

                                                            {extraObj?.extraName === 'Super Collision Damage Waiver (SCDW)' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={SCDW} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>Super Collision Damage Waiver</h6>


                                                                    </div>
                                                                </li>
                                                            )}


                                                            {extraObj?.extraName === 'Tyres, Windscreen, Underbody' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={Tyre} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>Tyres, Windscreen, Underbody</h6>

                                                                    </div>
                                                                </li>
                                                            )}
                                                            {extraObj?.extraName === 'GPS' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={GPS} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>GPS </h6>

                                                                    </div>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    )
                                                })}






                                            </div>

                                        </div>
                                        <div class="single-item mb-50" id="car-info">
                                            <div class="car-info">
                                                <div class="title mb-20">
                                                    <h5></h5>
                                                </div>


                                                {extrasArr?.map((extraObj) => {
                                                    return (

                                                        <ul>
                                                            {extraObj?.extraName === 'Baby Seat' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={babySeat} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>Baby Seat</h6>


                                                                    </div>
                                                                </li>
                                                            )}
                                                            {extraObj?.extraName === 'Booster Seat' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={boosterSeat} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>Booster Seat</h6>

                                                                    </div>
                                                                </li>
                                                            )}
                                                            {extraObj?.extraName === 'Roof Rack' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={rack} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>Roof Rack</h6>

                                                                    </div>
                                                                </li>
                                                            )}
                                                            {extraObj?.extraName === 'Ski Rack' && (
                                                                <li>
                                                                    <div class="icon">
                                                                        <img src={skiRack} alt />
                                                                    </div>
                                                                    <div class="content">
                                                                        <input type="checkbox" />
                                                                        <h6>Ski Rack</h6>

                                                                    </div>
                                                                </li>
                                                            )}

                                                        </ul>
                                                    )
                                                })}


                                            </div>

                                        </div>

                                    </>

                                )}


                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="car-details-sidebar">

                                <div class="inquiry-form mb-40">
                                    <div class="title">
                                        <h4>Your Selection</h4>
                                        <p></p>
                                    </div>
                                    <form>

                                        <div class="product-widget mb-20">
                                            <div class="check-box-item">
                                                <h6 class="product-widget-title mb-20"></h6>
                                                <div class="checkbox-container">
                                                    <div class="row g-3">
                                                        <div class="col-6">
                                                            <li>
                                                                Basic Rate:</li>

                                                        </div>
                                                        <div class="col-6">
                                                            <span><strong>$15</strong></span>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="form-inner mb-20">
                                                    <h5 class="product-widget-title mb-20">Promo</h5>
                                                    <input type="text" placeholder="Ex- Jhon Numan"

                                                    />
                                                    <button class="primary-btn3" type="submit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                            viewBox="0 0 14 14">
                                                            <path
                                                                d="M13.8697 0.129409C13.9314 0.191213 13.9736 0.269783 13.991 0.355362C14.0085 0.44094 14.0004 0.529754 13.9678 0.610771L8.78063 13.5781C8.73492 13.6923 8.65859 13.7917 8.56003 13.8653C8.46148 13.9389 8.34453 13.9839 8.22206 13.9954C8.09958 14.0068 7.97633 13.9842 7.86586 13.9301C7.75539 13.876 7.66199 13.7924 7.59594 13.6887L4.76304 9.23607L0.310438 6.40316C0.206426 6.33718 0.122663 6.24375 0.0683925 6.13318C0.0141218 6.02261 -0.00854707 5.89919 0.00288719 5.77655C0.0143215 5.65391 0.0594144 5.53681 0.13319 5.43817C0.206966 5.33954 0.306557 5.2632 0.420973 5.21759L13.3883 0.0322452C13.4694 -0.000369522 13.5582 -0.00846329 13.6437 0.00896931C13.7293 0.0264019 13.8079 0.0685926 13.8697 0.1303V0.129409ZM5.65267 8.97578L8.11385 12.8427L12.3329 2.29554L5.65267 8.97578ZM11.7027 1.66531L1.1555 5.88436L5.02333 8.34466L11.7027 1.66531Z" />
                                                        </svg> Activate
                                                    </button>
                                                </div>
                                                <div class="checkbox-container">
                                                    <h5 class="product-widget-title mb-20">Extras</h5>
                                                    <div class="checkbox-container">
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <li>
                                                                    Booster Seat</li>

                                                            </div>
                                                            <div class="col-6">
                                                                <span><strong>$15</strong></span>
                                                            </div>
                                                        </div>
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <li>
                                                                    Roof Rack</li>

                                                            </div>
                                                            <div class="col-6">
                                                                <span><strong>$15</strong></span>
                                                            </div>
                                                        </div>
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <li>GPS </li>

                                                            </div>
                                                            <div class="col-6">
                                                                <span><strong>$15</strong></span>
                                                            </div>
                                                        </div>
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <li>TWU</li>

                                                            </div>
                                                            <div class="col-6">
                                                                <span><strong>$35</strong></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="check-box-item">
                                                    <h6 class="product-widget-title mb-20"></h6>
                                                    <div class="checkbox-container">
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <li>
                                                                    <strong>Total</strong></li>

                                                            </div>
                                                            <div class="col-6">
                                                                <span><strong>$315</strong></span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>




                                                <div class="form-inner">
                                                    <button class="primary-btn3" type="submit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                            viewBox="0 0 14 14">
                                                            <path
                                                                d="M13.8697 0.129409C13.9314 0.191213 13.9736 0.269783 13.991 0.355362C14.0085 0.44094 14.0004 0.529754 13.9678 0.610771L8.78063 13.5781C8.73492 13.6923 8.65859 13.7917 8.56003 13.8653C8.46148 13.9389 8.34453 13.9839 8.22206 13.9954C8.09958 14.0068 7.97633 13.9842 7.86586 13.9301C7.75539 13.876 7.66199 13.7924 7.59594 13.6887L4.76304 9.23607L0.310438 6.40316C0.206426 6.33718 0.122663 6.24375 0.0683925 6.13318C0.0141218 6.02261 -0.00854707 5.89919 0.00288719 5.77655C0.0143215 5.65391 0.0594144 5.53681 0.13319 5.43817C0.206966 5.33954 0.306557 5.2632 0.420973 5.21759L13.3883 0.0322452C13.4694 -0.000369522 13.5582 -0.00846329 13.6437 0.00896931C13.7293 0.0264019 13.8079 0.0685926 13.8697 0.1303V0.129409ZM5.65267 8.97578L8.11385 12.8427L12.3329 2.29554L5.65267 8.97578ZM11.7027 1.66531L1.1555 5.88436L5.02333 8.34466L11.7027 1.66531Z" />
                                                        </svg> Book Now
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
            </div>
            <div class="single-item pt-100 mx-5 px-5 mb-10" id="faqs">
                <div class="faq-area">
                    <div class="title mb-25">
                        <h4>FAQ’s</h4>
                    </div>
                    <div class="faq-wrap">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h5 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                        aria-expanded="false" aria-controls="flush-collapseOne">
                                        What documentation is required to rent a car?
                                    </button>
                                </h5>
                                <div id="flush-collapseOne" class="accordion-collapse collapse show"
                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body"><ul>
                                        <li>Valid driving license</li>
                                        <li>ID or passport</li>
                                        <li>A credit card</li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h5 class="accordion-header" id="flush-headingTwo">
                                    <button class="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Can the car be delivered to my hotel or a different location?
                                    </button>
                                </h5>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Yes, we can deliver cars to any location in Cyprus upon request. However, there may be extra charges. For specific details, please contact us at info@yourway-carhire.com.</div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h5 class="accordion-header" id="flush-headingThree">
                                    <button class="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                        aria-expanded="false" aria-controls="flush-collapseThree">
                                        Why is there an extra fee for vehicle pickups at Larnaka and Paphos Airports?
                                    </button>
                                </h5>
                                <div id="flush-collapseThree" class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">For on-airport deliveries, vehicles are picked up directly from the airport. There's an additional EUR 20 charge for these pickups. This fee is imposed by the Hermes Airport Authorities for every vehicle collection from the airport.</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
