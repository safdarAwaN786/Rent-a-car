import React, { useEffect, useState } from 'react'
import { BiSolidGridAlt, BiListUl } from 'react-icons/bi'
import ProductCard from './ProductCard'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


export default function ProductsSection() {
    const [allDataArr, setAllDataArr] = useState(null);

    const [groupsList, setGroupsList] = useState(null);



    const reGetData = ()=>{
        axios.get('/read-groups').then((res) => {
            console.log(res);
            setLoading(false)
            setAllDataArr(res.data.data);
            setGroupsList(res.data.data)
        }).catch((e) => {
            toast.error('Error, Please Refresh!')
        })
    }



    useEffect(() => {
        axios.get('/read-groups').then((res) => {
            console.log(res);
            setLoading(false)
            setAllDataArr(res.data.data);
            setGroupsList(res.data.data)
        }).catch((e) => {
            reGetData();
        })
    }, [])


    const saloonManualTransmission = allDataArr?.filter(groupObj => groupObj.groupCategory === 'Saloon Manual Transmission');

    const saloonAutomaticTransmission = allDataArr?.filter(groupObj => groupObj.groupCategory === 'Saloon Automatic Transmission');

    const cabrioOpenTop = allDataArr?.filter(groupObj => groupObj.groupCategory === 'Cabrio/Open Top');

    const peopleCarrier = allDataArr?.filter(groupObj => groupObj.groupCategory === 'People Carrier');

    const SUV4WD = allDataArr?.filter(groupObj => groupObj.groupCategory === 'SUV/4WD');

    const automaticTransmission = allDataArr?.filter(groupObj => groupObj.transmissionType === 'Automatic');

    const manualTransmission = allDataArr?.filter(groupObj => groupObj.transmissionType === 'Manual');

    const twoPassengers = allDataArr?.filter(groupObj => groupObj.seats == 2);
    const threePassengers = allDataArr?.filter(groupObj => groupObj.seats == 3);

    const fourPassengers = allDataArr?.filter(groupObj => groupObj.seats == 4);

    const fivePassengers = allDataArr?.filter(groupObj => groupObj.seats == 5);
    const sixPassengers = allDataArr?.filter(groupObj => groupObj.seats == 6);
    const sevenPassengers = allDataArr?.filter(groupObj => groupObj.seats == 7);
    const eightPassengers = allDataArr?.filter(groupObj => groupObj.seats == 8);

    const [groupCategory, setGroupCategory] = useState(null);
    const [transmissionType, setTransmissionType] = useState(null);
    const [noOfPassengers, setNoOfPassengers] = useState(null);


    const [loading, setLoading] = useState(true);
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

    const currentSeason = useSelector(state => state.currentSeason);
    const daysPrice = useSelector(state => state.numberOfDays?.priceText);

    const groupCategoryFilter = (e) => {
        if (e.target.checked) {
            setGroupCategory(e.target.value);

            if (transmissionType && noOfPassengers) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.groupCategory === e.target.value && groupObj.transmissionType === transmissionType && groupObj.seats == noOfPassengers
                    )
                }))

            } else if (transmissionType && !noOfPassengers) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.groupCategory === e.target.value && groupObj.transmissionType === transmissionType
                    )
                }))
            } else if (noOfPassengers && !transmissionType) {
                setGroupsList(allDataArr?.filter((groupObj) => {

                    return (

                        groupObj.groupCategory === e.target.value && groupObj.seats == noOfPassengers
                    )
                }))
            } else {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (
                        groupObj?.groupCategory === e.target.value
                    )
                }))
            }
        }
    }


    const transmissionTypeFilter = (e) => {
        if (e.target.checked) {
            setTransmissionType(e.target.value);

            if (groupCategory && noOfPassengers) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.transmissionType === e.target.value && groupObj.groupCategory === groupCategory && groupObj.seats == noOfPassengers
                    )
                }))

            } else if (groupCategory && !noOfPassengers) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.transmissionType === e.target.value && groupObj.groupCategory === groupCategory
                    )
                }))
            } else if (noOfPassengers && !groupCategory) {
                setGroupsList(allDataArr?.filter((groupObj) => {

                    return (

                        groupObj.transmissionType === e.target.value && groupObj.adults == noOfPassengers
                    )
                }))
            } else {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (
                        groupObj?.transmissionType === e.target.value
                    )
                }))
            }
        }
    }


    const noOfPassengersFilter = (e) => {
        if (e.target.checked) {
            setNoOfPassengers(e.target.value);

            if (groupCategory && transmissionType) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.seats == e.target.value && groupObj.groupCategory === groupCategory && groupObj.transmissionType == transmissionType
                    )
                }))

            } else if (groupCategory && !transmissionType) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.seats == e.target.value && groupObj.groupCategory === groupCategory
                    )
                }))
            } else if (transmissionType && !groupCategory) {
                setGroupsList(allDataArr?.filter((groupObj) => {

                    return (

                        groupObj.seats == e.target.value && groupObj.transmissionType == transmissionType
                    )
                }))
            } else {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (
                        groupObj?.seats == e.target.value
                    )
                }))
            }
        }
    }

    return (
        <>
            {loading ? (
                <div style={{
                    height: '200px'
                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (



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
                                                                groupCategoryFilter(e);
                                                            }} value='Saloon Manual Transmission' className='filterInput' type="radio" name='vehicleType' />

                                                            <span class="text">Saloon Manual Transmission</span>
                                                            <span class="qty">({saloonManualTransmission?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                               groupCategoryFilter(e);
                                                            }} value='Saloon Automatic Transmission' className='filterInput' type="radio" name='vehicleType' />

                                                            <span class="text">Saloon Automatic Transmission</span>
                                                            <span class="qty">({saloonAutomaticTransmission?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='Cabrio/Open Top' className='filterInput' type="radio" name='vehicleType' />
                                                            <span class="text">Cabrio / Open Top</span>
                                                            <span class="qty">({cabrioOpenTop?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='People Carrier' className='filterInput' type="radio" name='vehicleType' />

                                                            <span class="text">People Carrier</span>
                                                            <span class="qty">({peopleCarrier?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                               groupCategoryFilter(e);
                                                            }} value='SUV/4WD' className='filterInput' type="radio" name='vehicleType' />

                                                            <span class="text">SUV / 4WD</span>
                                                            <span class="qty">({SUV4WD?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setGroupCategory(null);

                                                                    if (transmissionType && noOfPassengers) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {
                                                                            return (

                                                                                groupObj.transmissionType === transmissionType && groupObj.seats == noOfPassengers
                                                                            )
                                                                        }))

                                                                    } else if (transmissionType && !noOfPassengers) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {
                                                                            return (

                                                                                groupObj.transmissionType === transmissionType
                                                                            )
                                                                        }))
                                                                    } else if (noOfPassengers && !transmissionType) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {

                                                                            return (

                                                                                groupObj.seats == noOfPassengers
                                                                            )
                                                                        }))
                                                                    } else {
                                                                        setGroupsList(allDataArr);
                                                                    }
                                                                }
                                                            }} className='filterInput' type="radio" name='vehicleType' />

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
                                                            }} value='Automatic' className='filterInput' type="radio" name='transmissionType' />

                                                            <span class="text">Automatic</span>
                                                            <span class="qty">({automaticTransmission?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                transmissionTypeFilter(e)
                                                            }} value='Manual' className='filterInput' type="radio" name='transmissionType' />

                                                            <span class="text">Manual</span>
                                                            <span class="qty">({manualTransmission?.length})</span>

                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setTransmissionType(null);

                                                                    if (groupCategory && noOfPassengers) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {
                                                                            return (

                                                                                groupObj.groupCategory === groupCategory && groupObj.seats == noOfPassengers
                                                                            )
                                                                        }))

                                                                    } else if (groupCategory && !noOfPassengers) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {
                                                                            return (

                                                                                groupObj.groupCategory === groupCategory
                                                                            )
                                                                        }))
                                                                    } else if (noOfPassengers && !groupCategory) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {

                                                                            return (

                                                                                groupObj.seats == noOfPassengers
                                                                            )
                                                                        }))
                                                                    } else {
                                                                        setGroupsList(allDataArr);
                                                                    }
                                                                }
                                                            }} className='filterInput' type="radio" name='transmissionType' />

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
                                                            }} value={2} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">2</span>
                                                            <span class="qty">({twoPassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                noOfPassengersFilter(e);
                                                            }} value={3} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">3</span>
                                                            <span class="qty">({threePassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                noOfPassengersFilter(e);
                                                            }} value={4} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">4</span>
                                                            <span class="qty">({fourPassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input
                                                                onChange={(e) => {
                                                                    noOfPassengersFilter(e);
                                                                }} value={5} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">5</span>
                                                            <span class="qty">({fivePassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                noOfPassengersFilter(e);
                                                            }} value={6} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">6</span>
                                                            <span class="qty">({sixPassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                noOfPassengersFilter(e);
                                                            }} value={7} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">7</span>
                                                            <span class="qty">({sevenPassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                noOfPassengersFilter(e);
                                                            }} value={8} className='filterInput' type="radio" name='passengers' />

                                                            <span class="text">8</span>
                                                            <span class="qty">({eightPassengers?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setNoOfPassengers(null);

                                                                    if (groupCategory && transmissionType) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {
                                                                            return (

                                                                                groupObj.groupCategory === groupCategory && groupObj.transmissionType == transmissionType
                                                                            )
                                                                        }))

                                                                    } else if (groupCategory && !transmissionType) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {
                                                                            return (

                                                                                groupObj.groupCategory === groupCategory
                                                                            )
                                                                        }))
                                                                    } else if (transmissionType && !groupCategory) {
                                                                        setGroupsList(allDataArr?.filter((groupObj) => {

                                                                            return (

                                                                                groupObj.transmissionType == transmissionType
                                                                            )
                                                                        }))
                                                                    } else {
                                                                        setGroupsList(allDataArr);
                                                                    }
                                                                }
                                                            }} className='filterInput' type="radio" name='passengers' />

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

                                        

                                            {groupsList?.sort((a, b) => {
                                                if (daysPrice) {
                                                    return a[currentSeason][daysPrice] - b[currentSeason][daysPrice];
                                                }
                                                return a[currentSeason]['1to2daysPrice'] - b[currentSeason]['1to2daysPrice'];
                                            }).map((groupObj) => {

                                                return (
                                                    <div class={`${gridView ? 'col-lg-6 col-md-6 col-sm-12' : 'col-12'}  wow fadeInUp item`}>
                                                        <ProductCard  gridView={gridView} groupData={groupObj} />
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
            )}
        </>
    )
}
