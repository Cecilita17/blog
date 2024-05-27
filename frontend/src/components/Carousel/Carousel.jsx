import Carousel from 'react-bootstrap/Carousel';
import Image from '../Image/Image';
import './Carousel.css'

function Carousels() {
  return (
    <Carousel className='carousel-display' style={{alignSelf: "center"}}>
      <Carousel.Item>
        <Image/>
      </Carousel.Item>
      <Carousel.Item>
      <Image/>
      </Carousel.Item>
      <Carousel.Item>
      <Image/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;