import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import {  AiOutlineEye } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setSeasonIdForPrices } from '../redux/slices/appSlice';
import { useNavigate } from 'react-router-dom';


export default function PricingSeasons() {

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
            {loading ? (
                <div style={{
                    height: '200px',
                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (
                <div className='p-3'>
                    <h3 className='text-center'>Choose Season to view Prices</h3>
                    <div className='table-Cover'>
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"># Season</th>
                                    <th scope="col">Prices</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasonsArr?.map((seasonObj, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {seasonObj.seasonName}</th>
                                            <td><AiOutlineEye onClick={() => {
                                                dispatch(setSeasonIdForPrices(seasonObj._id));
                                                navigate('/groups-prices');
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
