import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { Button } from "./../ui/button";
import { useNavigate } from "react-router-dom";
import {BiSolidDish} from "react-icons/bi";

const BootomNav = () => {
    const navigate = useNavigate();
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#fde4e4] p-3 h-16 flex justify-around shadow-md'>
        <Button onClick={() => navigate("DashboardLayout")}
        variant="outline"
        className="flex items-center justify-center text-[#333] bg-[#e0e0e0] w-[20%] rounded-lg"
>
    <FaHome className="inline mr-2" size={20}/>
    <p>Home</p>
    </Button>


        <Button onClick={() => navigate("/Waiter")}
        variant="outline"
        className="flex items-center justify-center text-[#333] bg-[#e0e0e0] w-[20%]"
>
    <MdOutlineReorder className="inline mr-2" size={20}/>
    <p>Waiters</p>
    </Button>   


        <Button onClick={() => navigate("/Tavles")}
        variant="outline"
        className="flex items-center justify-center text-[#333] bg-[#e0e0e0] w-[20%]"
>
    <MdTableBar className="inline mr-2" size={20}/>
    <p>Tables</p>
    </Button>   


        <Button 
        variant="outline"
        className="flex items-center justify-center text-[#333] bg-[#e0e0e0] w-[20%]"
>
    <CiCircleMore className="inline mr-2" size={20}/>
    <p>More</p>
    </Button>   
     </div>
  );
};

export default BootomNav