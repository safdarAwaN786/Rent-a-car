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
import { useSelector } from 'react-redux';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



export default function AdminProductsSection() {


    const [allDataArr, setAllDataArr] = useState(null);
    const [addingNewGroup, setAddingNewGroup] = useState(false);
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



    const groupCategoryFilter = (e) => {
        if (e.target.checked) {
            setGroupCategory(e.target.value);

            if (transmissionType && noOfPassengers) {
                setGroupsList(allDataArr?.filter((groupObj) => {
                    return (

                        groupObj.groupCategory === e.target.value && groupObj.transmissionType === transmissionType && groupObj.adults == noOfPassengers
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

                        groupObj.transmissionType === e.target.value && groupObj.seats == noOfPassengers
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


    const [gridView, setGridView] = useState(true);

    const [addGroup, setAddGroup] = useState(false);
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


    const groupCategories = [
        { value: 'Saloon Manual Transmission', label: <div>Saloon Manual Transmission</div> },
        { value: 'Saloon Automatic Transmission', label: <div>Saloon Automatic Transmission</div> },
        { value: 'Cabrio/Open Top', label: <div>Cabrio/Open Top</div> },
        { value: 'People Carrier', label: <div>People Carrier</div> },
        { value: 'SUV/4WD', label: <div>SUV/4WD</div> },

    ]


    const currentSeason = useSelector(state => state.currentSeason);
    const [AC, setAC] = useState(false);

    const [groupsList, setGroupsList] = useState(null);



    const reGetData = () => {
        axios.get('/read-groups').then((res) => {
            console.log(res);
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
                                setAddGroup(true);
                            }} type="button" class="primary-btn6 p-sm-2 p-1 " >
                                <AiOutlineAppstoreAdd className='fs-3' />
                                NEW
                            </button>
                        </div>

                        {addGroup && (

                            <div className='addProductBox justify-content-center pt-5  '>
                                <div className='formBox border-circle  mt-5 pt-4 '>
                                    <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                        <div className='d-flex justify-content-end'>
                                            <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                                setAddGroup(false)
                                            }} />
                                        </div>
                                        <h1 className='text-center fs-4'>Add New Group</h1>
                                        <form encType='multipart/form-data' onSubmit={(event) => {
                                            event.preventDefault();
                                            setAddingNewGroup(true);
                                            const data = new FormData(event.target);
                                            data.append('vehicleImage', fileList[0].originFileObj);
                                            data.append('AC', AC);
                                            axios.post('/add-group', data)
                                                .then(response => {
                                                    setAddGroup(false);
                                                    setAddingNewGroup(false);
                                                    console.log(response);
                                                    toast.success("Group Added Successfully!");
                                                    reGetData();
                                                })
                                                .catch(error => {
                                                    setAddingNewGroup(false);
                                                    if (error.response.status === 401) {
                                                        toast.warning(error.response.data.message)
                                                    } else {

                                                        toast.error('Error in adding group!')
                                                    }
                                                    console.error('Error adsing group', error)
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

                                                <label className='mt-1'>Group Name :</label>
                                                <input name='groupName' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                                <label className='mt-1'>Vehicle Name :</label>
                                                <input name='vehicleName' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Engine Size :</label>
                                                <input name='engineSize' type='text' className='p-1 border border-secondary border-circle mb-1' />


                                                <label className='mt-1'>Adults :</label>
                                                <input name='adults' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Doors :</label>
                                                <input name='doors' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Children :</label>
                                                <input name='children' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Seats :</label>
                                                <Select name='seats' styles={customStyles} options={[
                                                    { value: 2, label: <div>2</div> },
                                                    { value: 3, label: <div>3</div> },
                                                    { value: 4, label: <div>4</div> },
                                                    { value: 5, label: <div>5</div> },
                                                    { value: 6, label: <div>6</div> },
                                                    { value: 7, label: <div>7</div> },
                                                    { value: 8, label: <div>8</div> },
                                                ]} />

                                                <label className='mt-1'>Big Luggage :</label>
                                                <input name='bigLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                                <label className='mt-1'>Small Luggage :</label>
                                                <input name='smallLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                                <label className='mt-1'>Transmission Type :</label>
                                                <Select name='transmissionType' styles={customStyles} options={[
                                                    { value: 'Automatic', label: <div>Automatic</div> },
                                                    { value: 'Manual', label: <div>Manual</div> },
                                                ]} />



                                                <div className='my-2'>
                                                    <label className='mt-1'>AC :</label>
                                                    <input onChange={(e) => {
                                                        setAC(e.target.checked);
                                                    }} style={{
                                                        width: '18px',
                                                        height: '18px'
                                                    }} type='checkbox' className='m-4 border border-secondary border-circle mb-1' />
                                                </div>

                                                <label className='mt-2'>group Category :</label>
                                                <Select name='groupCategory' styles={customStyles} options={groupCategories} />



                                                <div className='d-flex justify-content-center my-4'>
                                                    <button style={{
                                                        zIndex: '00'
                                                    }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                        {addingNewGroup ? (
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
                                            <h6 class="product-widget-title mb-20">Group Type</h6>
                                            <div class="checkbox-container">

                                                <ul>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='Saloon Manual Transmission' className='filterInput' type="radio" name='groupCategory' />

                                                            <span class="text">Saloon Manual Transmission</span>
                                                            <span class="qty">({saloonManualTransmission?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='Saloon Automatic Transmission' className='filterInput' type="radio" name='groupCategory' />

                                                            <span class="text">Saloon Automatic Transmission</span>
                                                            <span class="qty">({saloonAutomaticTransmission?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='Cabrio/Open Top' className='filterInput' type="radio" name='groupCategory' />
                                                            <span class="text">Cabrio / Open Top</span>
                                                            <span class="qty">({cabrioOpenTop?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='People Carrier' className='filterInput' type="radio" name='groupCategory' />

                                                            <span class="text">People Carrier</span>
                                                            <span class="qty">({peopleCarrier?.length})</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="containerss">
                                                            <input onChange={(e) => {
                                                                groupCategoryFilter(e);
                                                            }} value='SUV/4WD' className='filterInput' type="radio" name='groupCategory' />

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
                                                            }} className='filterInput' type="radio" name='groupCategory' />

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
                                                if (currentSeason) {
                                                    return a[currentSeason]['1to2daysPrice'] - b[currentSeason]['1to2daysPrice'];
                                                }
                                                return a.winterSeason['1to2daysPrice'] - b.winterSeason['1to2daysPrice'];
                                            }).map((groupObj) => {
                                                return (
                                                    <div class={`${gridView ? 'col-lg-6 col-md-6 col-sm-12' : 'col-12'}  wow fadeInUp item`}>
                                                        <AdminProductCard reGetData={reGetData} groupData={groupObj} gridView={gridView} />

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
