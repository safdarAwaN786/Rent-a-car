import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReservationsBanner from '../components/ReservationsBanner'
import ProductsSection from '../components/ProductsSection'


export default function Reservations({setSelectedVehicle, loggedIn, user, setLoggedIn, setUser }) {
  return (
    <>
        <Navbar  loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser}  />
        <ReservationsBanner />
        <ProductsSection setSelectedVehicle={setSelectedVehicle} />
        <Footer />
    </>
  )
}
