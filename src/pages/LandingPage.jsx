import React from 'react'
import { Link } from 'react-router-dom'
import {Button } from "@/components/ui/button" 
import { ArrowRight, Lightbulb} from "lucide-react";
import WebImage from '../components/shared/landing/WebImage';

const LandingPage = () => {
  return (
    <main className='pt-24 bg-white'>
      <div className='px-12 mx-auto max-w-7xl'>
        <div className='w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center'>
         <h1 className='mb-8 font-extrabold leading-none tracking-normal text-slate-800 md:text-6xl text-4xl md:tracking-tight'>
          <span>Start</span>{" "}
          <span className='block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-red-900 to-red-500 lg:inline'>managing hotels</span>{" "}
          <span>with us!</span>
         </h1>
         <p className='px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil cupiditate qui dolores rem distinctio, at quos in ipsa eos facere.
         </p>
         <div className='mb-4 space-x-0 md:space-x-2 md:mb-8'>
          <Button className="bg-red-700 hover:bg-red-900" asChild>
            <Link to="/login">Get Started <ArrowRight/></Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/register">Sign Up <Lightbulb/></Link>
          </Button>
         </div>
        </div>
        <WebImage/>
      </div>
    </main>
  )
}

export default LandingPage