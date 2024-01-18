import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'

export default function AdminPricing() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(null);
    const [addCategory, setAddCategory] = useState(false);
    const [addingCategory, setAddingCategory] = useState(false);



    useEffect(() => {
        axios.get('/read-categories').then((response) => {
            setLoading(false)
            setCategories(response.data.data)
        })
    }, [])

    const updateCategories = () => {
        axios.get('/read-categories').then((response) => {
            setLoading(false)
            setCategories(response.data.data)
        })
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
                <div className='p-3'>
                    <h3 className='text-center my-3'>VAT</h3>



                    {addCategory && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setAddCategory(false);
                                        }} />
                                    </div>
                                    <h1 className='text-center my-3 fs-4'>Add New Group Category</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        setAddingCategory(true);
                                        const dataToSend = new FormData(event.target);
                                        axios.post(`/add-category`, dataToSend)
                                            .then(response => {
                                                console.log(response)
                                                toast.success("Category Added Successfully!");
                                                setAddingCategory(false);
                                                setLoading(true);
                                                updateCategories();
                                                setAddCategory(false);
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                setAddingCategory(false);

                                                toast.error('Error in Adding Category, Try Again!')
                                            });
                                    }}>
                                        <div className='d-flex flex-column'>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Category Name :</label>
                                                <div>
                                                    <input name='categoryName' type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>


                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {addingCategory ? (
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







                    <h3 className='text-center my-3'>Group Categories</h3>

                    <div className='d-flex mt-3 p-3 justify-content-end'>
                        <button onClick={() => {
                            setAddCategory(true)
                        }} className='btn btn-dark'><IoMdAdd className='text-white fs-4' /></button>
                    </div>
                    <div className='d-flex px-3 mt-2 justify-content-between'>
                        <span><b>Category Name</b></span>
                        <span><b>Action</b></span>

                    </div>
                    <hr></hr>
                    {categories?.map((category) => {
                        return (
                            <div className='d-flex bg-secondary py-2 border-circle text-white px-3 my-1 justify-content-between'>
                                <span><b>{category.categoryName}</b></span>
                                <span><MdDelete onClick={() => {
                                    axios.delete(`/delete-category/${category._id}`).then((res) => {
                                        setLoading(true);
                                        updateCategories();
                                        toast.success('Group Category deleted successfully !')
                                    }).catch((err) => {
                                        setLoading(false);
                                        toast.success('Error in Group Category deletion, Try Again!')
                                    })
                                }} className='text-white mx-1 fs-4 cursor-pointer' /></span>
                            </div>
                        )
                    })}

                </div>
            )}
        </>
    )
}
