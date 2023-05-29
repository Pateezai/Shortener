import React from 'react'
import NavComp from '../components/Topbar/NavComp.jsx'
import Slider from '../components/Content/Slider.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import Content from '../components/Content/Content.jsx'
import Sector from '../components/Content/Sector.jsx'
import Test from '../components/Content/test.jsx'




const Home = () => {
  return (
    <div>
      <NavComp/>
      {/* <Content/> */}
      {/* <Sector/> */}
      <Test/>
    </div>
  )
}

export default Home
