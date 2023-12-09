import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import Select from 'react-select';
import { toast } from 'react-toastify';


export default function AdminSeasons() {

    const [editDates, setEditDates] = useState(false);
    const [seasonToEdit, setSeasonToEdit] = useState(null);
    const [editingDates, setEditingDates] = useState(false);
    const [seasonObj, setSeasonObj] = useState(null);
    const [seasonsArr, setSeasonsArr] = useState([]);




    const [loading, setLoading] = useState(true);
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
            setSeasonObj(response.data.data);
            setSeasonsArr(response.data.data.Seasons);
        }).catch((e) => {
            toast.error('Error! Try Reload')
        });
    }

    useEffect(() => {
        axios.get('/read-seasons').then((response) => {
            setLoading(false);
            setSeasonObj(response.data.data);
            setSeasonsArr(response.data.data.Seasons);
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
                                    <h1 className='text-center fs-4'>Edit Dates for : {seasonToEdit.seasonName}</h1>
                                    <form encType='multipart/form-data' onSubmit={(event) => {
                                        event.preventDefault();

                                        console.log(seasonsArr)
                                        if (seasonToEdit.startDate > seasonToEdit.endDate) {
                                            toast.warning('Season End Date should be later than start Date');
                                            updateSeasons()
                                            return
                                        }
                                        const seasonsToCheck = seasonsArr.filter((season) =>
                                            season.seasonName !== seasonToEdit.seasonName
                                        );
                                        if (seasonToEdit.startDate >= seasonsToCheck[0].startDate && seasonToEdit.startDate <= seasonsToCheck[0].endDate) {
                                            toast.warning(`Each season should have unique dates! ${seasonsToCheck[0].seasonName} season already have this date.`);
                                            updateSeasons();
                                            return
                                        }
                                        if (seasonToEdit.endDate >= seasonsToCheck[1].startDate && seasonToEdit.endDate <= seasonsToCheck[1].endDate) {
                                            toast.warning(`Each season should have unique dates! ${seasonsToCheck[1].seasonName} season already have this date.`);
                                            updateSeasons();

                                            return
                                        }

                                        if (seasonToEdit.startDate < seasonsToCheck[0].startDate && seasonToEdit.endDate > seasonsToCheck[0].endDate) {
                                            toast.warning(`Each season should have unique dates!. ${seasonToEdit.seasonName} and ${seasonsToCheck[0].seasonName} repeating dates!`);
                                            updateSeasons()
                                            return
                                        }
                                        if (seasonToEdit.startDate < seasonsToCheck[1].startDate && seasonToEdit.endDate > seasonsToCheck[1].endDate) {
                                            toast.warning(`Each season should have unique dates!. ${seasonToEdit.seasonName} and ${seasonsToCheck[1].seasonName} repeating dates!`);
                                            updateSeasons();
                                            return
                                        }
                                        console.log(seasonObj)
                                        console.log(seasonsArr)
                                        if (seasonObj.Seasons !== seasonsArr) {

                                            setEditingDates(true);
                                            axios.patch('/update-seasons', { _id: seasonObj._id, Seasons: seasonsArr })
                                                .then(response => {
                                                    setEditingDates(false);
                                                    setEditDates(false);
                                                    setSeasonToEdit(null);
                                                    updateSeasons();
                                                    toast.success("Dates Updated Successfully!")
                                                }).catch(error => {
                                                    setEditingDates(false);
                                                    // setExtrasArr([]);
                                                    toast.error('Error in Updating Dates!')
                                                    console.error('Error updating dates', error)
                                                });

                                        } else {
                                            toast.error('Date values are unable for updation')
                                        }
                                    }}>

                                        <div className='d-flex flex-column'>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >Start Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        const updatedSeasons = [...seasonsArr];
                                                        const foundSeason = updatedSeasons.find((season) => season.seasonName === seasonToEdit.seasonName);


                                                        if (foundSeason) {
                                                            foundSeason.startDate = e.target.value
                                                        }

                                                        setSeasonToEdit(foundSeason)
                                                        setSeasonsArr(updatedSeasons)
                                                    }} type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
                                                </div>
                                            </div>
                                            <div className='extraBox my-2 border-circle p-2 d-flex  justify-content-between'>
                                                <label class="form-check-label" >End Date :</label>
                                                <div>
                                                    <input onChange={(e) => {
                                                        const updatedSeasons = [...seasonsArr];
                                                        const foundSeason = updatedSeasons.find((season) => season.seasonName === seasonToEdit.seasonName);

                                                        if (foundSeason) {
                                                            foundSeason.endDate = e.target.value
                                                        }

                                                        setSeasonToEdit(foundSeason)
                                                        setSeasonsArr(updatedSeasons)
                                                    }} min={seasonToEdit.startDate} type='date' className='p-1 mx-2 border border-secondary border-circle mb-1' required />
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
                                                updateSeasons();

                                                setSeasonToEdit(seasonObj);
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
