import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'

export default function AdminPricing() {
    const [vatValueObj, setVatValueObj] = useState(null);
    const [changeVat, setChangeVat] = useState(false);
    const [changingVat, setChangingVat] = useState(false)
    const [loadingVAT, setLoadingVAT] = useState(true);
    const [vatValueToSend, setVatValueToSend] = useState(null);
    const [promoCodes, setPromoCodes] = useState(null);
    const [addCode, setAddCode] = useState(false);
    const [codeToSend, setCodeToSend] = useState(null);
    const [addingCode, setAddingCode] = useState(false);
    const [loadingCodes, setLoadingCodes] = useState(true);

    useEffect(() => {
        axios.get('/promo-code/get-codes').then((response) => {
            setLoadingCodes(false)
            setPromoCodes(response.data.data)
        })
    }, [])

    const updateCodes = () => {
        axios.get('/promo-code/get-codes').then((response) => {
            setLoadingCodes(false)
            setPromoCodes(response.data.data)
        })
    }





    const updateVat = () => {
        axios.get("/vat/get-vat").then((response) => {
            setLoadingVAT(false)
            setVatValueObj(response.data[0]);
        })
    }

    useEffect(() => {
        axios.get("/vat/get-vat").then((response) => {
            setLoadingVAT(false);
            setVatValueObj(response.data[0]);
        })
    }, [])


    return (
        <>
            {loadingVAT || loadingCodes ? (
                <div style={{
                    height: '200px'
                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (
                <div className='p-3'>
                    <h3 className='text-center my-3'>VAT</h3>
                    {changeVat && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setVatValueToSend(null);
                                            setChangeVat(false);
                                        }} />
                                    </div>
                                    <h1 className='text-center my-3 fs-4'>Change VAT (Value Added as Tax)</h1>
                                    <div className='d-flex mx-2 justify-content-between '>
                                        <span>Current VAT Percentage : </span>
                                        <span>{vatValueObj?.value}%</span>
                                    </div>
                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        setChangingVat(true);
                                        axios.post('/vat/add-vat', { id: vatValueObj._id, value: vatValueToSend })
                                            .then(response => {
                                                setChangingVat(false);
                                                setLoadingVAT(true);
                                                updateVat();
                                                setChangeVat(false);
                                                toast.success("VAT Updated Successfully!");
                                            })
                                            .catch(error => {
                                                setChangingVat(false);
                                                setChangeVat(false)
                                                toast.error('Error in Updating VAT, Try Again!')
                                            });
                                    }}>
                                        <div className='d-flex flex-column'>
                                            <div className='extraBox flex-wrap my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >New VAT Value :</label>
                                                <div>
                                                    <input value={vatValueToSend} onChange={(e) => {
                                                        setVatValueToSend(e.target.value);
                                                    }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                    <span> (%) </span>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {changingVat ? (
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


                    {addCode && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setCodeToSend(null);
                                            setAddCode(false);
                                        }} />
                                    </div>
                                    <h1 className='text-center my-3 fs-4'>Add New Promo Code</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        setAddingCode(true);
                                        axios.post(`/promo-code/add-code`, codeToSend)
                                            .then(response => {
                                                console.log(response)
                                                if (response.status === 201) {
                                                    toast.error(response.data.message)
                                                } else {
                                                    toast.success("Code Added Successfully!");
                                                }

                                                setAddingCode(false);
                                                setLoadingCodes(true);
                                                updateCodes();
                                                setAddCode(false);
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                setAddingCode(false);
                                                setAddCode(false)
                                                toast.error('Error in Adding Code, Try Again!')
                                            });
                                    }}>
                                        <div className='d-flex flex-column'>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Code :</label>
                                                <div>
                                                    <input value={codeToSend?.code} onChange={(e) => {
                                                        setCodeToSend({ ...codeToSend, [e.target.name]: e.target.value });
                                                    }} name='code' type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>

                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Discount :</label>
                                                <div>
                                                    <input value={codeToSend?.discountPercent} onChange={(e) => {
                                                        setCodeToSend({ ...codeToSend, [e.target.name]: e.target.value });
                                                    }} type='number' name='discountPercent' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                    <span> (%) </span>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {addingCode ? (
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


                    <div className='bg-dark p-3 text-white border-circle d-flex justify-content-between '>
                        <div>
                            VAT value :
                        </div>
                        <div>
                            <span><b>{vatValueObj?.value}%</b></span>
                            <button className='mx-2 p-1 border-circle' onClick={() => {
                                setChangeVat(true);
                            }}>Change</button>
                        </div>
                    </div>
                    <hr></hr>
                    <h3 className='text-center my-3'>Promo Codes</h3>

                    <div className='d-flex mt-3 p-3 justify-content-end'>
                        <button onClick={() => {
                            setAddCode(true)
                        }} className='btn btn-dark'><IoMdAdd className='text-white fs-4' /></button>
                    </div>
                    <div className='d-flex px-3 mt-2 justify-content-between'>
                        <span><b>Code</b></span>
                        <span><b>Discount</b> </span>
                    </div>
                    <hr></hr>
                    {promoCodes?.map((codeObj) => {
                        return (
                            <div className='d-flex bg-secondary py-2 border-circle text-white px-3 my-1 justify-content-between'>
                                <span><b>{codeObj.code}</b></span>
                                <span><b className='me-2'>{codeObj.discountPercent}%</b><MdDelete onClick={() => {
                                    axios.delete(`promo-code/delete-code/${codeObj._id}`).then((res) => {
                                        setLoadingCodes(true);
                                        updateCodes();
                                        toast.success('Promo Code deleted successfully !')
                                    }).catch((err) => {
                                        toast.success('Error in Promo Code deletion, Try Again!')
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
