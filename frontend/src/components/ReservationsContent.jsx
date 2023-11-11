import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setWebContent } from '../redux/slices/webContentSlice';
import MyDropzone from './MyDropZone';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/esm/Spinner';
import uploadToCloudinary from './UploadToCloudinary';

export default function ReservationsContent() {

    const webContent = useSelector(state => state.webContent);
    const dispatch = useDispatch();
    const [updating, setUpdating] = useState(false);
    return (
        <>
            <div className='p-3'>
                <h3 className='text-center my-2'>Edit  Reservations Page Content</h3>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setUpdating(true);
                    if (webContent.reservationsPage.File) {
                        console.log('Have file found');
                        try {
                            const returnedUrl = await uploadToCloudinary(webContent.reservationsPage.File);
                            console.log(returnedUrl)
                            const editableContent = { ...webContent };
                            editableContent.reservationsPage = {
                                ...editableContent.reservationsPage,
                                backgroundImageUrl: returnedUrl,
                            };
                            dispatch(setWebContent(editableContent));
                        } catch (error) {
                            console.log(error)
                            toast.error('OOps, Error in file Upload, Try Again By Reload!');
                            setUpdating(false);
                        }
                    }
                    console.log(webContent);
                    axios.patch('/update-content', webContent).then((res) => {
                        toast.success('Web Content Updated Successfully!');
                        setUpdating(false);
                    }).catch(err => {
                        console.log(err);
                        toast.error('Error in Updating Content, Try Again!');
                        setUpdating(false);
                    })
                }}>

                    <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
                        <h4 className='text-center my-2'>Impression Section</h4>
                        <label><b>Background Image : </b></label>
                        <MyDropzone initialImageLink={webContent?.reservationsPage?.backgroundImageUrl} onFileUpload={(file) => {
                            const editableContent = { ...webContent };
                            editableContent.reservationsPage = {
                                ...editableContent.reservationsPage,
                                File: file,
                            };
                            dispatch(setWebContent(editableContent));
                        }} />
                        <label className='d-block w-100'><b>Heading : </b></label>
                        <input onChange={(e) => {
                            const editableContent = { ...webContent };
                            editableContent.reservationsPage = {
                                ...editableContent.reservationsPage,
                                mainHeading: e.target.value,
                            };
                            dispatch(setWebContent(editableContent));
                        }} className='border-circle border-1 border-dark border p-2 w-100' value={webContent?.reservationsPage?.mainHeading} required />
                        <label className='d-block w-100'><b>Text : </b></label>
                        <textarea onChange={(e) => {
                            const editableContent = { ...webContent };
                            editableContent.reservationsPage = {
                                ...editableContent.reservationsPage,
                                mainText: e.target.value,
                            };
                            dispatch(setWebContent(editableContent));
                        }} rows={4} className='border-circle p-2 w-100' value={webContent?.reservationsPage?.mainText} required />

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
