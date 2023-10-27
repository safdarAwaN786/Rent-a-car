import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import Select from 'react-select';
import { toast } from 'react-toastify';


export default function AdminExtras() {

    const [editExtras, setEditExtras] = useState(false);
    const [viewExtras, setViewExtras] = useState(false);

    const [dataToSend, setDataToSend] = useState(null);

    const allExtrasArr = ['Super Collision Damage Waiver (SCDW)', 'Tyres, Windscreen, Underbody', 'GPS', 'Baby Seat', 'Booster Seat', 'Roof Rack', 'Ski Rack'];

    const allGroups = ['A3', 'A4', 'A5', 'B3', 'B4', 'C2', 'C4', 'C6', 'C8', 'D1', 'D4', 'D7', 'D8'];

    const [extrasArr, setExtrasArr] = useState([]);
    useEffect(() => {
        console.log(extrasArr);
    }, [extrasArr])


    const [groupsExtras, setGroupsExtras] = useState(null);

    const [groupForExtras, setGroupForExtras] = useState(null);


    const updateExtras = ()=>{
        axios.get('https://my-car-backend.vercel.app/extras/read-extras').then((response)=>{
            console.log(response.data);
            setGroupsExtras(response.data.data);
        }).catch((e)=>{
            console.log(e);
        })
    }



    useEffect(()=>{
        axios.get('https://my-car-backend.vercel.app/extras/read-extras').then((response)=>{
            console.log(response.data);
            setGroupsExtras(response.data.data);
        }).catch((e)=>{
            console.log(e);
        })
    }, [])


    return (
        <>
            <div className='p-3'>
                <h3 className='text-center'>Groups Extras</h3>


                {editExtras && (


                    <div className='addProductBox justify-content-center pt-5  '>
                        <div className='formBox border-circle  mt-5 pt-4 '>


                            <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                <div className='d-flex justify-content-end'>

                                    <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                        setEditExtras(false);
                                        setExtrasArr([]);
                                    }} />
                                </div>


                                <h1 className='text-center fs-4'>Edit Extras for : {groupForExtras.groupName}</h1>

                                <form encType='multipart/form-data' onSubmit={(event) => {
                                    event.preventDefault();

                                    event.target.reset();

                                    // setAddProduct(false);

                                    


                                    axios.post('https://my-car-backend.vercel.app/extras/add-extra', { ...groupForExtras, extrasAdded: extrasArr })
                                        .then(response => {
                                            console.log(response);
                                            setEditExtras(false);
                                            setExtrasArr([]);
                                            updateExtras();

                                            toast.success("Extras Updated Successfully!");

                                        })
                                        .catch(error => {
                                            setEditExtras(false);
                                            setExtrasArr([]);
                                            toast.error('Error in Updating Extras!')
                                            console.error('Error updating extras', error)
                                        });

                                   
                                }}>
                                    <div className='d-flex flex-column'>

                                        {allExtrasArr?.map((extraText, index) => {
                                            return (
                                                <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>

                                                    <div className='d-flex flex-column gap-1' >
                                                        <label class="form-check-label" >{extraText} :</label>

                                                        {extrasArr[index]?.extraName === extraText && (
                                                            <>


                                                                <label className='mt-1'>Max Quantity :</label>
                                                                <label className='mt-1'>Price($) :</label>
                                                            </>
                                                        )}


                                                    </div>
                                                    <div className='p-0 w-25 form-switch d-flex flex-column'>


                                                        <input checked={extrasArr[index]?.extraName === extraText} onChange={(e) => {
                                                            const updatedExtras = [...extrasArr];
                                                            if (e.target.checked) {
                                                                if (!updatedExtras[index]) {
                                                                    console.log('not index')
                                                                    updatedExtras[index] = {
                                                                        extraName: extraText
                                                                    }
                                                                }
                                                            } else {
                                                                updatedExtras[index] = null;
                                                            }
                                                            setExtrasArr(updatedExtras);
                                                        }} class="form-check-input cursor-pointer ms-2 my-1" type="checkbox" role="switch" />
                                                        {extrasArr[index]?.extraName === extraText && (
                                                            <>


                                                                <input value={extrasArr[index]?.maxQuantity} onChange={(e) => {
                                                                    const updatedExtras = [...extrasArr];
                                                                    updatedExtras[index].maxQuantity = e.target.value;
                                                                    setExtrasArr(updatedExtras)
                                                                }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />

                                                                <input value={extrasArr[index]?.priceOfExtra} onChange={(e) => {
                                                                    const updatedExtras = [...extrasArr];
                                                                    updatedExtras[index].priceOfExtra = e.target.value;
                                                                    setExtrasArr(updatedExtras)
                                                                }} name='name' type='number' className='p-1  mx-2 border border-secondary border-circle mb-1' required />
                                                            </>
                                                        )}

                                                    </div>

                                                </div>
                                            )
                                        })}



                                        <div className='d-flex justify-content-center my-4'>
                                            <button style={{
                                                zIndex: '00'
                                            }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                UPDATE
                                            </button>

                                        </div>

                                    </div>
                                </form>

                            </div>


                        </div>
                    </div>
                )}
                {viewExtras && (


                    <div className='addProductBox justify-content-center pt-5  '>
                        <div className='formBox border-circle  mt-5 pt-4 '>


                            <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                <div className='d-flex justify-content-end'>

                                    <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                        setViewExtras(false);
                                        setExtrasArr([]);
                                    }} />
                                </div>


                                <h1 className='text-center fs-4'>Extras for : {groupForExtras.groupName}</h1>

                                <form encType='multipart/form-data' onSubmit={(event) => {
                                    event.preventDefault();

                                    

                                   
                                }}>
                                    <div className='d-flex flex-column'>

                                        {allExtrasArr?.map((extraText, index) => {
                                            return (
                                                <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>

                                                    <div className='d-flex flex-column gap-1' >
                                                        <label class="form-check-label" >{extraText} :</label>

                                                        {extrasArr[index]?.extraName === extraText && (
                                                            <>


                                                                <label className='mt-1'>Max Quantity :</label>
                                                                <label className='mt-1'>Price($) :</label>
                                                            </>
                                                        )}


                                                    </div>
                                                    <div className='p-0 w-25 form-switch d-flex flex-column'>


                                                        <input checked={extrasArr[index]?.extraName === extraText}  class="form-check-input cursor-pointer ms-2 my-1" type="checkbox" role="switch" readOnly/>
                                                        {extrasArr[index]?.extraName === extraText && (
                                                            <>


                                                                <input value={extrasArr[index]?.maxQuantity}  type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required readOnly/>

                                                                <input value={extrasArr[index]?.priceOfExtra}  name='name' type='number' className='p-1  mx-2 border border-secondary border-circle mb-1' required readOnly/>
                                                            </>
                                                        )}

                                                    </div>

                                                </div>
                                            )
                                        })}



                                        
                                    </div>
                                </form>

                            </div>


                        </div>
                    </div>
                )}





                <table class="table table-striped">
                    <thead>
                        <tr>

                            <th scope="col">Group</th>
                            <th scope="col">#Extras Added</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {groupsExtras?.map((groupExtraObj, index) => {
                            return (
                                <tr>
                                    <th scope="row">{groupExtraObj.groupName}</th>
                                    <td>{groupExtraObj?.extrasAdded.filter(data=> data != null)?.length}</td>
                                    <td><AiOutlineEdit onClick={() => {
                                        setEditExtras(true);
                                        setGroupForExtras(groupExtraObj);
                                        setExtrasArr(groupExtraObj.extrasAdded);
                                    }} className='fs-5 cursor-pointer' /> <AiOutlineEye className='fs-5 cursor-pointer' onClick={()=>{
                                        setViewExtras(true);
                                        setGroupForExtras(groupExtraObj);
                                        setExtrasArr(groupExtraObj.extrasAdded);
                                    }} /></td>

                                </tr>
                            )
                        })}

                       
                    </tbody>
                </table>

            </div>
        </>
    )
}
