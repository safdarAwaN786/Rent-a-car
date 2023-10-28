import React, { useEffect, useState } from 'react'
import { BiSolidGridAlt, BiListUl } from 'react-icons/bi'
import ProductCard from './ProductCard'
import axios from 'axios';


export default function ProductsSection({setSelectedVehicle}) {
    const [allDataArr, setAllDataArr] = useState(null);

    const [vehiclesList, setVehiclesList] = useState(null);





    useEffect(() => {
        axios.get('/vehicle/read-vehicles').then((res) => {
            console.log(res);
            setAllDataArr(res.data.data);
            setVehiclesList(res.data.data)
        })
    }, [])


    const saloonManualTransmission = allDataArr?.filter(vehicleObj => vehicleObj.vehicleType === 'Saloon Manual Transmission');

    const saloonAutomaticTransmission = allDataArr?.filter(vehicleObj => vehicleObj.vehicleType === 'Saloon Automatic Transmission');

    const cabrioOpenTop = allDataArr?.filter(vehicleObj => vehicleObj.vehicleType === 'Cabrio/Open Top');

    const peopleCarrier = allDataArr?.filter(vehicleObj => vehicleObj.vehicleType === 'People Carrier');

    const SUV4WD = allDataArr?.filter(vehicleObj => vehicleObj.vehicleType === 'SUV/4WD');

    const automaticTransmission = allDataArr?.filter(vehicleObj => vehicleObj.transmissionType === 'Automatic');

    const manualTransmission = allDataArr?.filter(vehicleObj => vehicleObj.transmissionType === 'Manual');

    const twoPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 2);
    const threePassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 3);

    const fourPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 4);

    const fivePassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 5);
    const sixPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 6);
    const sevenPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 6);
    const eightPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 8);

    const [vehicleType, setVehiceType] = useState(null);
    const [transmissionType, setTransmissionType] = useState(null);
    const [noOfPassengers, setNoOfPassengers] = useState(null);



    const [gridView, setGridView] = useState(true);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth < 780) {
            setGridView(true)
        }
    }, [windowWidth])


    const vehicleTypeFilter = (e) => {
        if (e.target.checked) {
            setVehiceType(e.target.value);

            if (transmissionType && noOfPassengers) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (

                        vehicleObj.vehicleType === e.target.value && vehicleObj.transmissionType === transmissionType && vehicleObj.adults == noOfPassengers
                    )
                }))

            } else if (transmissionType && !noOfPassengers) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (

                        vehicleObj.vehicleType === e.target.value && vehicleObj.transmissionType === transmissionType
                    )
                }))
            } else if (noOfPassengers && !transmissionType) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {

                    return (

                        vehicleObj.vehicleType === e.target.value && vehicleObj.adults == noOfPassengers
                    )
                }))
            } else {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (
                        vehicleObj?.vehicleType === e.target.value
                    )
                }))
            }
        }
    }


    const transmissionTypeFilter = (e) => {
        if (e.target.checked) {
            setTransmissionType(e.target.value);

            if (vehicleType && noOfPassengers) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (

                        vehicleObj.transmissionType === e.target.value && vehicleObj.vehicleType === vehicleType && vehicleObj.adults == noOfPassengers
                    )
                }))

            } else if (vehicleType && !noOfPassengers) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (

                        vehicleObj.transmissionType === e.target.value && vehicleObj.vehicleType === vehicleType
                    )
                }))
            } else if (noOfPassengers && !vehicleType) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {

                    return (

                        vehicleObj.transmissionType === e.target.value && vehicleObj.adults == noOfPassengers
                    )
                }))
            } else {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (
                        vehicleObj?.transmissionType === e.target.value
                    )
                }))
            }
        }
    }


    const noOfPassengersFilter = (e) => {
        if (e.target.checked) {
            setNoOfPassengers(e.target.value);

            if (vehicleType && transmissionType) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (

                        vehicleObj.adults == e.target.value && vehicleObj.vehicleType === vehicleType && vehicleObj.transmissionType == transmissionType
                    )
                }))

            } else if (vehicleType && !transmissionType) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (

                        vehicleObj.adults == e.target.value && vehicleObj.vehicleType === vehicleType
                    )
                }))
            } else if (transmissionType && !vehicleType) {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {

                    return (

                        vehicleObj.adults == e.target.value && vehicleObj.transmissionType == transmissionType
                    )
                }))
            } else {
                setVehiclesList(allDataArr?.filter((vehicleObj) => {
                    return (
                        vehicleObj?.adults == e.target.value
                    )
                }))
            }
        }
    }

    return (
        <>
            <div class="product-page pt-100 mb-100">
                <div class="container">
                    <div class="row g-xl-4 gy-5">

                        <div class="col-xl-4 order-xl-1 order-1">
                            <div class="filter-area mb-40">
                                <div class="title-and-close-btn mb-20">
                                    <h6>Search Filters</h6>

                                </div>

                            </div>
                            <div class="product-sidebar">
                                <div class="product-widget mb-20">
                                    <div class="check-box-item">
                                        <h6 class="product-widget-title mb-20">Vehicle Type</h6>
                                        <div class="checkbox-container">

                                            <ul>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            vehicleTypeFilter(e);
                                                        }} value='Saloon Manual Transmission' class="form-check-input" type="radio" name='vehicleType' />

                                                        <span class="text">Saloon Manual Transmission</span>
                                                        <span class="qty">({saloonManualTransmission?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            vehicleTypeFilter(e);
                                                        }} value='Saloon Automatic Transmission' class="form-check-input" type="radio" name='vehicleType' />

                                                        <span class="text">Saloon Automatic Transmission</span>
                                                        <span class="qty">({saloonAutomaticTransmission?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            vehicleTypeFilter(e);
                                                        }} value='Cabrio/Open Top' class="form-check-input" type="radio" name='vehicleType' />
                                                        <span class="text">Cabrio / Open Top</span>
                                                        <span class="qty">({cabrioOpenTop?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            vehicleTypeFilter(e);
                                                        }}  value='People Carrier' class="form-check-input userDifRadio" type="radio" name='vehicleType' />

                                                        <span class="text">People Carrier/Wheelchair Accessible Vehicles</span>
                                                        <span class="qty">({peopleCarrier?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            vehicleTypeFilter(e);
                                                        }} value='SUV/4WD' class="form-check-input" type="radio" name='vehicleType' />

                                                        <span class="text">SUV / 4WD</span>
                                                        <span class="qty">({SUV4WD?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setVehiceType(null);

                                                                if (transmissionType && noOfPassengers) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {
                                                                        return (

                                                                            vehicleObj.transmissionType === transmissionType && vehicleObj.adults == noOfPassengers
                                                                        )
                                                                    }))

                                                                } else if (transmissionType && !noOfPassengers) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {
                                                                        return (

                                                                            vehicleObj.transmissionType === transmissionType
                                                                        )
                                                                    }))
                                                                } else if (noOfPassengers && !transmissionType) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {

                                                                        return (

                                                                            vehicleObj.adults == noOfPassengers
                                                                        )
                                                                    }))
                                                                } else {
                                                                    setVehiclesList(allDataArr);
                                                                }
                                                            }
                                                        }} class="form-check-input" type="radio" name='vehicleType' />

                                                        <span class="text">All Types</span>

                                                    </label>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-widget mb-20">
                                    <div class="check-box-item">
                                        <h6 class="product-widget-title mb-20">Transmission Type</h6>
                                        <div class="checkbox-container">
                                            <ul>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            transmissionTypeFilter(e)
                                                        }} value='Automatic' class="form-check-input" type="radio" name='transmissionType' />

                                                        <span class="text">Automatic</span>
                                                        <span class="qty">({automaticTransmission?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            transmissionTypeFilter(e)
                                                        }} value='Manual' class="form-check-input" type="radio" name='transmissionType' />

                                                        <span class="text">Manual</span>
                                                        <span class="qty">({manualTransmission?.length})</span>

                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setTransmissionType(null);

                                                                if (vehicleType && noOfPassengers) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {
                                                                        return (

                                                                            vehicleObj.vehicleType === vehicleType && vehicleObj.adults == noOfPassengers
                                                                        )
                                                                    }))

                                                                } else if (vehicleType && !noOfPassengers) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {
                                                                        return (

                                                                            vehicleObj.vehicleType === vehicleType
                                                                        )
                                                                    }))
                                                                } else if (noOfPassengers && !vehicleType) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {

                                                                        return (

                                                                            vehicleObj.adults == noOfPassengers
                                                                        )
                                                                    }))
                                                                } else {
                                                                    setVehiclesList(allDataArr);
                                                                }
                                                            }
                                                        }} class="form-check-input" type="radio" name='transmissionType' />

                                                        <span class="text">All Transmissions</span>

                                                    </label>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div class="product-widget mb-20">
                                    <div class="check-box-item">
                                        <h6 class="product-widget-title mb-20">Number of Passengers</h6>
                                        <div class="checkbox-container">

                                            <ul>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            noOfPassengersFilter(e);
                                                        }} value={2} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">2</span>
                                                        <span class="qty">({twoPassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            noOfPassengersFilter(e);
                                                        }} value={3} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">3</span>
                                                        <span class="qty">({threePassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            noOfPassengersFilter(e);
                                                        }} value={4} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">4</span>
                                                        <span class="qty">({fourPassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input
                                                            onChange={(e) => {
                                                                noOfPassengersFilter(e);
                                                            }} value={5} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">5</span>
                                                        <span class="qty">({fivePassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            noOfPassengersFilter(e);
                                                        }} value={6} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">6</span>
                                                        <span class="qty">({sixPassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            noOfPassengersFilter(e);
                                                        }} value={7} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">7</span>
                                                        <span class="qty">({sevenPassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            noOfPassengersFilter(e);
                                                        }} value={8} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">8</span>
                                                        <span class="qty">({eightPassengers?.length})</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setNoOfPassengers(null);

                                                                if (vehicleType && transmissionType) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {
                                                                        return (

                                                                            vehicleObj.vehicleType === vehicleType && vehicleObj.transmissionType == transmissionType
                                                                        )
                                                                    }))

                                                                } else if (vehicleType && !transmissionType) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {
                                                                        return (

                                                                            vehicleObj.vehicleType === vehicleType
                                                                        )
                                                                    }))
                                                                } else if (transmissionType && !vehicleType) {
                                                                    setVehiclesList(allDataArr?.filter((vehicleObj) => {

                                                                        return (

                                                                            vehicleObj.transmissionType == transmissionType
                                                                        )
                                                                    }))
                                                                } else {
                                                                    setVehiclesList(allDataArr);
                                                                }
                                                            }
                                                        }} class="form-check-input" type="radio" name='passengers' />

                                                        <span class="text">All Passengers</span>

                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-8 order-xl-2 order-2">
                            <div class="row mb-40">
                                <div class="col-lg-12">
                                    <div class="show-item-and-filte">

                                        <div class="filter-view">

                                            {windowWidth > 780 && (


                                                <div class="view">
                                                    <div>
                                                        <strong>Change View</strong>
                                                    </div>
                                                    <ul class="btn-group list-grid-btn-group">
                                                        {gridView ? (
                                                            <li class="lists">
                                                                <BiListUl onClick={() => {
                                                                    setGridView(false);
                                                                }} className={` text-black fs-5`} />
                                                            </li>
                                                        ) : (

                                                            <li class="active grid">
                                                                <BiSolidGridAlt onClick={() => {
                                                                    setGridView(true);
                                                                }} className={`text-black fs-5`} />
                                                            </li>
                                                        )}

                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-grid-main">
                                <div class="list-grid-product-wrap grid-group-wrapper">
                                    <div class="row g-4  mb-40">

                                        {vehiclesList?.map((vehicleObj) => {

                                            return (
                                                <div class={`${gridView ? 'col-lg-6 col-md-6 col-sm-12' : 'col-12'}  wow fadeInUp item`}>
                                                    <ProductCard setSelectedVehicle={setSelectedVehicle} gridView={gridView} vehicleData={vehicleObj} />
                                                </div>
                                            )
                                        })}




                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
