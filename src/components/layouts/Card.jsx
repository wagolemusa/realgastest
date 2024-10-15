'use client'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './styles.css';
import Image from "next/image";
import fathil from '../../../public/images/fathil.jpg'
import ijm from '../../../public/images/ijm.jpg'
import iuiu from '../../../public/images/iuiu.jpg'
import pride from '../../../public/images/pride.jpg'
import olympic from '../../../public/images/olympic.png'
import ku from '../../../public/images/ku.jpg'
import npa from '../../../public/images/npa.png'

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

export default function Card() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      // progressCircle.current.style.setProperty('--progress', 1 - progress);
      // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
  return (
    <section className='jobdone'>

     <div className='container'>
      <h2>Our Satified Clients</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
       
            
        <SwiperSlide>

            <div class="card">
            <div class="card-body">
              
            <Image  className='cardimage' src={ijm}  class="img-fluid rounded-circle" alt='silde'/>
              
                    <h5 class="card-title">International Justice Mission (IJM)</h5>
                <p class="card-text">Contracted NPC for: Network Installation Work Structure: Design and cable structuring </p>
                <br/><br/>
                
                <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
               
                    </div>
                   
                </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="card">
            
                <div class="card-body">
                <Image  className='cardimage' src={fathil}  class="img-fluid rounded-circle " alt='silde'/>
                    <h5 class="card-title">Fathil International Projects Ltd (FIPRO)</h5>
                    <p class="card-text">Contracted NPC for: Data and Electrical Network Installation
                        Work Structure: Design of lighting, Data and Power cabling.</p>
                        <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
                </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div class="card">
            <div class="card-body">
            <Image  className='cardimage' src={iuiu}  class="img-fluid rounded-circle" alt='silde'/>
                <h5 class="card-title">Islamic University in Uganda:</h5>
                <p class="card-text">Contracted NPC for: Data and Electrical Network installation, Work Structure: Design and Installation of Data and Electrical Power Network </p>
                <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide> 
        <div class="card">
            <div class="card-body">
            <Image  className='cardimage' src={pride}  class="img-fluid rounded-circle" alt='silde'/>
                <h5 class="card-title">Pride Microfinance Limited (MDI)</h5>
                <p class="card-text">Contracted NPC for: Work Structure: Data Networks and Electrical Installations,
                cable structuring, trunking work automatic transfer switches installation.
                </p>
                <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div class="card">
            <div class="card-body">
            <Image  className='cardimage' src={olympic}  class="img-fluid rounded-circle" alt='silde'/>
                <h5 class="card-title">Olympic Petroleum (U) Ltd</h5>
                <p class="card-text"> Contracted NPC for: Electrical refurbishment</p>
                <br/><br/>
                <br/>
                <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div class="card">
                <div class="card-body">
                <Image  className='cardimage' src={ku}  class="img-fluid rounded-circle" alt='silde'/>
                <h5 class="card-title">Kampala University</h5>
                <p class="card-text">Contracted NPC for: Electrical refurbishment </p>
                <br/><br/>
                <br/>
                <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div class="card">
            <div class="card-body">
            <Image  className='cardimage' src={npa}  class="img-fluid rounded-circle" alt='silde'/>
                <h5 class="card-title">National Planning Authority (NPA)</h5>
                <p class="card-text">Contracted NPC for: Electrical refurbishment </p>
                <br/><br/>
                <br/>
                <button type="button" class="btn btn-secondary btn-rounded">Status: Complete</button>
            </div>
            </div>
        </SwiperSlide>
 
      
        {/* <div className="autoplay-progress" slot="container-end"> */}
          {/* <svg viewBox="0 0 48 48" ref={progressCircle}> */}
            {/* <circle cx="24" cy="24" r="20"></circle> */}
          {/* </svg> */}
          {/* <span ref={progressContent}></span> */}
        {/* </div> */}
        
      </Swiper>
      
    </div>
    </section>
    
  );
}
