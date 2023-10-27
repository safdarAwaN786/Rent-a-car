import React from 'react'
import Navbar from '../components/Navbar'
import ProductsSection from '../components/ProductsSection'
import Footer from '../components/Footer'

export default function VehicleGuide({loggedIn, user, setLoggedIn, setUser, setSelectedVehicle }) {
  return (
    <>
      <Navbar loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser} />
      <div className='mt-5'>

        <ProductsSection setSelectedVehicle={setSelectedVehicle} />
      </div>
      <Footer />
    </>
  )
}
