import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { BsPlusCircle } from 'react-icons/bs';
import { SlMinus, SlPlus } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import MyDropzone from './MyDropZone';
import { setWebContent } from '../redux/slices/webContentSlice';
import uploadToCloudinary from './UploadToCloudinary';
import { toast } from 'react-toastify';
import axios from 'axios';



export default function LandingPageContent() {

    const dispatch = useDispatch();
    const webContent = useSelector(state => state.webContent);

    const [updating, setUpdating] = useState(false);



    return (
        <>

            <div className='p-3'>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(webContent)
                    setUpdating(true);

                    if (webContent.landingPage.File) {
                        console.log('Have file found');
                        try {
                            const returnedUrl = await uploadToCloudinary(webContent.landingPage.File);
                            console.log(returnedUrl)
                            const editableContent = { ...webContent };
                            editableContent.landingPage = {
                                ...editableContent.landingPage,
                                backgroundImageUrl: returnedUrl,
                            };
                            dispatch(setWebContent(editableContent));
                        } catch (error) {
                            console.log(error)
                            toast.error('OOps, Error in file Upload, Try Again By Reload!');
                            setUpdating(false);
                        }
                    }

                    for (let index = 0; index < webContent?.landingPage.workFlow.length; index++) {
                        const workObj = webContent?.landingPage.workFlow[index];
                        if (workObj.File) {
                            try {
                                const returnedUrl = await uploadToCloudinary(workObj.File);
                                const editableContent = { ...webContent };
                                editableContent.landingPage = {
                                    ...editableContent.landingPage,
                                    workFlow: editableContent.landingPage.workFlow.map((item, i) =>
                                        i === index
                                            ? { ...item, iconUrl: returnedUrl }
                                            : item
                                    ),
                                };
                                dispatch(setWebContent(editableContent));
                            } catch (error) {
                                console.log(error)
                                toast.error('OOps, Error in file Upload, Try Again By Reload!');
                                setUpdating(false);
                            }
                        }

                    }


                    for (let index = 0; index < webContent?.landingPage.chooseUs.length; index++) {
                        const chooseObj = webContent?.landingPage.chooseUs[index];
                        if (chooseObj.File) {
                            try {
                                const returnedUrl = await uploadToCloudinary(chooseObj.File);
                                const editableContent = { ...webContent };
                                editableContent.landingPage = {
                                    ...editableContent.landingPage,
                                    chooseUs: editableContent.landingPage.chooseUs.map((item, i) =>
                                        i === index
                                            ? { ...item, iconUrl: returnedUrl }
                                            : item
                                    ),
                                };
                                dispatch(setWebContent(editableContent));
                            } catch (error) {
                                console.log(error)
                                toast.error('OOps, Error in file Upload, Try Again By Reload!');
                                setUpdating(false);
                            }
                        }

                    }


                    for (let index = 0; index < webContent?.landingPage.brands.length; index++) {
                        const brandObj = webContent?.landingPage.brands[index];
                        if (brandObj.File) {
                            try {
                                const returnedUrl = await uploadToCloudinary(brandObj.File);
                                const editableContent = { ...webContent };
                                editableContent.landingPage = {
                                    ...editableContent.landingPage,
                                    brands: editableContent.landingPage.brands.map((item, i) =>
                                        i === index
                                            ? { ...item, logoUrl: returnedUrl }
                                            : item
                                    ),
                                };
                                dispatch(setWebContent(editableContent));
                            } catch (error) {
                                console.log(error)
                                toast.error('OOps, Error in file Upload, Try Again By Reload!');
                                setUpdating(false);
                            }
                        }

                    }


                    for (let index = 0; index < webContent?.landingPage.ourFleet.length; index++) {
                        const fleetObj = webContent?.landingPage.ourFleet[index];
                        if (fleetObj.File) {
                            try {
                                const returnedUrl = await uploadToCloudinary(fleetObj.File);
                                const editableContent = { ...webContent };
                                editableContent.landingPage = {
                                    ...editableContent.landingPage,
                                    ourFleet: editableContent.landingPage.ourFleet.map((item, i) =>
                                        i === index
                                            ? { ...item, imageUrl: returnedUrl }
                                            : item
                                    ),
                                };
                                dispatch(setWebContent(editableContent));
                            } catch (error) {
                                console.log(error)
                                toast.error('OOps, Error in file Upload, Try Again By Reload!');
                                setUpdating(false);
                            }
                        }

                    }

                    console.log(webContent)
                    axios.patch('/update-content', webContent).then((res) => {
                        toast.success('Web Content Updated Successfully!');
                        setUpdating(false);
                    }).catch(err => {
                        console.log(err)
                        toast.error('Error in Updating Content, Try Again!');
                        setUpdating(false);
                    })


                }}>
                    <h3 className='text-center my-2'>Edit  Landing Page Content</h3>

                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>First Impression</h4>
                        <label><b>Background Image : </b></label>


                        <MyDropzone initialImageLink={webContent?.landingPage?.backgroundImageUrl} onFileUpload={(file) => {
                            const editableContent = { ...webContent };
                            editableContent.landingPage = {
                                ...editableContent.landingPage,
                                File: file,
                            };
                            dispatch(setWebContent(editableContent));
                        }} />

                        <label className='d-block w-100'><b>Heading : </b></label>
                        <input onChange={(e) => {
                            const editableContent = { ...webContent };
                            editableContent.landingPage = {
                                ...editableContent.landingPage,
                                mainHeading: e.target.value,
                            };
                            dispatch(setWebContent(editableContent));
                        }} className='border-circle border-1 border-dark border p-2 w-100' value={webContent?.landingPage?.mainHeading} required />
                        <label className='d-block w-100'><b>Text : </b></label>
                        <textarea onChange={(e) => {
                            const editableContent = { ...webContent };
                            editableContent.landingPage = {
                                ...editableContent.landingPage,
                                mainText: e.target.value,
                            };
                            dispatch(setWebContent(editableContent));
                        }} rows={4} className='border-circle p-2 w-100' value={webContent?.landingPage?.mainText} required />

                    </div>



                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>How does it work?</h4>

                        {webContent?.landingPage?.workFlow?.map((workObj, index) => {
                            return (
                                <>

                                    <label><b>0{index + 1}. Upload New Icon : </b></label>
                                    <MyDropzone initialImageLink={workObj.iconUrl} onFileUpload={(file) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            workFlow: editableContent.landingPage.workFlow.map((item, i) =>
                                                i === index
                                                    ? { ...item, File: file }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} />
                                    <label className='d-block w-100'><b>{index + 1}. Heading : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            workFlow: editableContent.landingPage.workFlow.map((item, i) =>
                                                i === index
                                                    ? { ...item, heading: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={workObj.heading} required />
                                    <label className='d-block w-100'><b>{index + 1}. Text : </b></label>
                                    <textarea onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            workFlow: editableContent.landingPage.workFlow.map((item, i) =>
                                                i === index
                                                    ? { ...item, text: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} rows={4} className='border-circle p-2 w-100' value={workObj.text} required />
                                </>
                            )
                        })}

                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.landingPage?.workFlow?.length < 8 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.landingPage = {
                                        ...editableContent.landingPage,
                                        workFlow: [
                                            ...editableContent.landingPage.workFlow,
                                            {
                                                iconUrl: "",
                                                heading: "",
                                                text: "",
                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.landingPage?.workFlow?.length > 4 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.landingPage.workFlow.length > 0) {
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            workFlow: editableContent.landingPage.workFlow.slice(0, -1),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }
                                }} className='fs-3 cursor-pointer' />
                            )}
                        </div>

                    </div>


                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Why choose us?</h4>
                        {webContent?.landingPage?.chooseUs?.map((chooseObj, index) => {
                            return (
                                <>
                                    <label><b>{index + 1}. Upload New Icon : </b></label>
                                    <MyDropzone initialImageLink={chooseObj.iconUrl} onFileUpload={(file) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            chooseUs: editableContent.landingPage.chooseUs.map((item, i) =>
                                                i === index
                                                    ? { ...item, File: file }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} />
                                    <label className='d-block w-100'><b>{index + 1}. Heading : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            chooseUs: editableContent.landingPage.chooseUs.map((item, i) =>
                                                i === index
                                                    ? { ...item, heading: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={chooseObj.heading} required />
                                    <label className='d-block w-100'><b>{index + 1}. Text : </b></label>
                                    <textarea onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            chooseUs: editableContent.landingPage.chooseUs.map((item, i) =>
                                                i === index
                                                    ? { ...item, text: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} rows={4} className='border-circle p-2 w-100' value={chooseObj.text} required />
                                </>
                            )
                        })}



                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.landingPage?.chooseUs?.length < 14 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.landingPage = {
                                        ...editableContent.landingPage,
                                        chooseUs: [
                                            ...editableContent.landingPage.chooseUs,
                                            {
                                                iconUrl: "",
                                                heading: "",
                                                text: "",
                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.landingPage?.chooseUs?.length > 6 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.landingPage.chooseUs.length > 0) {
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            chooseUs: editableContent.landingPage.chooseUs.slice(0, -1),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }
                                }} className='fs-3 cursor-pointer' />
                            )}
                        </div>
                    </div>


                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Trusted Brands</h4>


                        {webContent?.landingPage?.brands?.map((brandObj, index) => {
                            return (
                                <>
                                    <label><b>{index + 1}. Upload New Brand Logo : </b></label>
                                    <MyDropzone initialImageLink={brandObj.logoUrl} onFileUpload={(file) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            brands: editableContent.landingPage.brands.map((item, i) =>
                                                i === index
                                                    ? { ...item, File: file }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} />
                                    <label className='d-block w-100'><b>{index + 1}. Brand Name : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            brands: editableContent.landingPage.brands.map((item, i) =>
                                                i === index
                                                    ? { ...item, brandName: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={brandObj.brandName} required />

                                </>
                            )
                        })}

                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.landingPage?.brands?.length < 20 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.landingPage = {
                                        ...editableContent.landingPage,
                                        brands: [
                                            ...editableContent.landingPage.brands,
                                            {
                                                logoUrl: "",
                                                brandName: "",

                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.landingPage?.brands?.length > 6 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.landingPage.brands.length > 0) {
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            brands: editableContent.landingPage.brands.slice(0, -1),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }
                                }} className='fs-3 cursor-pointer' />
                            )}
                        </div>
                    </div>

                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Our Fleet</h4>
                        {webContent?.landingPage?.ourFleet?.map((fleetObj, index) => {
                            return (
                                <>
                                    <label><b>{index + 1}. Upload New Image : </b></label>
                                    <MyDropzone initialImageLink={fleetObj.imageUrl} onFileUpload={(file) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            ourFleet: editableContent.landingPage.ourFleet.map((item, i) =>
                                                i === index
                                                    ? { ...item, File: file }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} />
                                    <label className='d-block w-100'><b>{index + 1}. Title : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            ourFleet: editableContent.landingPage.ourFleet.map((item, i) =>
                                                i === index
                                                    ? { ...item, title: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={fleetObj.title} required />
                                    <label className='d-block w-100'><b>{index + 1}. Text : </b></label>
                                    <textarea onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            ourFleet: editableContent.landingPage.ourFleet.map((item, i) =>
                                                i === index
                                                    ? { ...item, text: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} rows={4} className='border-circle p-2 w-100' value={fleetObj.text} required />

                                </>
                            )
                        })}

                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.landingPage?.ourFleet?.length < 10 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.landingPage = {
                                        ...editableContent.landingPage,
                                        ourFleet: [
                                            ...editableContent.landingPage.ourFleet,
                                            {
                                                imageUrl: "",
                                                title: "",
                                                text: "",
                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.landingPage?.ourFleet?.length > 4 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.landingPage.ourFleet.length > 0) {
                                        editableContent.landingPage = {
                                            ...editableContent.landingPage,
                                            ourFleet: editableContent.landingPage.ourFleet.slice(0, -1),
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
