import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import Logo from "@/assets/img/logo.jpg"

const Aside = () => {
  return (
    <div className='relative overflow-hidden md:flex hidden w-1/2 bg-primary flex-col justify-between p-10'>
        <img src={Logo} alt="Logo" className='h-18 w-18'/>
        <div className='space-y-1'>
            <h1 className='text-white font-bold text-4xl'>
                Hotels Menagement
            </h1>
            <p className='text-white'>The most popular HM in the world!</p>
            <Link to="/" className="mt-2">
            <Button variant="secondary" size="sm" className="mt-3">Landing Page</Button>
            </Link>
        </div>
    </div>
  )
}

export default Aside