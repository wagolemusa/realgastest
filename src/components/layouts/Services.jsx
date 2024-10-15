import React from "react";
import vbb from '../../../public/images/vbb.jpg'
import Image from "next/image";
import net from '../../../public/images/net.jpg'
import ShortProduct from '../products/ShortProduct'
import Card from './Card'

function Services() {
    return (
        <>
        <section>
            <div className="service-area pt-110 pb-120 bg-light">
            <div className="container">
                <div className="row g-0">
                <div class="col-xl-4 col-lg-6 col-md-6">
                                <div class="service-section wow fadeInUp">
                                    <div class="section-area">
                                        <span class="section-subtitle mb-10">What We Do</span>
                                        <h2 class="section-title f-46 mb-0">What Can We Offer Security</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 service-border">
                                <div class="service-item wow fadeInUp">
                                    <div class="service-img bg-default"></div>
                                    <div class="service-icon">
                                    <svg class="h-8 w-8 text-blue-500"  width="54" height="54" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="13" r="3" />  <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />  <line x1="15" y1="6" x2="21" y2="6" />  <line x1="18" y1="3" x2="18" y2="9" /></svg>
                                    <br/>
                                    </div>
                                    <div class="service-content">
                                        <h3 class="service-content-title"><a href="service-details.html">CCTV installation</a></h3>
                                        <p>Shopping centers, business premises, car-parks, and private houses; NPC Limited has designed and fitted cameras to many varied sites.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 service-border">
                                <div class="service-item wow fadeInUp">
                                    <div class="service-img bg-default"></div>
                                    <div class="service-icon">
                                    <svg class="h-12 w-12 text-blue-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M5 12.55a11 11 0 0 1 14.08 0" />  <path d="M1.42 9a16 16 0 0 1 21.16 0" />  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />  <line x1="12" y1="20" x2="12.01" y2="20" /></svg>
                                    </div>
                                    <div class="service-content">
                                        <h3 class="service-content-title"><a href="service-details.html">Wireless networking</a></h3>
                                        <p>Direct enough off others say eldest may exeter she pain oni. Possible all ignorant supplied get settling marriage</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 service-border">
                                <div class="service-item wow fadeInUp">
                                    <div class="service-img bg-default"></div>
                                    <div class="service-icon">
                                    <svg class="h-10 w-15 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="8" width="4" height="4" />  <line x1="6" y1="4" x2="6" y2="8" />  <line x1="6" y1="12" x2="6" y2="20" />  <rect x="10" y="14" width="4" height="4" />  <line x1="12" y1="4" x2="12" y2="14" />  <line x1="12" y1="18" x2="12" y2="20" />  <rect x="16" y="5" width="4" height="4" />  <line x1="18" y1="4" x2="18" y2="5" />  <line x1="18" y1="9" x2="18" y2="20" /></svg>
                                    </div>
                                    <div class="service-content">
                                        <h3 class="service-content-title"><a href="service-details.html">Electrical Maintenance</a></h3>
                                        <p>As a company we are able to offer a fully tailored Maintenance program to suit individual customers’ requirements</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 service-border">
                                <div class="service-item wow fadeInUp">
                                    <div class="service-img bg-default"></div>
                                    <div class="service-icon">
                                    <svg class="h-8 w-8 text-green-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" />  <line x1="11" y1="8" x2="11" y2="14" />  <line x1="8" y1="11" x2="14" y2="11" /></svg>
                                    </div>
                                    <div class="service-content">
                                        <h3 class="service-content-title"><a href="service-details.html">Building Management</a></h3>
                                        <p>Industrial, Commercial or Domestic; whatever the need, our company is able to offer a tailored installation to fully automate lighting, power equipment, data, security</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6 service-border">
                                <div class="service-item wow fadeInUp" data-wow-delay="0.8s">
                                    <div class="service-img bg-default" data-background="assets/img/service/5.jpg"></div>
                                    <div class="service-icon">
                                    <svg class="h-8 w-8 text-blue-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="18" cy="18" r="3" />  <circle cx="6" cy="6" r="3" />  <path d="M6 21V9a9 9 0 0 0 9 9" /></svg>
                                    </div>
                                    <div class="service-content">
                                        <h3 class="service-content-title"><a href="service-details.html">Commercial Installation</a></h3>
                                        <p>Commercial and Industrial installations form the backbone of the company’s day to day operations. Our commercial side covers all manner of works including factory</p>
                                    </div>
                                </div>
                                </div>
                                </div>
                </div>
            </div>
        </section>
        
        {/* short projects */}
        
            <ShortProduct />

        {/* networking section */}
        <section className="networking">

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <Image className="images1 w-full h-full object-cover object-center" sizes='100vw' full alt="Image" src={net}  width={300} height={200}/>
                    </div>
                    <div className="col-md-6">
                        <h1 className="section-title">Data Installations.</h1>
                        <div className="backsection">
                        <p className="section-text">
                        The design and installation of data cabling is a common request from our clients to complete the administration side to their businesses.<br/>
                        Generally Local Area Network (LAN) cabling is installed beneath suspended floors or within the framework of the building, 
                        supplying computers and telephones etc. via panel

                        </p>
                        </div>
                        <div class="product-circle mb-70">
                                    <div class="product-circle-item wow fadeInUp" data-wow-delay="0.7s">
                                        <svg class="radial-progress web-design" data-percentage="70" viewBox="0 0 80 80">
                                            <circle class="incomplete" cx="40" cy="40" r="35"></circle>
                                            <circle class="complete" cx="40" cy="40" r="35"></circle>
                                            <text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">70%</text>
                                        </svg>
                                        <h4 class="product-item-title">CCTV Cameras</h4>
                                    </div>
                                    <div class="product-circle-item wow fadeInUp" data-wow-delay="0.85s">
                                        <svg class="radial-progress web-design" data-percentage="65" viewBox="0 0 80 80">
                                            <circle class="incomplete" cx="40" cy="40" r="35"></circle>
                                            <circle class="complete" cx="40" cy="40" r="35"></circle>
                                            <text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">65%</text>
                                        </svg>
                                        <h4 class="product-item-title">Motion Sensor Alarms</h4>
                                    </div>
                                    <div class="product-circle-item wow fadeInUp" data-wow-delay="1s">
                                        <svg class="radial-progress web-design" data-percentage="80" viewBox="0 0 80 80">
                                            <circle class="incomplete" cx="40" cy="40" r="35"></circle>
                                            <circle class="complete" cx="40" cy="40" r="35"></circle>
                                            <text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">80%</text>
                                        </svg>
                                        <h4 class="product-item-title">Electrical Installation</h4>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </section>
                            
        <section className="product-wrapper-bg">
        {/* #022188 */}
        <div class="container">
                            <div class="inner-wrap">
                                <div class="product-content has-spaces">
                                    <div class="product-inner">
                                        <div class="product-item wow fadeInUp" data-wow-delay="0.3s">
                                            <div class="product-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z" fill="#022188"></path> </g></svg>
                                            </div>
                                            <div class="product-info">
                                                <h4>Computers<br/> Maintenance</h4>
                                            </div>
                                        </div>
                                        <div class="product-item wow fadeInUp" data-wow-delay="0.55s">
                                            <div class="product-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6H8C7.05719 6 6.58579 6 6.29289 6.29289C6 6.58579 6 7.05719 6 8C6 8.94281 6 9.41421 6.29289 9.70711C6.58579 10 7.05719 10 8 10H11C11.9428 10 12.4142 10 12.7071 9.70711C13 9.41421 13 8.94281 13 8C13 7.05719 13 6.58579 12.7071 6.29289C12.4142 6 11.9428 6 11 6Z" stroke="#011e7e" stroke-width="1.5"></path> <path d="M7 17H12" stroke="#011e7e" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 22H2" stroke="#011e7e" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.5 4L20.7331 4.98647C20.8709 5.09673 20.9398 5.15186 21.0025 5.20805C21.5937 5.73807 21.9508 6.48086 21.9953 7.27364C22 7.35769 22 7.44594 22 7.62244V18.5C22 19.3284 21.3284 20 20.5 20C19.6716 20 19 19.3284 19 18.5V18.4286C19 17.6396 18.3604 17 17.5714 17H16" stroke="#011e7e" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 8H20.5C19.6716 8 19 8.67157 19 9.5V11.9189C19 12.5645 19.4131 13.1377 20.0257 13.3419L22 14" stroke="#011e7e" stroke-width="1.5" stroke-linecap="round"></path> <path d="M16 22V15M3 22V18M3 14V8C3 5.17157 3 3.75736 3.87868 2.87868C4.75736 2 6.17157 2 9 2H10C12.8284 2 14.2426 2 15.1213 2.87868C16 3.75736 16 5.17157 16 8V11" stroke="#011e7e" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                            </div>
                                            <div class="product-info">
                                                <h4>Diesel Engines</h4>
                                            </div>
                                        </div>
                                        <div class="product-item wow fadeInUp" data-wow-delay="0.7s">
                                            <div class="product-icon">
                                            <svg viewBox="0 0 48 48" id="a" xmlns="http://www.w3.org/2000/svg" fill="#022188"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs></defs><path class="b" d="m36,24.12l1.6199-1.62,5.8801,5.88m-10.5-7.26l4.6199-4.62,5.8801,5.88m-39,3.144l5.3181,5.3181,3.3419-3.3421m-8.66-7.976l5.3181,5.3181,5.3419-5.4421m-1.1645,4.4215c.9483,4.7738,5.1374,8.2125,10.0045,8.2125s9.0562-3.4387,10.0045-8.2125M24,7.425h0c3.5725,0,6.4685,2.896,6.4685,6.4685v8.007c0,3.5725-2.896,6.4685-6.4685,6.4685h0c-3.5725,0-6.4685-2.896-6.4685-6.4685v-8.007c0-3.5725,2.896-6.4685,6.4685-6.4685Zm2.499,24.3525v8.2535c0,.2972-.2384.5394-.5355.544h-3.927c-.2971-.0046-.5355-.2468-.5355-.544v-8.2535"></path></g></svg>
                                            </div>
                                            <div class="product-info">
                                                <h4>Voice<br/> System</h4>
                                            </div>
                                        </div>
                                        <div class="product-item wow fadeInUp" data-wow-delay="0.85s">
                                            <div class="product-icon">
                                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#022188"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#022188" d="M109.285 30.402c-14.82-.007-30.414 2.144-46.822 6.932a9.5 9.5 0 0 0-.145.05 9.5 9.5 0 0 0-.496.173 9.5 9.5 0 0 0-.39.152 9.5 9.5 0 0 0-.47.218 9.5 9.5 0 0 0-.384.193 9.5 9.5 0 0 0-.463.273 9.5 9.5 0 0 0-.342.22 9.5 9.5 0 0 0-.435.32 9.5 9.5 0 0 0-.324.256 9.5 9.5 0 0 0-.397.357 9.5 9.5 0 0 0-.297.29 9.5 9.5 0 0 0-.37.405 9.5 9.5 0 0 0-.247.293 9.5 9.5 0 0 0-.342.463 9.5 9.5 0 0 0-.215.315 9.5 9.5 0 0 0-.282.472 9.5 9.5 0 0 0-.193.354 9.5 9.5 0 0 0-.233.497 9.5 9.5 0 0 0-.156.367 9.5 9.5 0 0 0-.178.512 9.5 9.5 0 0 0-.122.386 9.5 9.5 0 0 0-.17.688L33.42 156.55a9.5 9.5 0 0 0 5.625 10.614l82.023 34.578 31.62 162.133-116.534 25.313a9.5 9.5 0 0 0-7.5 9.156l-1.062 76.47a9.5 9.5 0 0 0 12.375 9.186l146.468-46.813 24.123-4.677c.177.003.353.015.53.015 9.956 0 19.332-4.742 25.88-12.472 6.543-7.724 9.966-17.79 9.956-28.16v-.026c.006-6.574-1.372-13.037-4.045-18.855l-25.273-130.57 125.774 53.02a9.5 9.5 0 0 0 .155.058 9.5 9.5 0 0 0 .545.197 9.5 9.5 0 0 0 .35.11 9.5 9.5 0 0 0 .543.138 9.5 9.5 0 0 0 .416.086 9.5 9.5 0 0 0 .483.073 9.5 9.5 0 0 0 .482.05 9.5 9.5 0 0 0 .43.02 9.5 9.5 0 0 0 .54.004 9.5 9.5 0 0 0 .363-.01l83.406-5.28a9.5 9.5 0 0 0 7.97-5.438l50.522-106.954.008-.014a9.5 9.5 0 0 0 0-.002 9.5 9.5 0 0 0 .02-.047 9.5 9.5 0 0 0-5.51-13.137c-7.787-4.27-15.802-7.26-23.956-9.148L152.273 36.688a9.5 9.5 0 0 0-.802-.268c-13.317-3.843-27.364-6.01-42.185-6.018zM82.938 44.125a9.5 9.5 0 0 1 3.687.72l290.75 116.53a9.508 9.508 0 0 1 5.77 10.79 9.5 9.5 0 0 0-.707 1.46l-.836 2.07a9.508 9.508 0 0 1-11.29 3.336L79.563 62.47a9.5 9.5 0 0 1 3.376-18.345zm357.308 128.367c4.4.038 8.75.508 13.068 1.404l14.74 5.72-23.67 50.114c.912-4.058 1.378-8.082 1.335-11.855-.1-8.732-2.94-15.95-7.845-19.563-4.905-3.613-11.688-3.48-18.375.25-1.65.92-3.305 2.063-4.906 3.375.614-.822 1.19-1.72 1.687-2.687 1.417-2.757 2.248-5.952 2.22-8.78-.032-2.835-.945-5.243-2.563-6.47-.808-.613-1.74-.922-2.75-.906-1.01.016-2.102.332-3.156.937-2.107 1.212-4.08 3.52-5.5 6.282-1.417 2.764-2.25 5.948-2.217 8.782.03 2.833.945 5.242 2.562 6.47 1.617 1.225 3.798 1.147 5.906-.064-3.416 3.562-6.546 7.9-9.092 12.72-4.608 8.716-7.226 18.798-7.125 27.53.1 8.732 3 15.98 7.906 19.594 4.904 3.614 11.624 3.45 18.31-.28 4.178-2.332 8.29-6.018 11.91-10.582l-8.41 17.8-62.75 4 37.253-92.39c14.635-7.746 28.272-11.513 41.463-11.4zm-298.078 38.145l16.014 6.752 29.732 139.555c-3.005-.917-6.143-1.41-9.342-1.41-2.724 0-5.4.366-7.988 1.037l-28.416-145.935zm37.353 15.748l17.017 7.174 23 118.83c-2.732-.75-5.564-1.156-8.447-1.156-1.643 0-3.266.14-4.865.39l-26.704-125.24zM211.09 370.3c3.863 0 8.258 1.978 11.472 5.772 3.215 3.795 5.433 9.89 5.424 15.795a9.47 9.532 0 0 0 0 .026c.01 5.905-2.21 12-5.423 15.795-1.525 1.8-3.316 3.177-5.188 4.142l-6.143 1.19c2.106-5.273 3.184-11.002 3.178-16.827v-.025c.004-3.773-.452-7.51-1.342-11.107a9.5 9.5 0 0 0-.193-2.248l-2.656-12.458c.29-.022.583-.055.87-.055zm-32.518 4.3c3.864 0 8.26 1.978 11.475 5.773 3.214 3.795 5.43 9.89 5.422 15.795a9.47 9.532 0 0 0 0 .025c.008 5.905-2.21 12-5.423 15.795-3.215 3.795-7.61 5.774-11.475 5.774-3.863 0-8.233-1.98-11.447-5.774-3.214-3.794-5.458-9.89-5.45-15.795a9.47 9.532 0 0 0 0-.025c-.008-5.905 2.236-12 5.45-15.795s7.584-5.773 11.447-5.773zm-34.496 10.59c-.87 3.56-1.316 7.25-1.312 10.978v.025c-.01 10.37 3.41 20.437 9.953 28.16.838.99 1.723 1.93 2.648 2.817L46.78 461.875l.782-55.72 96.514-20.966z"></path></g></svg>
                                            </div>
                                            <div class="product-info">
                                                <h4>CCTV <br/> installation</h4>
                                            </div>
                                        </div>
                                        <div class="product-item wow fadeInUp" data-wow-delay="1s">
                                            <div class="product-icon">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12.5V15.5" stroke="#022188" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            </div>
                                            <div class="product-info">
                                                <h4>Security<br/> Consulting</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
        </section>   
        <br/>
        
        <Card/>       

        </>
    )
}

export default Services;