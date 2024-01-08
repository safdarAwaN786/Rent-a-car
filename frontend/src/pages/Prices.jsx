import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import {  AiOutlineEye } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setSeasonIdForPrices } from '../redux/slices/appSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dayjs from 'dayjs'

export default function Prices() {

    const [seasonsArr, setSeasonsArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const updateSeasons = () => {
        axios.get('/read-seasons').then((response) => {
            setLoading(false);
            setSeasonsArr(response.data.data);
        }).catch((e) => {
            toast.error('Error! Try Reload')
        });
    }
    const navigate = useNavigate();

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
        <Navbar />
            {loading ? (
                <div style={{
                    height: '200px',
                }} className=' pt-5 mb-10 mt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (
                <div className='p-3 pt-5 mb-10 mt-5'>
                    <h3 className='text-center mt-5 text-decoration-underline mt-5 fs-4 fw-bold'>Choose Season to view Prices</h3>
                    <div className='table-Cover'>
                        <table class="table table-striped table-success table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"># Season</th>
                                    <th scope="col" className='w-25'>Period</th>
                                    <th scope="col" className='w-25'>Prices</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasonsArr?.map((seasonObj, index) => {
                                    console.log(seasonObj)
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {seasonObj.seasonName}</th>
                                            <th scope="row">{dayjs(seasonObj.startDate).format('DD-MM-YYYY')} - {dayjs(seasonObj.endDate).format('DD-MM-YYYY')}</th>
                                            <td><button onClick={() => {
                                                dispatch(setSeasonIdForPrices(seasonObj._id));
                                                navigate('/prices-groups');
                                            }} className=' cursor-pointer btn btn-dark'>View</button> </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}
