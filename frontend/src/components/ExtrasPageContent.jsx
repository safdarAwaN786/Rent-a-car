import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState } from 'react'

import { SlMinus, SlPlus } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { setWebContent } from '../redux/slices/webContentSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/esm/Spinner';

export default function ExtrasPageContent() {


    const webContent = useSelector(state => state.webContent);
    const dispatch = useDispatch();

    const [updating, setUpdating] = useState(false);




    return (
        <>
            <div className='p-3'>
                <h3 className='text-center my-2'>Edit  Extras Page Content</h3>
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
                        <h4 className='text-center my-2'>Add FAQ's</h4>

                        {webContent?.extrasPage?.faqs?.map((faqObj, index) => {
                            return (
                                <div className='my-4'>
                                    <label className='d-block w-100'><b>{index + 1}. Question : </b></label>
                                    <input className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.extrasPage = {
                                            ...editableContent.extrasPage,
                                            faqs: editableContent.extrasPage.faqs.map((item, i) =>
                                                i === index
                                                    ? { ...item, question: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={faqObj.question} required />
                                    <label className='d-block w-100'><b>{index + 1}. Answer : </b></label>
                                    <textarea className='border-circle border-1 border-dark border p-2 w-100' onChange={(e) => {
                                        const editableContent = { ...webContent };
                                        editableContent.extrasPage = {
                                            ...editableContent.extrasPage,
                                            faqs : editableContent.extrasPage.faqs.map((item, i) =>
                                                i === index
                                                    ? { ...item, answer: e.target.value }
                                                    : item
                                            ),
                                        };
                                        dispatch(setWebContent(editableContent));
                                    }} value={faqObj.answer} required />

                                </div>
                            )
                        })}

                        <div className='my-2 px-lg-4 px-2 d-flex justify-content-between'>
                            {webContent?.extrasPage?.faqs?.length < 15 && (
                                <SlPlus onClick={() => {
                                    const editableContent = { ...webContent };
                                    editableContent.extrasPage = {
                                        ...editableContent.extrasPage,
                                       faqs: [
                                            ...editableContent.extrasPage.faqs,
                                            {
                                                question: "",
                                                answer: "",
                                            },
                                        ],
                                    };
                                    dispatch(setWebContent(editableContent));
                                }} className='fs-3 cursor-pointer' />
                            )}
                            {webContent?.extrasPage?.faqs?.length > 1 && (
                                <SlMinus onClick={() => {
                                    const editableContent = { ...webContent };
                                    if (editableContent.extrasPage.faqs.length > 0) {
                                        editableContent.extrasPage = {
                                            ...editableContent.extrasPage,
                                            faqs: editableContent.extrasPage.faqs.slice(0, -1),
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
