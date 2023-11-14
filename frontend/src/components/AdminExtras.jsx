import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import Select from 'react-select';
import { toast } from 'react-toastify';


export default function AdminExtras() {

    const [editPrices, setEditPrices] = useState(false);
    const [viewPrices, setViewPrices] = useState(false);
    const [extraToEdit, setExtraToEdit] = useState(null);
    const [editingPrices, setEditingPrices] = useState(false);

    const [extrasObj, setExtrasObj] = useState(null);


    const [extrasArr, setExtrasArr] = useState([]);

    useEffect(() => {
        console.log(extrasArr);
    }, [extrasArr])

    const [loading, setLoading] = useState(true);




    const updateExtras = () => {
        axios.get('/read-extras').then((response) => {
            console.log(response.data);
            setExtrasObj(response.data.data)
            setExtrasArr(response.data.data.Extras);

        }).catch((e) => {
            console.log(e);
            toast.error('Error , Please Refresh!')
        })
    }



    useEffect(() => {
        axios.get('/read-extras').then((response) => {

            setLoading(false);
            console.log(response.data);
            setExtrasObj(response.data.data);
            setExtrasArr(response.data.data.Extras);

        }).catch((e) => {
            updateExtras();
            

        });

    }, [])


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
                    <h3 className='text-center'>All Extras</h3>


                    {editPrices && (


                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>


                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>

                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            updateExtras();
                                            setEditPrices(false);
                                            setExtraToEdit(null);
                                        }} />
                                    </div>


                                    <h1 className='text-center fs-4'>Edit Price for : {extraToEdit.extraName}</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        setEditingPrices(true);


                                        // setAddProduct(false);




                                        axios.post('/update-extra', { _id: extrasObj._id, Extras: extrasArr })
                                            .then(response => {
                                                setEditingPrices(false);

                                                setEditPrices(false);
                                                setExtraToEdit(null);
                                                updateExtras();

                                                toast.success("Prices Updated Successfully!");

                                            })
                                            .catch(error => {
                                                setEditingPrices(false);

                                                // setExtrasArr([]);
                                                toast.error('Error in Updating Extras!')
                                                console.error('Error updating extras', error)
                                            });


                                    }}>


                                        <div className='d-flex flex-column'>
                                            <div className='d-flex justify-content-end'>
                                                <p>Max. Quantity : {extraToEdit?.maxQuantity}</p>
                                            </div>

                                            {(extraToEdit.extraName === 'Super Collision Damage Waiver (SCDW)' || extraToEdit.extraName === 'Tyres, Windscreen, Underbody' || extraToEdit.extraName === 'GPS') ? (
                                                <>                                                    {extraToEdit.priceOfExtra.map((extraPriceObj, index) => {
                                                    return (
                                                        <div className='extraBox flex-wrap my-2 border-circle p-2 d-flex  justify-content-between'>


                                                            <label class="form-check-label" >{extraPriceObj.groupName} :</label>
                                                            <div>

                                                                <span> Price(€) : </span>
                                                                <input value={extraPriceObj.price} onChange={(e) => {
                                                                    const updatedExtras = [...extrasArr];

                                                                    const foundExtra = updatedExtras.find((extra) => extra.extraName === extraToEdit.extraName);


                                                                    if (foundExtra) {
                                                                        const foundPrice = foundExtra.priceOfExtra.find((item) => item.groupName === extraPriceObj.groupName);
                                                                        if (foundPrice) {
                                                                            foundPrice.price = e.target.value;
                                                                        }
                                                                    }
                                                                    setExtraToEdit(foundExtra)

                                                                    setExtrasArr(updatedExtras);
                                                                }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                </>
                                            ) : (
                                                <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>


                                                    <label class="form-check-label" >All Groups :</label>
                                                    <div>

                                                        <span> Price(€) :</span>
                                                        <input value={extraToEdit.priceOfExtra} onChange={(e) => {

                                                            const updatedExtras = [...extrasArr];

                                                            const foundExtra = updatedExtras.find((extra) => extra.extraName === extraToEdit.extraName);


                                                            if (foundExtra) {
                                                                foundExtra.priceOfExtra = e.target.value
                                                            }
                                                            setExtraToEdit(foundExtra)



                                                            setExtrasArr(updatedExtras)
                                                        }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                    </div>
                                                </div>

                                            )}



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
                    {viewPrices && (


                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>


                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>

                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setViewPrices(false);
                                            setExtraToEdit(null);
                                        }} />
                                    </div>


                                    <h1 className='text-center fs-4'>Prices for : {extraToEdit.extraName}</h1>

                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();




                                    }}>
                                        <div className='d-flex flex-column'>
                                            <div className='d-flex justify-content-end'>
                                                <p>Max. Quantity : {extraToEdit?.maxQuantity}</p>
                                            </div>

                                            {(extraToEdit.extraName === 'Super Collision Damage Waiver (SCDW)' || extraToEdit.extraName === 'Tyres, Windscreen, Underbody' || extraToEdit.extraName === 'GPS') ? (
                                                <>                                                    {extraToEdit.priceOfExtra.map((extraPriceObj, index) => {
                                                    return (
                                                        <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>


                                                            <label class="form-check-label" >{extraPriceObj.groupName} :</label>

                                                            <input value={extraPriceObj.price} onChange={(e) => {
                                                                const updatedExtras = [...extrasArr];

                                                                updateExtras.find({ extraName: extraToEdit.extraName }).priceOfExtra.find({ groupName: extraPriceObj.groupName }).price = e.target.value

                                                                setExtrasArr(updatedExtras)
                                                            }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required readOnly />
                                                        </div>
                                                    )
                                                })}
                                                </>
                                            ) : (
                                                <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>


                                                    <label class="form-check-label" >All Groups :</label>

                                                    <input value={extraToEdit.priceOfExtra} onChange={(e) => {
                                                        const updatedExtras = [...extrasArr];
                                                        updatedExtras.find({ extraName: extraToEdit.extraName }).priceOfExtra = e.target.value

                                                        setExtrasArr(updatedExtras)
                                                    }} type='number' className='p-1 mx-2 border border-secondary border-circle mb-1' required readOnly />
                                                </div>

                                            )}





                                        </div>
                                    </form>

                                </div>


                            </div>
                        </div>
                    )}




                    <div className='table-Cover'>


                        <table class="table table-striped">
                            <thead>
                                <tr>

                                    <th scope="col"># Extra</th>

                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>

                                {extrasArr?.map((extraObj, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {extraObj.extraName}</th>

                                            <td><AiOutlineEdit onClick={() => {
                                                setEditPrices(true);
                                                setExtraToEdit(extraObj);
                                            }} className='fs-5 cursor-pointer' /> <AiOutlineEye className='fs-5 cursor-pointer' onClick={() => {
                                                setViewPrices(true);

                                                setExtraToEdit(extraObj);
                                            }} /></td>

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
