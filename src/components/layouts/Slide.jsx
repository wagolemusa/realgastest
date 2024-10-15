'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Image from "next/image";
import camera from '../../../public/images/camera.jpg'
import vbb from '../../../public/images/vbb.jpg'
import slider2 from '../../../public/images/slider2.jpg'
import './styles.css'


function Slide() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
      <div className='back'>
        <Image className="images1 w-full h-full object-cover object-center" sizes='100vw' full alt="Image" src={camera}  width={300} height={200}/>
        <Carousel.Caption>
            <p>Keep Safe & Happy Your Mind</p>
            <h3>Choice For Security Service</h3>
            <button type="button" class="btn btn-primary">ReadMore</button>

        </Carousel.Caption>
        </div>
       
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <Image className="images1 w-full h-full object-cover object-center" sizes='100vw' full alt="Image" src={slider2}  width={300} height={200}/>
        <Carousel.Caption>
        <p>Keep Safe & Happy Your Mind</p>
          <h3>Network and power curcuits</h3>
          <button type="button" class="btn btn-primary">ReadMore</button>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="images1 w-full h-full object-cover object-center" sizes='100vw' full alt="Image" src={vbb}  width={300} height={200}/>
        <Carousel.Caption>
        <p>Choice For Security Service</p>
        <h3>Electrical Accessories & Installation</h3>
        <button type="button" class="btn btn-primary">ReadMore</button>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slide;
