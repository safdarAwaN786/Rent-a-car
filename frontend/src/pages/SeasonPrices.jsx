import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiOutlineCloseSquare, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


export default function SeasonPrices() {

    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState(null);

    const updateData = () => {
        axios.get('/read-groups').then((response) => {
            setGroups(response.data.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }
    const PricesSeasonId = useSelector(state => state.app.seasonIdForPrices)

    useEffect(() => {
        axios.get('/read-groups').then((response) => {
            setGroups(response.data.data);
            setLoading(false);
        }).catch((err) => {
            updateData();
        })
    })

    // Sort groups based on the cheapest price for 1-6 days
    const sortedGroups = groups && [...groups].sort((a, b) => {
        const priceA = a.prices.find(priceObj => priceObj.season?._id === PricesSeasonId)?.sixDaysPrice || 0;
        const priceB = b.prices.find(priceObj => priceObj.season?._id === PricesSeasonId)?.sixDaysPrice || 0;
        return priceA - priceB;
    });


    return (
        <>
        <Navbar />
            {loading ? (
                <div style={{
                    height: '200px'
                }} className='mt-5 pt-5 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (
                <div className='p-3 mt-5 pt-5 '>
                    <h3 className='text-center text-decoration-underline mt-5 fs-4 fw-bold'>Groups Prices of {(groups[0].prices.find(priceObj => priceObj.season?._id === PricesSeasonId))?.season?.seasonName}</h3>


                    <div className='table-Cover'>
                        <table  class="table table-striped table-success table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"># Group</th>
                                    <th scope="col">1-6 Days</th>
                                    <th scope="col">7-14 Days</th>
                                    <th scope="col">15+ Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedGroups?.map((groupObj, index) => {
                                    const priceObjToShow = groupObj.prices.find(priceObj => priceObj.season?._id === PricesSeasonId)
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}. {groupObj.groupName}</th>
                                            <td scope="row">€<b>{priceObjToShow?.sixDaysPrice}</b>/day</td>
                                            <td scope="row">€<b>{priceObjToShow?.fourteenDaysPrice}</b>/day</td>
                                            <td scope="row">€<b>{priceObjToShow?.fifteenDaysPrice}</b>/day</td>
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
