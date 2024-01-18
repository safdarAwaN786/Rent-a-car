import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'

export default function PrivacyCookiesPolicy() {

    const formatDate = (date) => {
        const newDate = new Date(date);
        if (isNaN(newDate)) {
            // If the date is not valid, return an empty string or handle it accordingly
            return "";
        }

        const formattedDate = newDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return formattedDate;
    };
    const privacyPolicyContent = useSelector(state => state.webContent?.privacyPolicyPage)


    return (
        <>
            <Navbar />

            <div class="return-and-exchange-pages pt-100 mb-100 mt-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <div class="update-date mb-30">
                                <h6><i class="bi bi-caret-right-fill"></i> Last Updated</h6>
                                <p>{formatDate(privacyPolicyContent?.lastUpdated)}</p>
                            </div>
                        </div>
                        <div class="col-lg-12 mb-40">
                            <div class="return-and-exchange" dangerouslySetInnerHTML={{ __html: privacyPolicyContent?.pageContent }}>












                            </div>


                        </div>
                    </div>

                </div>
            </div>



            <Footer />
        </>
    )
}
