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
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';
import { Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectVehicle, updateBookingInfo } from '../redux/slices/bookingSlices';
import { CiLocationArrow1 } from 'react-icons/ci'
import { BiMinus } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function CompleteBooking() {

    const [applyingPromo, setApplyingPromo] = useState(false);
    const [makingBooking, setMakingBooking] = useState(false);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const bookingSubmitted = useSelector(state => state.booking.isBookingSubmitted);
    const selectedVehicle = useSelector(state => state.vehicle);


    const bookingData = useSelector(state => state.booking.bookingData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [gettingExtras, setGettingExtras] = useState(true);

    const [daysNumber, setDaysNumber] = useState(null);

    useEffect(() => {
        if (!bookingSubmitted || !bookingData || !loggedIn) {
            navigate('/');
        }
        if (!selectedVehicle) {
            navigate('/vehicle-guide')
        }
    });

    useEffect(() => {
        const pickUpDate = new Date(bookingData?.pickUpDate);
        const dropOffDate = new Date(bookingData?.dropOffDate);

        // To calculate the time difference
        const timeDiff = Math.abs(dropOffDate.getTime() - pickUpDate.getTime());
        const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(numberOfDays);
        setDaysNumber(numberOfDays)

        dispatch(updateBookingInfo({ ...bookingData, totalPricePerDay: Math.round(bookingData?.totalPricePerDay), totalPrice: Math.round(bookingData?.totalPricePerDay * numberOfDays) }))


    }, [bookingData?.totalPricePerDay])

    const [promoCodeObj, setPromoCodeObj] = useState(null);

    useEffect(() => {



        if (promoCodeObj) {

            let totalPricePerDay = bookingData.totalPricePerDay;


            totalPricePerDay = totalPricePerDay - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
            dispatch(updateBookingInfo({ ...bookingData, promoCode: promoCodeObj, totalPricePerDay: Math.round(totalPricePerDay) }))
        } else {
            let totalPricePerDay = selectedVehicle.price

            for (let i = 0; i < bookingData?.addedExtras?.length; i++) {
                const extraObj = bookingData.addedExtras[i];
                totalPricePerDay += extraObj.price * extraObj.quantity;
            }

            dispatch(updateBookingInfo({ ...bookingData, totalPricePerDay: Math.round(totalPricePerDay), promoCode: null }));
        }

    }, [promoCodeObj])




    const [codeValue, setCodeValue] = useState(null);

    const [extrasArr, setExtrasArr] = useState(null);

    useEffect(() => {
        axios.get(`/extras/read-extras`).then((res) => {
            setGettingExtras(false);
            console.log(res.data)
            setExtrasArr(res.data.data[0].Extras);
        }).catch((e) => {
            toast.error('Error Slow Internet, Please Refresh!')
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
                                                    <h3>€{selectedVehicle?.price}/day</h3>
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
                            {gettingExtras ? (
                                <div style={{
                                    height: '200px'
                                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                                    <Spinner animation="border" variant="secondary" />
                                </div>
                            ) : (



                                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0"
                                    class="scrollspy-example" tabindex="0">
                                    <div class="single-item mb-50" id="car-info">
                                        <div class="car-info">
                                            <div class="title mb-20">
                                                <h4>Recommended Extras</h4>
                                            </div>
                                            <div class="title mb-20">
                                                <h5></h5>
                                            </div>

                                            <ul>

                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={SCDW} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'Super Collision Damage Waiver (SCDW)')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }

                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'Super Collision Damage Waiver (SCDW)',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'Super Collision Damage Waiver (SCDW)').priceOfExtra.find((priceObj) => priceObj.groupName === selectedVehicle.group).price,
                                                                    quantity: 1
                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'Super Collision Damage Waiver (SCDW)');



                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);

                                                            }

                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))



                                                        }} type="checkbox" />
                                                        <h6>Super Collision Damage Waiver(SCDW)</h6>


                                                    </div>
                                                </li>




                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={Tyre} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'Tyres, Windscreen, Underbody')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }

                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'Tyres, Windscreen, Underbody',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'Tyres, Windscreen, Underbody').priceOfExtra.find((priceObj) => priceObj.groupName === selectedVehicle.group).price,
                                                                    quantity: 1
                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'Tyres, Windscreen, Underbody');

                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);

                                                            }

                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))
                                                        }} type="checkbox" />
                                                        <h6>Tyres, Windscreen, Underbody</h6>

                                                    </div>
                                                </li>


                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={GPS} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'GPS')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }

                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'GPS',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'GPS').priceOfExtra.find((priceObj) => priceObj.groupName === selectedVehicle.group).price,
                                                                    quantity: 1
                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'GPS');
                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);
                                                            }
                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))
                                                        }} type="checkbox" />
                                                        <h6>GPS</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="single-item mb-50" id="car-info">
                                        <div class="car-info">
                                            <div class="title mb-20">
                                                <h5></h5>
                                            </div>

                                            <ul>
                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={babySeat} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'Baby Seat')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }

                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'Baby Seat',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'Baby Seat').priceOfExtra,
                                                                    quantity: 1


                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'Baby Seat');
                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);
                                                            }
                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))
                                                        }} type="checkbox" />
                                                        <h6>Baby Seat</h6>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={boosterSeat} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'Booster Seat')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }
                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'Booster Seat',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'Booster Seat').priceOfExtra,
                                                                    quantity: 1

                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'Booster Seat');
                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);
                                                            }
                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))
                                                        }} type="checkbox" />
                                                        <h6>Booster Seat</h6>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={rack} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'Roof Rack')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }
                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'Roof Rack',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'Roof Rack').priceOfExtra,
                                                                    quantity: 1
                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'Roof Rack');
                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);
                                                            }
                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))
                                                        }} type="checkbox" />
                                                        <h6>Roof Rack</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="single-item mb-50" id="car-info">
                                        <div class="car-info">
                                            <div class="title mb-20">
                                                <h5></h5>
                                            </div>
                                            <ul>
                                                <li>
                                                    <div class="icon">
                                                        <img className='extraImg' src={skiRack} alt />
                                                    </div>
                                                    <div class="content">
                                                        <input className='cursor-pointer' checked={bookingData?.addedExtras?.some(extraObj => extraObj.extraName === 'Ski Rack')} onChange={(e) => {
                                                            let updatedExtras;
                                                            if (bookingData.addedExtras) {
                                                                updatedExtras = [...bookingData.addedExtras];
                                                            } else {
                                                                updatedExtras = [];
                                                            }
                                                            if (e.target.checked) {
                                                                updatedExtras.push({
                                                                    extraName: 'Ski Rack',
                                                                    price: extrasArr.find((extraObj) => extraObj.extraName === 'Ski Rack').priceOfExtra,
                                                                    quantity: 1
                                                                })
                                                            } else {
                                                                const extraFound = updatedExtras.find((extraObj) => extraObj.extraName === 'Ski Rack');
                                                                updatedExtras = updatedExtras.filter((extraObj) => extraObj !== extraFound);
                                                            }
                                                            let totalPricePerDay;

                                                            if (promoCodeObj) {
                                                                totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                            } else {
                                                                totalPricePerDay = selectedVehicle.price;
                                                            }


                                                            for (let i = 0; i < updatedExtras.length; i++) {
                                                                const extraObj = updatedExtras[i];
                                                                totalPricePerDay += extraObj.price * extraObj.quantity;
                                                            }



                                                            dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))
                                                        }} type="checkbox" />
                                                        <h6>Ski Rack</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div class="col-lg-4">
                            <div class="car-details-sidebar">
                                <div class="inquiry-form mb-40">
                                    <div class="title">
                                        <h4>Your Selection</h4>
                                        <p></p>
                                    </div>


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
                                                        <span><strong>€{selectedVehicle?.price}</strong></span>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="form-inner mb-20">
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    setApplyingPromo(true)
                                                    e.target.reset();
                                                    axios.get(`/promo-code/get-code/${codeValue}`).then((res) => {
                                                        console.log(res);
                                                        setApplyingPromo(false);
                                                        if (res.status === 201) {
                                                            toast.error(res.data.message)
                                                        } else {
                                                            setPromoCodeObj(res.data.data);
                                                            setCodeValue(null)
                                                            toast.success('Promo Code Activated !');
                                                        }
                                                    }).catch(err => {
                                                        setApplyingPromo(false);
                                                        console.log(err);
                                                        setPromoCodeObj(null);
                                                        toast.error('Error on Applying Code!')
                                                    })
                                                }}>
                                                    <h5 class="product-widget-title mb-20">Promo</h5>
                                                    {promoCodeObj && (
                                                        <div className=' px-2 my-2 d-flex justify-content-between'>
                                                            <span>{promoCodeObj.code}</span>
                                                            <div>

                                                                <span><BiMinus />{promoCodeObj.discountPercent}%</span>
                                                                <AiOutlineCloseCircle className='mx-2 cursor-pointer fs-5' onClick={() => {
                                                                    setPromoCodeObj(null);
                                                                    toast.success('Promo Code Removed!')
                                                                }} />
                                                            </div>

                                                        </div>
                                                    )}
                                                    <input onChange={(e) => {
                                                        setCodeValue(e.target.value);
                                                    }} type="text" placeholder="Ex- Jhon Numan" required />
                                                    <button class="primary-btn3" type="submit">
                                                        {!applyingPromo && (
                                                            <CiLocationArrow1 className='fs-4' />
                                                        )}
                                                        {applyingPromo ? (
                                                            <Spinner animation="border" size="sm" />
                                                        ) : (
                                                            'Activate'
                                                        )}
                                                    </button>
                                                </form>
                                            </div>
                                            <div class="checkbox-container">
                                                <h5 class="product-widget-title mb-20">Extras</h5>
                                                <div class="checkbox-container">


                                                    {bookingData?.addedExtras?.map((extraObj) => {
                                                        return (
                                                            <div class="row g-3">
                                                                <div class="col-6">
                                                                    <li>{extraObj.extraName}</li>

                                                                </div>
                                                                <div class="col-6">
                                                                    {(extraObj.extraName !== 'Booster Seat' && extraObj.extraName !== 'Baby Seat') ? (
                                                                        <>
                                                                            <span><strong>€{extraObj.price}</strong> × {extraObj.quantity}</span>
                                                                        </>

                                                                    ) : (
                                                                        <>
                                                                            <span><strong>€{extraObj.price}</strong>  ×  </span>

                                                                            <Select value={extraObj.quantity} onChange={(value) => {
                                                                                // Destructure bookingData from the store
                                                                                const { addedExtras } = bookingData;

                                                                                // Update the specific item in the array
                                                                                const updatedExtras = addedExtras.map((extraItem) =>
                                                                                    extraItem.extraName === extraObj.extraName
                                                                                        ? { ...extraItem, quantity: value }
                                                                                        : extraItem
                                                                                );

                                                                                let totalPricePerDay;

                                                                                if (promoCodeObj) {
                                                                                    totalPricePerDay = selectedVehicle.price - ((selectedVehicle.price / 100) * promoCodeObj.discountPercent)
                                                                                } else {
                                                                                    totalPricePerDay = selectedVehicle.price;
                                                                                }


                                                                                for (let i = 0; i < updatedExtras.length; i++) {
                                                                                    const extraObj = updatedExtras[i];
                                                                                    totalPricePerDay += extraObj.price * extraObj.quantity;
                                                                                }



                                                                                dispatch(updateBookingInfo({ ...bookingData, addedExtras: updatedExtras, totalPricePerDay }))

                                                                            }} options={[
                                                                                { value: 1, label: 1 },
                                                                                { value: 2, label: 2 },
                                                                                { value: 3, label: 3 },
                                                                            ]} />
                                                                        </>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        )
                                                    })}




                                                </div>
                                            </div>
                                            <div class="check-box-item">
                                                <h6 class="product-widget-title mb-20"></h6>
                                                <div class="checkbox-container">
                                                    <div class="row g-3">
                                                        <div class="col-6">
                                                            <li><strong>Total</strong></li>

                                                        </div>
                                                        <div class="col-6">
                                                            <span><span className='mx-2'>€ {bookingData?.totalPricePerDay}</span> × <span>{daysNumber}days</span> = <strong>€ {bookingData?.totalPrice}</strong> </span>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>




                                            <div class="form-inner">
                                                <button onClick={() => {
                                                    setMakingBooking(true);
                                                    axios.post('/booking/add-booking', bookingData).then((res) => {
                                                        toast.success('Booking Made Successfully, Kindly Check your Email for Booking Confirmation!');
                                                        setMakingBooking(false);
                                                        // Adding a 3-second delay before navigating to '/'
                                                        setTimeout(() => {
                                                            dispatch(updateBookingInfo({}));
                                                            navigate('/');
                                                        }, 3000);

                                                    }).catch((err) => {
                                                        setMakingBooking(false);
                                                        toast.error('Booking not Submitted, Try Again!');

                                                    })
                                                }} class="primary-btn3" type="submit">
                                                    {!makingBooking && (

                                                        <CiLocationArrow1 className='fs-4' />
                                                    )}
                                                    {makingBooking ? (
                                                        <Spinner animation="border" size="sm" />
                                                    ) : (
                                                        'Book Now'
                                                    )}
                                                </button>
                                            </div>

                                        </div>
                                    </div>

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
