import React from "react";
import './styles.css'

function Footer() {
    return (
        <>
            {/* <!-- Footer --> */}
            <footer class="bac text-center text-lg-start">
                {/* <!-- Section: Social media --> */}
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    {/* <!-- Left --> */}
                    <div class="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* <!-- Left --> */}

          </section>

                {/* <!-- Copyright --> */}
                <div class="smallfooter text-center p-4">
                    © 2023 Copyright:
                    <a class="text-reset fw-bold" href="https://xycoders.co.ke">xycoders</a>
                </div>
                {/* <!-- Copyright --> */}
            </footer>
            {/* <!-- Footer --> */}
        </>
    )
}


export default Footer;
