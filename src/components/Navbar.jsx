import React from 'react'
import Testim from './Testim'

const Navbar = ({titulli, nentitulli}) => {
  return (
    <div>
       <h1>{titulli}</h1>
       <h4>{nentitulli}</h4>

       <Testim/>
        </div>
  )
}

export default Navbar