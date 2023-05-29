import React from 'react'
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

const Slider = () => {
  return (
    <>
   <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          style={{ maxHeight:'500px'}}
          src="
            https://images.unsplash.com/photo-1572529593091-6c05c37cacc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a29oJTIwc2FtdWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60  
          "
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          style={{ maxHeight:'500px'}}
          src="
            https://images.unsplash.com/photo-1446822800434-3873731dc998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a29oJTIwc2FtdWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60
          
          "
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ maxHeight:'500px'}}
          src="
          https://images.unsplash.com/photo-1564030915877-c65e6e6a1247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGtvaCUyMHNhbXVpfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60
          "
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    </>
  )
}

export default Slider
