import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState } from 'react'

import { SlMinus, SlPlus } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { setWebContent } from '../redux/slices/webContentSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/esm/Spinner';

export default function ContactUsContent() {


    const webContent = useSelector(state => state.webContent);
    const dispatch = useDispatch();

    const [updating, setUpdating] = useState(false);




    return (
        <>
            <div className='p-3'>
                <h3 className='text-center my-2'>Edit  Contact Us Page Content</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setUpdating(true);
                    console.log(webContent);
                    axios.patch('/update-content', webContent).then((res) => {
                        toast.success('Web Content Updated Successfully!');
                        setUpdating(false);
                    }).catch(err => {
                        toast.error('Error in Updating Content, Try Again!');
                        setUpdating(false);
                    })
                }}>
                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Main Area</h4>

                        <label className='d-block w-100'><b>Main Heading : </b></label>
                        <input onChange={(e) => {
                            const editableContent = { ...webContent };
                            editableContent.contactUsPage = {
                                ...editableContent.contactUsPage,
                                mainHeading: e.target.value,
                            };
                            dispatch(setWebContent(editableContent));
                        }} className='border-circle border-1 border-dark border p-2 w-100' value={webContent?.contactUsPage?.mainHeading} required />
                        <label className='d-block w-100'><b>Main Text : </b></label>
                        <textarea onChange={(e) => {
                            const editableContent = { ...webContent };
                            editableContent.contactUsPage = {
                                ...editableContent.contactUsPage,
                                mainText: e.target.value,
                            };
                            dispatch(setWebContent(editableContent));
                        }} rows={4} className='border-circle p-2 w-100' value={webContent?.contactUsPage?.mainText} required />

                    </div>


                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Add Offices Informations</h4>

                        {webContent?.contactUsPage?.offices?.map((officeObj, index) => {
                            return (
                                <>
                                    <label className='d-block w-100'><b>{index + 1}. Office Info : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.contactUsPage = {
                                            ...editableContent.contactUsPage,
                                            offices: editableContent.contactUsPage.offices.map((item, i) =>
                                                i === index
                                                    ? { ...item, infoText: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={officeObj.infoText} required />

                                </>
                            )
                        })}




                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.contactUsPage?.offices?.length < 8 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.contactUsPage = {
                                        ...editableContent.contactUsPage,
                                        offices: [
                                            ...editableContent.contactUsPage.offices,
                                            {
                                                infoText: "",
                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.contactUsPage?.offices?.length > 4 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.contactUsPage.offices.length > 0) {
                                        editableContent.contactUsPage = {
                                            ...editableContent.contactUsPage,
                                            offices: editableContent.contactUsPage.offices.slice(0, -1),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }
                                }} className='fs-3 cursor-pointer' />
                            )}
                        </div>

                    </div>
                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Delivery Locations</h4>


                        {webContent?.contactUsPage?.devliveryLocations?.map((locationObj, index) => {
                            return (
                                <>
                                    <label className='d-block w-100'><b>{index + 1}. New Location : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.contactUsPage = {
                                            ...editableContent.contactUsPage,
                                            deliveryLocations: editableContent.contactUsPage.deliveryLocations.map((item, i) =>
                                                i === index
                                                    ? { ...item, location: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={locationObj.location} required />

                                </>
                            )
                        })}

                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.contactUsPage?.deliveryLocations?.length < 14 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.contactUsPage = {
                                        ...editableContent.contactUsPage,
                                        deliveryLocations: [
                                            ...editableContent.contactUsPage.deliveryLocations,
                                            {
                                                location: "",
                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.contactUsPage?.deliveryLocations?.length > 6 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.contactUsPage.deliveryLocations.length > 0) {
                                        editableContent.contactUsPage = {
                                            ...editableContent.contactUsPage,
                                            deliveryLocations: editableContent.contactUsPage.deliveryLocations.slice(0, -1),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }
                                }} className='fs-3 cursor-pointer' />
                            )}
                        </div>
                    </div>
                    <div className='d-flex justify-content-center my-2 '>
                        <button type="submit" class="primary-btn6  p-sm-2 p-1 " >
                            {updating ? (
                                <Spinner size='sm' />
                            ) : (
                                'UPDATE CONTENT'
                            )}
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
