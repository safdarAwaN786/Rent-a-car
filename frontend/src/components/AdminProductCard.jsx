import React, { useEffect, useState } from 'react'
import carImg from '../assets/img/inner-page/001.png'
import engineImg from '../assets/img/home4/icon/Resized_svg (2).svg'
import adultImg from '../assets/img/home4/icon/Resized_svg (4).png'
import doorsImg from '../assets/img/home4/icon/Resized_svg (3).svg'
import childrenImg from '../assets/img/home4/icon/Resized_svg (5).svg'
import seatsImg from '../assets/img/home4/icon/Resized_svg (6).svg'
import bigLuggageImg from '../assets/img/home4/icon/Resized_svg (7).svg'
import smallLuggageImg from '../assets/img/home4/icon/Resized_svg (8).svg'
import transmissionImg from '../assets/img/home4/icon/menual.svg'
import ACImg from '../assets/img/home4/icon/Resized_svg (9).svg'
import { AiOutlineCloseSquare, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import Select from 'react-select'

import { Button, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import axios from 'axios'
import { toast } from 'react-toastify'

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function AdminProductCard({ gridView, vehicleData, reGetData }) {
    const [vehicleToEdit, setVehicleToEdit] = useState(null);
    const [editVehicle, setEditVehicle] = useState(false);

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

    useEffect(() => {
        console.log(vehicleToEdit);
    }, [vehicleToEdit])

    const updateVehicleData = (e) => {
        setVehicleToEdit({ ...vehicleToEdit, [e.target.name]: e.target.value })
    }


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            url: vehicleData?.imageUrl
        }
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



    useEffect(() => {
        console.log(fileList);
    }, [fileList])



    // const [open, setOpen] = useState(false);
    // const showModal = () => {
    //     setOpen(true);
    // };
    // const handleOk = () => {
    //     setOpen(false);
    // };



    return (
        <>


            {editVehicle && (

                <div className='addProductBox justify-content-center pt-5  '>
                    <div className='formBox border-circle  mt-5 pt-4 '>


                        <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                            <div className='d-flex justify-content-end'>

                                <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                    setEditVehicle(false)
                                }} />
                            </div>


                            <h1 className='text-center fs-4'>Edit Vehicle</h1>

                            <form encType='multipart/form-data' onSubmit={(event) => {
                                event.preventDefault();
                                const data = new FormData();

                                console.log(vehicleToEdit)

                                // Append each field individually to the FormData object
                                data.append('name', vehicleToEdit.name);
                                data.append('location', vehicleToEdit.location);
                                data.append('engineSize', vehicleToEdit.engineSize);
                                data.append('adults', vehicleToEdit.adults);
                                data.append('doors', vehicleToEdit.doors);
                                data.append('children', vehicleToEdit.children);
                                data.append('seats', vehicleToEdit.seats);
                                data.append('bigLuggage', vehicleToEdit.bigLuggage);
                                data.append('smallLuggage', vehicleToEdit.smallLuggage);
                                data.append('transmissionType', vehicleToEdit.transmissionType);
                                data.append('price', vehicleToEdit.price);
                                data.append('AC', vehicleToEdit.AC);
                                data.append('vehicleType', vehicleToEdit.vehicleType);
                                data.append('group', vehicleToEdit.group);
                                data.append('vehicleImage', fileList[0].originFileObj);

                                event.target.reset();

                                setEditVehicle(false);


                                axios.post(`https://my-car-backend.vercel.app/vehicle/edit-vehicle/${vehicleToEdit?._id}`, data)
                                    .then(response => {
                                        console.log(response);
                                        reGetData();

                                        toast.success("Vehicle Updated Successfully!");

                                    })
                                    .catch(error => {
                                        toast.error('Error in updating Vehicle!')
                                        console.error('Error updating vehicle', error)
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
                                    <input value={vehicleToEdit?.name} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='name' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                    <label className='mt-1'>Location :</label>
                                    <input value={vehicleToEdit?.location} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='location' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                    <label className='mt-1'>Engine Size :</label>
                                    <input value={vehicleToEdit?.engineSize} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='engineSize' type='text' className='p-1 border border-secondary border-circle mb-1' />


                                    <label className='mt-1'>Adults :</label>
                                    <input value={vehicleToEdit?.adults} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='adults' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Doors :</label>
                                    <input value={vehicleToEdit?.doors} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='doors' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Children :</label>
                                    <input value={vehicleToEdit?.children} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='children' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Seats :</label>
                                    <input value={vehicleToEdit?.seats} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='seats' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Big Luggage :</label>
                                    <input value={vehicleToEdit?.bigLuggage} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='bigLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Small Luggage :</label>
                                    <input value={vehicleToEdit?.smallLuggage} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='smallLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                    <label className='mt-1'>Transmission Type  :</label>
                                    <Select onChange={(value) => {
                                        setVehicleToEdit({ ...vehicleToEdit, transmissionType: value.value })
                                    }} name='transmissionType' styles={customStyles} options={[
                                        { value: 'Automatic', label: <div>Automatic</div> },
                                        { value: 'Manual', label: <div>Manual</div> },
                                    ]} />


                                    <label className='mt-2'>Price ($):</label>
                                    <input value={vehicleToEdit?.price} onChange={(e) => {
                                        updateVehicleData(e)
                                    }} name='price' type='number' className='p-1 border border-secondary border-circle mb-1' />
                                    <div className='my-2'>


                                        <label className='mt-1'>AC :</label>
                                        <input checked={vehicleToEdit?.AC} onChange={(e) => {
                                            setVehicleToEdit({ ...vehicleToEdit, AC: e.target.checked })
                                        }} style={{
                                            width: '18px',
                                            height: '18px'
                                        }} type='checkbox' className='m-4 border border-secondary border-circle mb-1' />
                                    </div>

                                    <label className='mt-2'>Vehicle Type  :</label>
                                    <Select onChange={(value) => {
                                        setVehicleToEdit({ ...vehicleToEdit, vehicleType: value.value })
                                    }} name='vehicleType' styles={customStyles} options={vehicleCategories} />
                                    <label className='mt-2'>Group  :</label>
                                    <Select onChange={(value) => {
                                        setVehicleToEdit({ ...vehicleToEdit, group: value.value })
                                    }} name='group' options={groups} />


                                    <div className='d-flex justify-content-center my-4'>
                                        <button style={{
                                            zIndex: '00'
                                        }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                            UPDATE
                                        </button>

                                    </div>

                                </div>
                            </form>

                        </div>


                    </div>
                </div>
            )}

            <div class={`product-card ${gridView ? '' : 'd-flex flex-row'} `}>
                <div class="product-img">

                    <div class="swiper product-img-slider">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src={vehicleData?.imageUrl} />

                            </div>

                        </div>
                    </div>
                </div>
                <div class="product-content">
                    <h5><a className='text-decoration-none cursor-pointer' >{vehicleData?.name}</a></h5>
                    <div class="price-location">
                        <div class="price">
                            <strong>${vehicleData?.price}</strong>
                        </div>
                        <div class="location">
                            <a className='text-decoration-none cursor-pointer'><i class="bi bi-geo-alt"></i>{vehicleData?.location}</a>
                        </div>
                    </div>
                    <ul class="features">
                        <li>
                            <img src={engineImg} alt />
                            Engine Size: {vehicleData?.engineSize}
                        </li>
                        <li>
                            <img width={14} src={adultImg} alt />
                            Adults: {vehicleData?.adults}
                        </li>
                        <li>
                            <img src={doorsImg} alt />
                            Doors: {vehicleData?.doors}
                        </li>
                        <li>
                            <img src={childrenImg} alt />
                            Children: {vehicleData?.children}
                        </li>
                        <li>
                            <img src={seatsImg} alt />
                            Seats: {vehicleData?.seats}
                        </li>
                        <li>
                            <img src={bigLuggageImg} alt />
                            Big Luggage: {vehicleData?.bigLuggage}
                        </li>
                        <li>
                            <img src={smallLuggageImg} alt />
                            Small Luggage: {vehicleData?.smallLuggage}
                        </li>
                        <li>
                            <img src={transmissionImg} alt />
                            Transmission: {vehicleData?.transmissionType}
                        </li>
                        {vehicleData?.AC && (

                            <li>
                                <img src={ACImg} alt />
                                AC
                            </li>
                        )}
                    </ul>

                    <div class="d-flex justify-content-end border-bottom border-secondary-subtle pb-2">
                        <AiOutlineEdit onClick={() => {
                            setVehicleToEdit(vehicleData)
                            setEditVehicle(true)
                        }} className='mx-2 fs-4 cursor-pointer productIcon' />
                        <MdOutlineDelete onClick={() => {


                            Modal.confirm({
                                title: 'Confirm',
                                content: 'Do you want to delete this vehicle ?',

                                onOk() {
                                    console.log('Deleting');
                                    axios
                                        .delete(`https://my-car-backend.vercel.app/vehicle/delete-vehicle/${vehicleData?._id}`)
                                        .then((res) => {
                                            toast.success('Vehicle deleted Successfully!');
                                            reGetData();
                                        })
                                        .catch((e) => {
                                            toast.error('Error in Deleting Vehicle! Try Again');
                                        });
                                },
                                footer: (_, { OkBtn, CancelBtn }) => (
                                    <>

                                        <CancelBtn />
                                        <OkBtn  />
                                    </>
                                ),
                            });
                        }} className='mx-2 fs-4 cursor-pointer productIcon' />


                    </div>
                </div>
            </div>
        </>
    )
}
