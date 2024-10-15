import React from "react";
import Referal from "../layouts/Referal";
import call1  from '../../../public/images/call1.png'
import call2  from '../../../public/images/call2.png'
import call3  from '../../../public/images/call3.png'
import Image from "next/image";

const Contact = () =>{

    return(
        <>
            <section className="contact-us">
                <div className="backcorz">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                            <h2>We are always here to listen to your issue and solve it</h2>
                            <h3>GOD IS GREATE GAS SOLUTION </h3>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div className="container">
                <div className="contant-card">
                <div className="row">
                    <div className="help-card col-md-4">
                        <center>
                             <Image
                                width={40}
                                height={40}
                                className="h-8 w-8 rounded-full"
                                src={call1}
                                alt="avatar-img"
                            />
                            </center>
                        <h3>Call us directly at</h3>
                        <hr/>
                        <p>+256 743 955 171</p>
                        <p>+256 751 192 186</p>
                        <p>+256 703 364 768</p>

                    </div>

                    <div className="help-card col-md-4">
                        <center>
                         <Image
                                width={40}
                                height={40}
                                className="h-8 w-8 rounded-full"
                                src={call2}
                                alt="avatar-img"
                            />
                        </center>
                        <h3>Email</h3>
                        <hr/>
                        <p>info@greatergas.ug</p>
                        <p>goodluck@gmail.com</p>
                    </div>

                    <div className="help-card col-md-4">
                        <center>
                            <Image
                                width={40}
                                height={40}
                                className="h-8 w-8 rounded-full"
                                src={call3}
                                alt="avatar-img"
                            />
                            </center>
                        <h3>OUR OFFICE LOCATION</h3>
                        <hr/>
                        <p>Gayaza Behind Shell</p>
                        
                    </div>
                </div>

            </div>
            </div>

            <Referal />
        </>
        
    )
}

export default Contact



