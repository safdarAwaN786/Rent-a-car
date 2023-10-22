import React, { useState } from 'react'
import { BiSolidGridAlt, BiListUl } from 'react-icons/bi'
import ProductCard from './ProductCard'


export default function ProductsSection() {

    const [gridView, setGridView] = useState(true);


    return (
        <>
            <div class="product-page pt-100 mb-100">
                <div class="container">
                    <div class="row g-xl-4 gy-5">

                        <div class="col-xl-8 order-xl-2 order-1">
                            <div class="row mb-40">
                                <div class="col-lg-12">
                                    <div class="show-item-and-filte">

                                        <div class="filter-view">

                                            <div class="view">
                                                <div>
                                                    <strong>Change View</strong>
                                                </div>
                                                <ul class="btn-group list-grid-btn-group">
                                                    {gridView ? (
                                                        <li class="lists">
                                                            <BiListUl onClick={() => {
                                                                setGridView(false);
                                                            }} className={` text-black fs-5`} />
                                                        </li>
                                                    ) : (

                                                        <li class="active grid">
                                                            <BiSolidGridAlt onClick={() => {
                                                                setGridView(true);
                                                            }} className={`text-black fs-5`} />
                                                        </li>
                                                    )}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-grid-main">
                                <div class="list-grid-product-wrap grid-group-wrapper">
                                    <div class="row g-4  mb-40">

                                        <div class={`${gridView ? 'col-lg-6 col-md-6 col-sm-12' : 'col-12'}  wow fadeInUp item`} data-wow-delay="200ms">
                                            <ProductCard gridView={gridView} />
                                        </div>
                                        <div class={`${gridView ? 'col-lg-6 col-md-6 col-sm-12' : 'col-12'}  wow fadeInUp item`} data-wow-delay="200ms">
                                            <ProductCard gridView={gridView} />
                                        </div>








                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="pagination-and-next-prev">
                                                <div class="pagination">
                                                    <ul>
                                                        <li class="active"><a className='text-decoration-none ' href="#">01</a></li>
                                                        <li><a className='text-decoration-none ' href="#">02</a></li>
                                                        <li><a className='text-decoration-none ' href="#">03</a></li>
                                                        <li><a className='text-decoration-none ' href="#">04</a></li>
                                                        <li><a className='text-decoration-none ' href="#">05</a></li>
                                                    </ul>
                                                </div>
                                                <div class="next-prev-btn">
                                                    <ul>
                                                        <li>
                                                            <a className='text-decoration-none ' href="#">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14"
                                                                    viewBox="0 0 7 14">
                                                                    <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z">
                                                                    </path>
                                                                </svg> Prev
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className='text-decoration-none ' href="#">
                                                                Next
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14"
                                                                    viewBox="0 0 7 14">
                                                                    <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z">
                                                                    </path>
                                                                </svg>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 order-xl-1 order-2">
                            <div class="filter-area mb-40">
                                <div class="title-and-close-btn mb-20">
                                    <h6>Search Filters</h6>

                                </div>

                            </div>
                            <div class="product-sidebar">
                                <div class="product-widget mb-20">
                                    <div class="check-box-item">
                                        <h6 class="product-widget-title mb-20">Vehicle Type</h6>
                                        <div class="checkbox-container">

                                            <ul>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">Saloon Manual Transmission</span>
                                                        <span class="qty">(1,234)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">Saloon Automatic Transmission</span>
                                                        <span class="qty">(11,353)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">Cabrio / Open Top</span>
                                                        <span class="qty">(1,234)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">People Carrier/Wheelchair Accessible Vehicles</span>
                                                        <span class="qty">(4,345)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">SUV / 4WD</span>
                                                        <span class="qty">(23,990)</span>
                                                    </label>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="product-widget mb-20">
                                    <div class="check-box-item">
                                        <h6 class="product-widget-title mb-20">Transmission Type</h6>
                                        <div class="checkbox-container">
                                            <ul>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">Automatic</span>
                                                        <span class="qty">(1,234)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">Manual</span>
                                                        <span class="qty">(11,353)</span>
                                                    </label>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div class="product-widget mb-20">
                                    <div class="check-box-item">
                                        <h6 class="product-widget-title mb-20">Number of Passengers</h6>
                                        <div class="checkbox-container">

                                            <ul>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">2</span>
                                                        <span class="qty">(1,234)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">4</span>
                                                        <span class="qty">(11,353)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">5</span>
                                                        <span class="qty">(1,234)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">6</span>
                                                        <span class="qty">(4,345)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label class="containerss">
                                                        <input type="checkbox" />
                                                        <span class="checkmark"></span>
                                                        <span class="text">8</span>
                                                        <span class="qty">(23,990)</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
