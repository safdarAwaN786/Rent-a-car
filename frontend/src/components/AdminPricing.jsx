import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiFillEye, AiOutlineCloseSquare, AiOutlineEdit } from 'react-icons/ai';
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
    const [editCode, setEditCode] = useState(false);
    const [codeToProcess, setCodeToProcess] = useState(null);
    const [editingCode, setEditingCode,] = useState(false);
    const [viewCode, setViewCode] = useState(false);

    const [allGroups, setAllGroups] = useState(null);



    useEffect(() => {
        axios.get('/get-codes').then((response) => {
            setLoadingCodes(false)
            setPromoCodes(response.data.data)
        }).catch(e => {
            updateCodes();
        })
    }, [])

    const updateCodes = () => {
        axios.get('/get-codes').then((response) => {
            setLoadingCodes(false)
            setPromoCodes(response.data.data)
        })
    }

    useEffect(() => {
        axios.get('read-groups').then((res) => {
            console.log(res.data);
            setAllGroups(res.data.data);
        })
    }, [])

    useEffect(() => {
        console.log(codeToSend);
    }, [codeToSend])


    const formatDate = (date) => {

        const newDate = new Date(date);
        const formatDate = newDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return formatDate;
    }
    useEffect(()=>{
        console.log(codeToProcess);
    }, [codeToProcess])

    const updateVat = () => {
        axios.get("/get-vat").then((response) => {
            setLoadingVAT(false)
            setVatValueObj(response.data[0]);
        })
    }

    useEffect(() => {
        axios.get("/get-vat").then((response) => {
            setLoadingVAT(false);
            setVatValueObj(response.data[0]);
        }).catch((e) => {
            updateVat();
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
                                        axios.post('/add-vat', { id: vatValueObj._id, value: vatValueToSend })
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
                                        axios.post(`/add-code`, codeToSend)
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
                                                    <span> (%) </span>
                                                    <input value={codeToSend?.discountPercent} onChange={(e) => {
                                                        setCodeToSend({ ...codeToSend, [e.target.name]: e.target.value });
                                                    }} type='number' name='discountPercent' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Start Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setCodeToSend({ ...codeToSend, [e.target.name]: e.target.value });
                                                    }} name='startDate' type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >End Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setCodeToSend({ ...codeToSend, [e.target.name]: e.target.value });
                                                    }} name='endDate' type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap flex-column my-1 border-circle p-3 d-flex  justify-content-between'>
                                                <label class="form-check-label w-100" >Description :</label>
                                                <div>
                                                    <textarea onChange={(e) => {
                                                        setCodeToSend({ ...codeToSend, [e.target.name]: e.target.value });
                                                    }} name='description' type='text' className='w-100 p-1  border border-secondary border-circle  mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap flex-column my-1 border-circle p-3 d-flex  justify-content-between'>
                                                <h5 class="text-center" >Select Groups to Apply Code on :</h5>
                                                {allGroups?.map((groupObj) => {
                                                    return (
                                                        <div>
                                                            <input onChange={(e) => {
                                                                let updatedGroups;
                                                                if (codeToSend?.Groups) {
                                                                    updatedGroups = [...codeToSend.Groups]
                                                                } else {
                                                                    updatedGroups = [];
                                                                }

                                                                if (e.target.checked) {
                                                                    updatedGroups.push(groupObj._id);

                                                                } else {
                                                                    updatedGroups = updatedGroups.filter(groupId => groupId != groupObj._id);
                                                                }

                                                                setCodeToSend({ ...codeToSend, Groups: updatedGroups });
                                                            }} name='description' type='checkbox' className='mx-2 pt-1' style={{
                                                                width: '20px',
                                                                height: '20px'
                                                            }} />
                                                            <p className='mb-2 d-inline fs-5'><b>{groupObj.groupName}</b></p>

                                                        </div>
                                                    )
                                                })}

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


                    {editCode && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setCodeToProcess(null);
                                            setEditCode(false);
                                        }} />
                                    </div>
                                    <h1 className='text-center my-3 fs-4'>Edit Promo Code</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        setEditingCode(true);
                                        axios.patch(`/update-code`, codeToProcess)
                                            .then(response => {
                                                console.log(response)
                                                if (response.status === 201) {
                                                    toast.error(response.data.message)
                                                } else {
                                                    toast.success("Code Updated Successfully!");
                                                }

                                                setEditingCode(false);
                                                setLoadingCodes(true);
                                                updateCodes();
                                                setEditCode(false);
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                setAddingCode(false);
                                                setAddCode(false)
                                                toast.error('Error in Updating Code, Try Again!')
                                            });
                                    }}>
                                        <div className='d-flex flex-column'>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Code :</label>
                                                <div>
                                                    <input value={codeToProcess?.code} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='code' type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>

                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Discount :</label>
                                                <div>
                                                    <span> (%) </span>
                                                    <input value={codeToProcess?.discountPercent} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} type='number' name='discountPercent' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Start Date :</label>
                                                <div>
                                                    <input value={codeToProcess.startDate} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='startDate' type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >End Date :</label>
                                                <div>
                                                    <input value={codeToProcess?.endDate} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='endDate' type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap flex-column my-1 border-circle p-3 d-flex  justify-content-between'>
                                                <label class="form-check-label w-100" >Description :</label>
                                                <div>
                                                    <textarea value={codeToProcess.description} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='description' type='text' className='w-100 p-1  border border-secondary border-circle  mb-1' required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap flex-column my-1 border-circle p-3 d-flex  justify-content-between'>
                                                <h5 class="text-center" >Groups to Apply Code on :</h5>
                                                {allGroups?.map((groupObj) => {
                                                    return (
                                                        <div>
                                                            <input checked={codeToProcess?.Groups.includes(groupObj._id)} onChange={(e) => {
                                                                let updatedGroups;
                                                                if (codeToProcess?.Groups) {
                                                                    updatedGroups = [...codeToProcess.Groups]
                                                                } else {
                                                                    updatedGroups = [];
                                                                }

                                                                if (e.target.checked) {
                                                                    updatedGroups.push(groupObj._id);

                                                                } else {
                                                                    updatedGroups = updatedGroups.filter(groupId => groupId != groupObj._id);
                                                                }

                                                                setCodeToProcess({ ...codeToProcess, Groups: updatedGroups });
                                                            }} name='description' type='checkbox' className='mx-2 pt-1' style={{
                                                                width: '20px',
                                                                height: '20px'
                                                            }} />
                                                            <p className='mb-2 d-inline fs-5'><b>{groupObj.groupName}</b></p>

                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {editingCode ? (
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

                    {viewCode && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setCodeToProcess(null);
                                            setViewCode(false);
                                        }} />
                                    </div>
                                    <h1 className='text-center my-3 fs-4'>Promo Code Details</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();

                                    }}>
                                        <div className='d-flex flex-column'>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Code :</label>
                                                <div>
                                                    <input value={codeToProcess?.code} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='code' type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' required readOnly />

                                                </div>
                                            </div>

                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Discount :</label>
                                                <div>
                                                    <span> (%) </span>
                                                    <input value={codeToProcess?.discountPercent} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} type='number' name='discountPercent' className='p-1 mx-2 border border-secondary border-circle mb-1' readOnly required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Start Date :</label>
                                                <div>
                                                    <input value={formatDate(codeToProcess.startDate)} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='startDate' type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' readOnly required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap my-1 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >End Date :</label>
                                                <div>
                                                    <input value={formatDate(codeToProcess.endDate)} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='endDate' type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' readOnly required />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap flex-column my-1 border-circle p-3 d-flex  justify-content-between'>
                                                <label class="form-check-label w-100" >Description :</label>
                                                <div>
                                                    <textarea value={codeToProcess.description} onChange={(e) => {
                                                        setCodeToProcess({ ...codeToProcess, [e.target.name]: e.target.value });
                                                    }} name='description' type='text' className='w-100 p-1  border border-secondary border-circle  mb-1' required readOnly />

                                                </div>
                                            </div>
                                            <div className='extraBox flex-wrap flex-column my-1 border-circle p-3 d-flex  justify-content-between'>
                                                <h5 class="text-center" >Groups to Apply Code on :</h5>
                                                {allGroups?.map((groupObj) => {
                                                    return (
                                                        <div>
                                                            <input checked={codeToProcess?.Groups.includes(groupObj._id)}  name='description' type='checkbox' className='mx-2 pt-1' style={{
                                                                width: '20px',
                                                                height: '20px'
                                                            }} readOnly/>
                                                            <p className='mb-2 d-inline fs-5'><b>{groupObj.groupName}</b></p>

                                                        </div>
                                                    )
                                                })}

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
                    <div className='table-Cover'>


                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>

                                    <th scope="col"># Code</th>

                                    <th scope="col">Discount</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {promoCodes?.map((codeObj, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {codeObj.code}</th>
                                            <td scope="row">{codeObj.discountPercent}%</td>
                                            <td scope="row">{formatDate(codeObj.startDate)}</td>
                                            <td scope="row">{formatDate(codeObj.endDate)}</td>


                                            <td className='d-flex justify-content-between'>
                                                <AiFillEye onClick={() => {
                                                    setViewCode(true);
                                                    setCodeToProcess(codeObj);
                                                }} className=' fs-4 cursor-pointer' />
                                                <AiOutlineEdit onClick={() => {
                                                    setEditCode(true);
                                                    setCodeToProcess(codeObj);
                                                }} className='fs-4 cursor-pointer' />
                                                <MdDelete onClick={() => {
                                                    axios.delete(`/delete-code/${codeObj._id}`).then((res) => {
                                                        setLoadingCodes(true);
                                                        updateCodes();
                                                        toast.success('Promo Code deleted successfully !')
                                                    }).catch((err) => {
                                                        toast.success('Error in Promo Code deletion, Try Again!')
                                                    })
                                                }} className='text-dark  fs-4 cursor-pointer' /></td>

                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>



                </div>
            )}
        </>
    )
}
