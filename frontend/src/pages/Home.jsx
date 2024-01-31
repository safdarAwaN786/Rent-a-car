import React from 'react'
import Navbar from '../components/Navbar'
import MainSection from '../components/MainSection'
import WorkFlowSection from '../components/WorkFlowSection'
import ChooseUsSection from '../components/ChooseUsSection'
import BrandsSection from '../components/BrandsSection'
import FleetSection from '../components/FleetSection'
import Footer from '../components/Footer'


export default function Home(props) {
    return (
        <div>
            <Navbar resetPassword={props.resetPassword} />
            <MainSection />
            <WorkFlowSection />
            <ChooseUsSection />
            <BrandsSection />
            <FleetSection />
            <Footer />
        </div>
    )
}
