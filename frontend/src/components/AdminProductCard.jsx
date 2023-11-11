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
import Spinner from 'react-bootstrap/esm/Spinner'
import { useSelector } from 'react-redux'

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function AdminProductCard({ gridView, groupData, reGetData }) {
    const [groupToEdit, setGroupToEdit] = useState(null);
    const [editGroup, setEditGroup] = useState(false);
    const [editingGroup, setEditingGroup] = useState(false);
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

    const currentSeason = useSelector(state => state.currentSeason);
    const groupCategories = [
        { value: 'Saloon Manual Transmission', label: <div>Saloon Manual Transmission</div> },
        { value: 'Saloon Automatic Transmission', label: <div>Saloon Automatic Transmission</div> },
        { value: 'Cabrio/Open Top', label: <div>Cabrio/Open Top</div> },
        { value: 'People Carrier', label: <div>People Carrier</div> },
        { value: 'SUV/4WD', label: <div>SUV/4WD</div> },

    ]


    useEffect(() => {
        console.log(groupToEdit);
    }, [groupToEdit])

    const updateGroupData = (e) => {
        setGroupToEdit({ ...groupToEdit, [e.target.name]: e.target.value })
    }


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            url: groupData?.imageUrl
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







    return (
        <>


            {editGroup && (

                <div className='addProductBox justify-content-center pt-5  '>
                    <div className='formBox border-circle  mt-5 pt-4 '>


                        <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                            <div className='d-flex justify-content-end'>

                                <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                    setEditGroup(false);
                                }} />
                            </div>


                            <h1 className='text-center fs-4'>Edit Group Details</h1>

                            <form encType='multipart/form-data' onSubmit={(event) => {
                                event.preventDefault();
                                setEditingGroup(true);
                                const data = new FormData();

                                console.log(groupToEdit)

                                // Append each field individually to the FormData object
                                data.append('groupName', groupToEdit.groupName);
                                data.append('GroupName', groupToEdit.GroupName);

                                data.append('engineSize', groupToEdit.engineSize);
                                data.append('adults', groupToEdit.adults);
                                data.append('doors', groupToEdit.doors);
                                data.append('children', groupToEdit.children);
                                data.append('seats', groupToEdit.seats);
                                data.append('bigLuggage', groupToEdit.bigLuggage);
                                data.append('smallLuggage', groupToEdit.smallLuggage);
                                data.append('transmissionType', groupToEdit.transmissionType);

                                data.append('AC', groupToEdit.AC);
                                data.append('groupCategory', groupToEdit.groupCategory);

                                data.append('GroupImage', fileList[0].originFileObj);





                                axios.post(`/edit-group/${groupToEdit?._id}`, data)
                                    .then(response => {
                                        setEditGroup(false);
                                        setEditingGroup(false)
                                        console.log(response);
                                        reGetData();

                                        toast.success("Group Updated Successfully!");

                                    })
                                    .catch(error => {
                                        toast.error('Error in updating Group!')
                                        console.error('Error updating Group', error)
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
                                    <input value={groupToEdit?.groupName} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='groupName' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Vehicle Name :</label>
                                    <input value={groupToEdit?.vehicleName} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='vehicleName' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Engine Size :</label>
                                    <input value={groupToEdit?.engineSize} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='engineSize' type='text' className='p-1 border border-secondary border-circle mb-1' />


                                    <label className='mt-1'>Adults :</label>
                                    <input value={groupToEdit?.adults} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='adults' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Doors :</label>
                                    <input value={groupToEdit?.doors} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='doors' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Children :</label>
                                    <input value={groupToEdit?.children} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='children' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Seats :</label>
                                    <input value={groupToEdit?.seats} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='seats' type='number' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Big Luggage :</label>
                                    <input value={groupToEdit?.bigLuggage} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='bigLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />

                                    <label className='mt-1'>Small Luggage :</label>
                                    <input value={groupToEdit?.smallLuggage} onChange={(e) => {
                                        updateGroupData(e)
                                    }} name='smallLuggage' type='text' className='p-1 border border-secondary border-circle mb-1' />
                                    <label className='mt-1'>Transmission Type  :</label>
                                    <Select onChange={(value) => {
                                        setGroupToEdit({ ...groupToEdit, transmissionType: value.value })
                                    }} name='transmissionType' styles={customStyles} options={[
                                        { value: 'Automatic', label: <div>Automatic</div> },
                                        { value: 'Manual', label: <div>Manual</div> },
                                    ]} />



                                    <div className='my-2'>


                                        <label className='mt-1'>AC :</label>
                                        <input checked={groupToEdit?.AC} onChange={(e) => {
                                            setGroupToEdit({ ...groupToEdit, AC: e.target.checked })
                                        }} style={{
                                            width: '18px',
                                            height: '18px'
                                        }} type='checkbox' className='m-4 border border-secondary border-circle mb-1' />
                                    </div>

                                    <label className='mt-2'>Group Type  :</label>
                                    <Select onChange={(value) => {
                                        setGroupToEdit({ ...groupToEdit, groupCategory: value.value })
                                    }} name='groupCategory' styles={customStyles} options={groupCategories} />



                                    <div className='d-flex justify-content-center my-4'>
                                        <button style={{
                                            zIndex: '00'
                                        }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                            {editingGroup ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (

                                                'UPDATE'
                                            )}

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
                                <img src={groupData?.imageUrl} />

                            </div>

                        </div>
                    </div>
                </div>
                <div class="product-content">
                    <p className='fs-5 mb-0'>Group - <b>{groupData?.groupName}</b></p>
                    <h5><a className='text-decoration-none cursor-pointer fs-5' >{groupData?.vehicleName}</a> | <span>or similar</span></h5>
                    <div class="price-location">
                        <div class="price">
                            <strong>€{currentSeason ? groupData[currentSeason]['1to2daysPrice'] : groupData.winterPrices['1to2daysPrice']}</strong>
                        </div>


                    </div>
                    <ul class="features">
                        <li>
                            <img src={engineImg} alt />
                            Engine Size: {groupData?.engineSize}
                        </li>
                        <li>
                            <img width={14} src={adultImg} alt />
                            Adults: {groupData?.adults}
                        </li>
                        <li>
                            <img src={doorsImg} alt />
                            Doors: {groupData?.doors}
                        </li>
                        <li>
                            <img src={childrenImg} alt />
                            Children: {groupData?.children}
                        </li>
                        <li>
                            <img src={seatsImg} alt />
                            Seats: {groupData?.seats}
                        </li>
                        <li>
                            <img src={bigLuggageImg} alt />
                            Big Luggage: {groupData?.bigLuggage}
                        </li>
                        <li>
                            <img src={smallLuggageImg} alt />
                            Small Luggage: {groupData?.smallLuggage}
                        </li>
                        <li>
                            <img src={transmissionImg} alt />
                            Transmission: {groupData?.transmissionType}
                        </li>
                        {groupData?.AC && (

                            <li>
                                <img src={ACImg} alt />
                                AC
                            </li>
                        )}
                    </ul>

                    <div class="d-flex justify-content-end border-bottom border-secondary-subtle pb-2">
                        <AiOutlineEdit onClick={() => {
                            setGroupToEdit(groupData)
                            setEditGroup(true)
                        }} className='mx-2 fs-4 cursor-pointer productIcon' />
                        <MdOutlineDelete onClick={() => {


                            Modal.confirm({
                                title: 'Confirm',
                                content: 'Do you want to delete this Group ?',

                                onOk() {
                                    console.log('Deleting');
                                    axios
                                        .delete(`/delete-group/${groupData?._id}`)
                                        .then((res) => {
                                            toast.success('Group deleted Successfully!');
                                            reGetData();
                                        })
                                        .catch((e) => {
                                            toast.error('Error in Deleting Group! Try Again');
                                        });
                                },
                                footer: (_, { OkBtn, CancelBtn }) => (
                                    <>

                                        <CancelBtn />
                                        <OkBtn />
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
