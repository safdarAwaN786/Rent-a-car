import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { SlMinus, SlPlus } from 'react-icons/sl';
import Select from 'react-select';
import { toast } from 'react-toastify';


export default function AdminSeasons() {

    const [editDates, setEditDates] = useState(false);
    const [seasonToEdit, setSeasonToEdit] = useState(null);
    const [editingDates, setEditingDates] = useState(false);
    const [seasonsArr, setSeasonsArr] = useState([]);
    const [addSeason, setAddSeason] = useState(false);
    const [loading, setLoading] = useState(true);
    const [seasonsToCheck, setSeasonsToCheck] = useState(null);

    const formatDate = (date) => {
        const newDate = new Date(date);
        const formatDate = newDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return formatDate;
    }

    const updateSeasons = () => {
        axios.get('/read-seasons').then((response) => {
            setLoading(false);
            setSeasonsArr(response.data.data);
        }).catch((e) => {
            toast.error('Error! Try Reload')
        });
    }
    useEffect(() => {
        console.log(seasonsArr);
    }, [seasonsArr])

    useEffect(() => {
        axios.get('/read-seasons').then((response) => {
            setLoading(false);
            setSeasonsArr(response.data.data);
        }).catch((e) => {
            setLoading(false)
            updateSeasons();
        });
    }, [])


    return (
        <>
            {loading ? (
                <div style={{
                    height: '200px',
                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (
                <div className='p-3'>
                    <h3 className='text-center'>Seasons Details</h3>

                    {editDates && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setEditDates(false);
                                            updateSeasons();
                                            setSeasonToEdit(null);
                                        }} />
                                    </div>
                                    <h1 className='text-center fs-4'>Edit Season Details</h1>
                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();

                                        console.log(seasonsArr)
                                        if (seasonToEdit.startDate > seasonToEdit.endDate) {
                                            toast.warning('Season End Date should be later than start Date');
                                            return
                                        }
                                        
                                        let wrongDate;
                                        seasonsToCheck.map((checkSeason) => {
                                            if (!wrongDate) {
                                                if ((seasonToEdit.startDate >= checkSeason.startDate && seasonToEdit.startDate <= checkSeason.endDate) || (seasonToEdit.endDate >= checkSeason.startDate && seasonToEdit.endDate <= checkSeason.endDate)) {
                                                    toast.warning(`Each season should have unique dates! ${checkSeason.seasonName} season already have this date.`);
                                                    wrongDate = true;
                                                    return
                                                }
                                                if (seasonToEdit.startDate <= checkSeason.startDate && seasonToEdit.endDate >= checkSeason.endDate) {
                                                    toast.warning(`Each season should have unique dates!. ${seasonToEdit.seasonName} and ${checkSeason.seasonName} repeating dates!`);
                                                    wrongDate = true;
                                                    return
                                                }
                                            }
                                        })

                                        if (!wrongDate) {
                                            setEditingDates(true);
                                            axios.patch('/update-season', seasonToEdit)
                                                .then(response => {
                                                    setEditingDates(false);
                                                    setEditDates(false);
                                                    setSeasonToEdit(null);
                                                    updateSeasons();
                                                    toast.success("Seasons Updated Successfully!")
                                                }).catch(error => {
                                                    setEditingDates(false);
                                                    // setExtrasArr([]);
                                                    toast.error('Error in Updating Seasons!')
                                                    console.error('Error updating dates', error)
                                                });
                                        }
                                    }}>

                                        <div className='d-flex flex-column'>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Season Name :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setSeasonToEdit({ ...seasonToEdit, seasonName: e.target.value })
                                                    }} value={seasonToEdit?.seasonName} type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Start Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setSeasonToEdit({ ...seasonToEdit, startDate: e.target.value })
                                                    }} type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >End Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setSeasonToEdit({ ...seasonToEdit, endDate: e.target.value })
                                                    }} min={seasonToEdit?.startDate} type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {editingDates ? (
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
                    {addSeason && (
                        <div className='addProductBox justify-content-center pt-5  '>
                            <div className='formBox border-circle  mt-5 pt-4 '>
                                <div data-aos="fade-down" className=' mb-3 myBox mx-auto border-circle p-3'>
                                    <div className='d-flex justify-content-end'>
                                        <AiOutlineCloseSquare className='cursor-pointer fs-4' onClick={() => {
                                            setAddSeason(false);
                                            updateSeasons();
                                            setSeasonToEdit(null);
                                        }} />
                                    </div>
                                    <h1 className='text-center fs-4'>Add Season Details</h1>
                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();
                                        if (seasonsArr.some(seasonObj => seasonObj.seasonName === seasonToEdit.seasonName)) {
                                            toast.error('Seasons cannot have same Name!');
                                            return
                                        }
                                        if (seasonToEdit.startDate > seasonToEdit.endDate) {
                                            toast.warning('Season End Date should be later than start Date');
                                            return
                                        }
                                        

                                        let wrongDate;
                                        seasonsArr.map((checkSeason) => {
                                            if (!wrongDate) {
                                                if ((seasonToEdit.startDate >= checkSeason.startDate && seasonToEdit.startDate <= checkSeason.endDate) || (seasonToEdit.endDate >= checkSeason.startDate && seasonToEdit.endDate <= checkSeason.endDate)) {
                                                    toast.warning(`Each season should have unique dates! ${checkSeason.seasonName} season already have this date.`);
                                                    wrongDate = true;
                                                    return
                                                }
                                                if (seasonToEdit.startDate <= checkSeason.startDate && seasonToEdit.endDate >= checkSeason.endDate) {
                                                    toast.warning(`Each season should have unique dates!. ${seasonToEdit.seasonName} and ${checkSeason.seasonName} repeating dates!`);
                                                    wrongDate = true;
                                                    return
                                                }
                                            }
                                        })


                                        if (!wrongDate) {
                                            setEditingDates(true);
                                            axios.post('/add-season', seasonToEdit)
                                                .then(response => {
                                                    setEditingDates(false);
                                                    setAddSeason(false);
                                                    setSeasonToEdit(null);
                                                    updateSeasons();
                                                    toast.success("Season Added Successfully!")
                                                }).catch(error => {
                                                    setEditingDates(false);
                                                    // setExtrasArr([]);
                                                    toast.error('Error in Updating Seasons!')
                                                    console.error('Error updating dates', error)
                                                });
                                        }
                                    }}>

                                        <div className='d-flex flex-column'>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Season Name :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setSeasonToEdit({ ...seasonToEdit, seasonName: e.target.value })
                                                    }} value={seasonToEdit?.seasonName} type='text' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Start Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setSeasonToEdit({ ...seasonToEdit, startDate: e.target.value })
                                                    }} type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >End Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        setSeasonToEdit({ ...seasonToEdit, endDate: e.target.value })
                                                    }} min={seasonToEdit?.startDate} type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center my-4'>
                                                <button style={{
                                                    zIndex: '00'
                                                }} type="submit" class="primary-btn6 p-sm-2 p-1 ">
                                                    {editingDates ? (
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
                                    <th scope="col"># Season</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasonsArr?.map((seasonObj, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {seasonObj.seasonName}</th>
                                            <td scope="row">{formatDate(seasonObj.startDate)}</td>
                                            <td scope="row">{formatDate(seasonObj.endDate)}</td>
                                            <td><AiOutlineEdit onClick={() => {
                                                setEditDates(true);
                                                setSeasonsToCheck(seasonsArr.filter((season) =>
                                                    season.seasonName !== seasonObj.seasonName
                                                ));
                                                setSeasonToEdit(seasonObj);
                                            }} className='fs-5 cursor-pointer' /> </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-between m-2 p-2'>
                            <SlPlus onClick={() => {
                                setAddSeason(true);
                                setSeasonToEdit({})
                            }} className='fs-3 cursor-pointer' />
                            {seasonsArr.length > 1 && (
                                <SlMinus onClick={() => {

                                    setLoading(true)
                                    axios.patch('/remove-season', seasonsArr[seasonsArr.length - 1])
                                        .then(response => {
                                            setLoading(false);
                                            updateSeasons();
                                            toast.success("Seasons Removed Successfully!")
                                        }).catch(error => {
                                            setLoading(false);
                                            // setExtrasArr([]);
                                            toast.error('Error in Removing Seasons!')
                                            console.error('Error updating dates', error)
                                        });
                                }} className='fs-3 cursor-pointer' />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
