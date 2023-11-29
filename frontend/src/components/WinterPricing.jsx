import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import Select from 'react-select';
import { toast } from 'react-toastify';


export default function WinterPricing() {

    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState(null);
    const [editPrices, setEditPrices] = useState(false);
    const [groupToProcess, setGroupToProcess] = useState(null);
    const [editingPrices, setEditingPrices] = useState(false);


    const updateData = () => {
        axios.get('/read-groups').then((response) => {
            setGroups(response.data.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get('/read-groups').then((response) => {
            setGroups(response.data.data);
            setLoading(false);
        }).catch((err) => {
            updateData();
        })
    })

   



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
                    <h3 className='text-center'> Winter Prices</h3>


                    {editPrices && (


                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>


                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>

                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {

                                            setEditPrices(false);
                                            setGroupToProcess(null);
                                        }} />
                                    </div>


                                    <h1 className='text-center fs-4'>Edit Winter Prices for : {groupToProcess.groupName}</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        setEditingPrices(true);

                                        console.log(groupToProcess);
                                        axios.patch('/update-seasons', groupToProcess)
                                            .then(response => {
                                                setEditingPrices(false);
                                                setEditPrices(false);
                                                setGroupToProcess(null);
                                                updateData();
                                                toast.success("Prices Updated Successfully!");

                                            }).catch(error => {
                                                setEditingPrices(false);
                                                toast.error('Error in Updating Prices!')
                                                console.error('Error updating Pricing', error)
                                            });


                                    }}>


                                        <div className='d-flex flex-column'>



                                          
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >1-6 Days Price :</label>
                                                <div><span>€</span>
                                                    <input value={groupToProcess.winterPrices['3to6daysPrice']} onChange={(e) => {

                                                        setGroupToProcess({
                                                            ...groupToProcess,
                                                            winterPrices: {
                                                                ...groupToProcess.winterPrices,
                                                                ['1to6daysPrice']: e.target.value
                                                            }
                                                        });

                                                    }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >7-14 Days Price :</label>
                                                <div><span>€</span>
                                                    <input value={groupToProcess.winterPrices['7to14daysPrice']} onChange={(e) => {

                                                        setGroupToProcess({
                                                            ...groupToProcess,
                                                            winterPrices: {
                                                                ...groupToProcess.winterPrices,
                                                                ['7to14daysPrice']: e.target.value
                                                            }
                                                        });

                                                    }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>

                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >15+ Days Price :</label>
                                                <div><span>€</span>
                                                    <input value={groupToProcess.winterPrices['15plusDaysPrice']} onChange={(e) => {

                                                        setGroupToProcess({
                                                            ...groupToProcess,
                                                            winterPrices: {
                                                                ...groupToProcess.winterPrices,
                                                                ['15plusDaysPrice']: e.target.value
                                                            }
                                                        });

                                                    }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>

                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {editingPrices ? (
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





                    <div className='table-Cover'>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"># Group</th>
                                    <th scope="col">1-6 Days</th>
                                    <th scope="col">7-14 Days</th>
                                    <th scope="col">15+ Days</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>

                                {groups?.map((groupObj, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {groupObj.groupName}</th>
                                            
                                            <td scope="row">€<b>{groupObj.winterPrices['1to6daysPrice']}</b></td>
                                            <td scope="row">€<b>{groupObj.winterPrices['7to14daysPrice']}</b></td>
                                            <td scope="row">€<b>{groupObj.winterPrices['15plusDaysPrice']}</b></td>


                                            <td><AiOutlineEdit onClick={() => {
                                                setEditPrices(true);
                                                setGroupToProcess(groupObj);
                                            }} className='fs-5 cursor-pointer' /> </td>

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
