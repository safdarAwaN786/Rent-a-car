import React from 'react'
import Navbar from '../components/Navbar'
import MainSection from '../components/MainSection'
import WorkFlowSection from '../components/WorkFlowSection'
import ChooseUsSection from '../components/ChooseUsSection'
import BrandsSection from '../components/BrandsSection'
import FleetSection from '../components/FleetSection'
import Footer from '../components/Footer'


export default function Home({loggedIn, user, setLoggedIn, setUser }) {
    return (
        <div>
            <Navbar  loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser}  />
            <MainSection />
            <WorkFlowSection />
            <ChooseUsSection />
            <BrandsSection />
            <FleetSection />
            <Footer />
        </div>
    )
}
