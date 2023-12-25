import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { BsPlusCircle } from 'react-icons/bs';
import { SlMinus, SlPlus } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import MyDropzone from './MyDropZone';
import { setWebContent, updateBrandLogoUrl, updateChooseUsIconUrl, updateOurFleetImageUrl, updateWorkFlowIconUrl } from '../redux/slices/webContentSlice';
import uploadToCloudinary from './UploadToCloudinary';
import { toast } from 'react-toastify';
import axios from 'axios';



export default function LandingPageContent() {

    const dispatch = useDispatch();
    const webContent = useSelector(state => state.webContent);
    const contentForUpdation = webContent;
    const [updating, setUpdating] = useState(false);
    const [readyToRequest, setReadyToRequest] = useState(false);
    useEffect(() => {

        console.log(readyToRequest);
        if (readyToRequest) {

            try {
                console.log(webContent);
                axios.patch('/update-content', webContent)
                    .then((res) => {
                        toast.success('Web Content Updated Successfully!');
                        setUpdating(false);
                        setReadyToRequest(false)
                    }).catch((err) => {
                        console.log(err);
                        toast.error('Error in Updating Content, Try Again!');
                        setUpdating(false);
                        setReadyToRequest(false)
                    });
            } catch (error) {
                console.log(error);
                toast.error('OOps, Error in file Upload, Try Again By Reload!');
                setUpdating(false);
                setReadyToRequest(false)
            }
        }
    }, [webContent, readyToRequest])

    return (
        <>

            <div className='p-3'>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        setUpdating(true);

                        try {
                            const promises = [];

                            if (webContent.landingPage.File) {
                                const returnedUrl = await uploadToCloudinary(webContent.landingPage.File);
                                const editableContent = { ...webContent };
                                editableContent.landingPage = {
                                    ...editableContent.landingPage,
                                    backgroundImageUrl: returnedUrl,
                                };
                                dispatch(setWebContent(editableContent));
                            }

                            // Loop for workFlow
                            promises.push(
                                ...webContent?.landingPage.workFlow.map(async (workObj, index) => {
                                    if (workObj.File) {
                                        const returnedUrl = await uploadToCloudinary(workObj.File);
                                        dispatch(updateWorkFlowIconUrl({ index, iconUrl: returnedUrl }));

                                    }
                                })
                            );

                            // Loop for chooseUs
                            promises.push(
                                ...webContent?.landingPage.chooseUs.map(async (chooseObj, index) => {
                                    if (chooseObj.File) {
                                        const returnedUrl = await uploadToCloudinary(chooseObj.File);

                                        dispatch(updateChooseUsIconUrl({ index, iconUrl: returnedUrl }));

                                    }
                                })
                            );

                            // Loop for brands
                            promises.push(
                                ...webContent?.landingPage.brands.map(async (brandObj, index) => {
                                    if (brandObj.File) {
                                        const returnedUrl = await uploadToCloudinary(brandObj.File);

                                        dispatch(updateBrandLogoUrl({ index, logoUrl: returnedUrl }));
                                    } else {
                                        console.log('No file detected at -> ' + index)
                                    }
                                })
                            );

                            // Loop for ourFleet
                            promises.push(
                                ...webContent?.landingPage.ourFleet.map(async (fleetObj, index) => {
                                    if (fleetObj.File) {
                                        const returnedUrl = await uploadToCloudinary(fleetObj.File);

                                        dispatch(updateOurFleetImageUrl({ index, imageUrl: returnedUrl }));

                                    }
                                })
                            );

                            // Wait for all promises to resolve before making the axios request
                            await Promise.all(promises);

                            // Now all loops are complete, and you can make the axios request
                            console.log('Promises completed')
                            setReadyToRequest(true)
                        } catch (err) {
                            console.log(err);
                            setUpdating(false)
                            toast.error('OOps, Try Again!')
                        }
                    }}
                >


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
                                    <input className='border-circle border-1 border-dark border mb-4 p-2 w-100' onChange={(e) => {
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
