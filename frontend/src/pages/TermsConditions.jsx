import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsConditions({loggedIn, user, setLoggedIn, setUser }) {
  return (
    <>
    <Navbar loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser}  />
      <div class="return-and-exchange-pages pt-100 mb-100 mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 ">
              <div class="update-date mb-30">
                <h6><i class="bi bi-caret-right-fill"></i> Last Updated</h6>
                <p>7 Oct, 2023</p>
              </div>
            </div>
            <div class="col-lg-12 mb-40">
              <div class="return-and-exchange">
                <h4>Terms & Conditions for "Your Way" Car Rentals, Cyprus</h4>
                {/* <!-- <p>The refund policy for car dealers can vary from dealership to dealership. It's essential to
                  understand that purchasing a car is a significant transaction, and refund policies may be
                  different compared to other retail items. Here are some general points to consider regarding
                  refund policies for car dealerships:</p> --> */}
                <ul>
                  <h5>Inclusive Rental Rates:</h5>

                  <ul>
                    <li>Insurance coverage with NO EXCESS on 7-day or longer rentals.</li>
                    <li>Unlimited Mileage</li>
                    <li>Vehicle theft protection (excluding personal contents).</li>
                    <li>Around-the-clock roadside assistance.</li>
                    <li>Regular vehicle maintenance.</li>
                    <li>Free car drop-off/collection for 5-day or longer rentals (Airports excluded).
                    </li>
                    <li>All local taxation.</li>
                    <li>19% Value Added Tax (V.A.T).</li>
                  </ul>

                  <h5>Exclusions in Rental Rates:</h5>

                  <ul>
                    <p><strong>Fuel:</strong> Customers must deposit an amount for a full tank,
                      refundable upon car return with the same fuel level.</p>

                    <p><strong>Coverage Exceptions:</strong> Damages to tyres, windscreen, and the car's
                      underbody are excluded. (Extended coverage available at €5 per day for
                      tyres/windscreen/underbody).</p>

                    <p><strong>Airport Fee:</strong> A charge of €20 for airport pickups.</p>

                    <p><strong>Young Drivers:</strong> Additional charges for drivers aged below 25 with
                      a full license held for under 3 years.</p>

                    <p><strong>Drop-off Costs:</strong> For rentals spanning less than 6 days.</p>

                    <p><strong>Accessories (upon request):</strong></p>
                    <ul>
                      <li>Child Seats: €20 each.</li>
                      <li>Booster Seats: €15 each.</li>
                      <li>Roof Racks: €30.</li>
                    </ul>

                  </ul>

                  <h5>Long-Term Lease:</h5>
                  <ul>
                    <p>We offer tailored rates for extended rental periods. Inquire for details.</p>
                  </ul>


                  <h5>Age Limitations for Drivers:</h5>
                  <ul>
                    <li>Drivers must be at least 21 years old.</li>
                    <li>If a driver is between 21 and 25 years old, they should have a driving license for a
                      minimum of 3 years. If they've had their license for less than 3 years, they may be
                      allowed to drive the vehicle upon request, but this comes with an extra charge.</li>
                    <li>The upper age limit is 70 years. However, drivers older than 70 with a valid driving
                      license can still drive the vehicle. They should provide their birthdate when
                      booking to set up special insurance coverage without additional charges.</li>
                  </ul>






                  <h5>Vehicle Category:</h5>
                  <ul>
                    <li>The cars shown are just illustrative. We reserve the right to replace them with
                      comparable or superior models without any additional charge.</li>

                  </ul>




                  <h5>Payment Methods locally:</h5>
                  <ul>
                    <li>We accommodate all major credit card providers.</li>

                  </ul>





                  <h5>Additional Provisions:</h5>
                  <ul>
                    <li><strong>Fuel Terms:</strong> Full tank deposit returned upon car return with an
                      equivalent fuel level.</li>
                    <li><strong>On-Road Assistance:</strong> Accessible 24/7. Consult the rental agreement
                      or keychain for contact information.</li>
                    <li><strong>Travel to Turkish Zones:</strong> Venturing into the Turkish Occupied Areas
                      in Cyprus mandates additional insurance. Kindly get in touch for details.</li>
                    <li><strong>Minimum Rental Charge:</strong> The base rental period is 3 days.</li>
                    <li><strong>Traffic Violations:</strong> Any fines accrued during the lease period are
                      the sole liability of the renter.</li>
                    <li><strong>Adjustments & Cancellations:</strong> Modifications or cancellations can be
                      executed before the scheduled pickup without incurring extra charges.</li>
                    <li><strong>Short-Term Rental Clauses:</strong> We may opt to exclude the Super
                      Collision Damage Waiver (SCDW) charge for rentals under a week, refunding the
                      equivalent to the utilized payment method.</li>
                    <li><strong>Upfront Deposit:</strong> We may ask for a preliminary security deposit when
                      booking certain types of cars.</li>
                  </ul>








                </ul>
                <p><strong>Thank you for choosing "Your Way" Car Rentals. We wish you a pleasant journey across
                  Cyprus!</strong></p>

              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
