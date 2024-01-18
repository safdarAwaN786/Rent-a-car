import React from 'react'
import Navbar from '../components/Navbar'
import ProductsSection from '../components/ProductsSection'
import Footer from '../components/Footer'

export default function VehicleGuide() {


  
  return (
    <>
      <Navbar  />
      <div className='mt-5'>

        <ProductsSection   />
      </div>
      <Footer />
    </>
  )
}
