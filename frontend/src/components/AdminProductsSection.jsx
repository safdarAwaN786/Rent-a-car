import React, { useEffect, useState } from 'react'
import { BiSolidGridAlt, BiListUl } from 'react-icons/bi'
import ProductCard from './ProductCard'
import { AiOutlineAppstoreAdd, AiOutlineCloseSquare, AiOutlineEdit } from 'react-icons/ai';
import Select from 'react-select';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminProductCard from './AdminProductCard';
import Spinner from 'react-bootstrap/esm/Spinner';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



export default function AdminProductsSection() {

   
    const [allDataArr, setAllDataArr] = useState(null);
    const [addingNewVehicle, setAddingNewVehicle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([

    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );




    const [gridView, setGridView] = useState(true);

    const [addProduct, setAddProduct] = useState(false);
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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);

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


    const vehicleCategories = [
        { value: 'Saloon Manual Transmission', label: <div>Saloon Manual Transmission</div> },
        { value: 'Saloon Automatic Transmission', label: <div>Saloon Automatic Transmission</div> },
        { value: 'Cabrio/Open Top', label: <div>Cabrio/Open Top</div> },
        { value: 'People Carrier', label: <div>People Carrier</div> },
        { value: 'SUV/4WD', label: <div>SUV/4WD</div> },

    ]
    const groups = [
        { value: 'A3', label: <div>A3</div> },
        { value: 'A4', label: <div>A4</div> },
        { value: 'A5', label: <div>A5</div> },
        { value: 'B3', label: <div>B3</div> },
        { value: 'B4', label: <div>B4</div> },
        { value: 'C2', label: <div>C2</div> },
        { value: 'C4', label: <div>C4</div> },
        { value: 'C6', label: <div>C6</div> },
        { value: 'C8', label: <div>C8</div> },
        { value: 'D1', label: <div>D1</div> },
        { value: 'D4', label: <div>D4</div> },
        { value: 'D7', label: <div>D7</div> },
        { value: 'D8', label: <div>D8</div> },
    ]

    const [AC, setAC] = useState(false);

    const [vehiclesList, setVehiclesList] = useState(null);



    const reGetData = () => {
        axios.get('/vehicle/read-vehicles').then((res) => {
            console.log(res);
            setAllDataArr(res.data.data);
            setVehiclesList(res.data.data)
        })
    }

    useEffect(() => {
        axios.get('/vehicle/read-vehicles').then((res) => {
            console.log(res);
            setLoading(false)
            setAllDataArr(res.data.data);
            setVehiclesList(res.data.data)
        }).catch((e)=>{
            toast.error('Error Slow Internet, Please Refresh!')
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
    const sevenPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 7);
    const eightPassengers = allDataArr?.filter(vehicleObj => vehicleObj.adults == 8);

    const [vehicleType, setVehiceType] = useState(null);
    const [transmissionType, setTransmissionType] = useState(null);
    const [noOfPassengers, setNoOfPassengers] = useState(null);



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
            {loading ? (
                <div style={{
                    height: '200px'
                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (


                <div class="product-page pt-20 mb-100">
                    <div class="container">

                        <div className='d-flex justify-content-end'>
                            <button onClick={() => {
                                setAddProduct(true);
                            }} type="button" class="primary-btn6 p-sm-2 p-1 " >
                                <AiOutlineAppstoreAdd className='fs-3' />
                                NEW
                            </button>
                        </div>

                        {addProduct && (

                            <div className='addProductBox justify-content-center pt-5  '>
                                <div className='formBox border-circle  mt-5 pt-4 '>


                                    <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                        <div className='d-flex justify-content-end'>

                                            <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                                setAddProduct(false)
                                            }} />
                                        </div>


                                        <h1 className='text-center fs-4'>Add New Vehicle</h1>

                                        <form encType='multipart/form-data' onSubmit={(event) => {
                                            event.preventDefault();
                                            setAddingNewVehicle(true);
                                            const data = new FormData(event.target);

                                            data.append('vehicleImage', fileList[0].originFileObj);
                                            data.append('AC', AC);


                                            event.target.reset();



                                            axios.post('/vehicle/add-vehicle', data)
                                                .then(response => {
                                                    setAddProduct(false);
                                                    setAddingNewVehicle(false);
                                                    console.log(response);

                                                    reGetData();
                                                    toast.success("Vehicle Added Successfully!");

                                                })
                                                .catch(error => {
                                                    setAddingNewVehicle(false);
                                                    toast.error('Error in adding Vehicle!')
                                                    console.error('Error adsing vehicle', error)
                                                });

                                        }}>
                                            <div className='d-flex flex-column'>

                                                <div className='my-3'>
                                                    <label>Image : </label>

                                                    <Upload

                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        onPreview={handlePreview}
                                                        onChange={handleChange}
                                                    >
                                                        {fileList.length >= 1 ? null : uploadButton}
                                                    </Upload>
                                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                        <img
                                                            alt="example"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={previewImage}
                                                        />
                                                    </Modal>

                                                </div>

                                                <label className='mt-1'>Vehicle Name :</label>
                                                <input name='name' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                               
                                                <label className='mt-1'>Engine Size :</label>
                                                <input name='engineSize' type='text' className='p-1 border border-secondary border-circle mb-1' />


                                                <label className='mt-1'>Adults :</label>
                                                <Select name='adults' styles={customStyles} options={[
                                                    { value: 2, label: <div>2</div> },
                                                    { value: 3, label: <div>3</div> },
                                                    { value: 4, label: <div>4</div> },
                                                    { value: 5, label: <div>5</div> },
                                                    { value: 6, label: <div>6</div> },
                                                    { value: 7, label: <div>7</div> },
                                                    { value: 8, label: <div>8</div> },
                                                ]} />

                                                <label className='mt-1'>Doors :</label>
                                                <input name='doors' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Children :</label>
                                                <input name='children' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Seats :</label>
                                                <input name='seats' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Big Luggage :</label>
                                                <input name='bigLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Small Luggage :</label>
                                                <input name='smallLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                                <label className='mt-1'>Transmission Type :</label>
                                                <Select name='transmissionType' styles={customStyles} options={[
                                                    { value: 'Automatic', label: <div>Automatic</div> },
                                                    { value: 'Manual', label: <div>Manual</div> },
                                                ]} />


                                                <label className='mt-2'>Price (€):</label>
                                                <input name='price' type='number' className='p-1 border border-secondary border-circle mb-1' />
                                                <div className='my-2'>


                                                    <label className='mt-1'>AC :</label>
                                                    <input onChange={(e) => {
                                                        setAC(e.target.checked);
                                                    }} style={{
                                                        width: '18px',
                                                        height: '18px'
                                                    }} type='checkbox' className='m-4 border border-secondary border-circle mb-1' />
                                                </div>

                                                <label className='mt-2'>Vehicle Type :</label>
                                                <Select name='vehicleType' styles={customStyles} options={vehicleCategories} />
                                                <label className='mt-2'>Group :</label>
                                                <Select name='group' options={groups} />


                                                <div className='d-flex justify-content-center my-4'>
                                                    <button style={{
                                                        zIndex: '00'
                                                    }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                        {addingNewVehicle ? (
                                                            <Spinner animation="border" size="sm" />
                                                        ) : (

                                                            'GENERATE'
                                                        )}

                                                    </button>

                                                </div>

                                            </div>
                                        </form>

                                    </div>


                                </div>
                            </div>
                        )}

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
                                                            }} value='People Carrier' class="form-check-input difRadio" type="radio" name='vehicleType' />

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

                                            {vehiclesList?.sort((a, b) => a.price - b.price).map((vehicleObj) => {
                                                return (
                                                    <div class={`${gridView ? 'col-lg-6 col-md-6 col-sm-12' : 'col-12'}  wow fadeInUp item`}>
                                                        <AdminProductCard reGetData={reGetData} vehicleData={vehicleObj} gridView={gridView} />

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
