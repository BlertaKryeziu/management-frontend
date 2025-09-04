import { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaBell } from 'react-icons/fa';
import logo from "../../assets/img/logo.jpg";
import { io } from "socket.io-client";
import { Button } from "./../ui/button";

const socket = io("http://localhost:8095");

const Header = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    //porosit e reja
    socket.on("newOrder", (order) => {
      setNotifications(prev => [
        { type: "new", message: `Porosi e re: Tavolina ${order.table_number}`, id:order.id},
        ...prev
      ]);
    });

    //porosi te perditesuara
    socket.on("updateOrder", (order) => {
      setNotifications(prev => [
        {type: "update", message: `Porosia #${order.id} u perditesua: ${order.status}`, id:order.id},
        ...prev
      ]);
    });

    //porosi te fshira
    socket.on("deleteOrder", ({ id }) => {
      setNotifications(prev => [
        { type: "delete", message: `Porosia #${id} u fshi`, id },
        ...prev
      ]);
    });

    return() => {
      socket.off("newOrder").off("updateOrder").off("deleteOrder");
    };
  }, []);

  const handleBellClick = () => {
    setNotifications([]);  //fshin njoftimet kur klikohet
  };

  return(
    <header className="flex justify-between items-center py-4 px-8 bg-[#fde4e4]">
      {/*Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} className="h-8 w-8" alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#333]">Restaurant</h1>
      </div>

      {/*Search */}
      <div className="flex items-center gap-4 bg-[#f1f1f1] rounded-lg px-5 py-2 w-[500px]">
        <FaSearch className="text-[#333]"/>
        <input placeholder="Search" className="bg-[#f1f1f1] outline-none text-[#333]" />
      </div>


      {/*Logged */}
      <div className="flex items-center gap-4 relative">
        <Button 
        variant="outline"
        className="bg-[#f1f1f1] p-3 relative"
        onClick={handleBellClick}>

          <FaBell className="text-[#333]" size={20}/>
          {notifications.length > 0 && (
            <span className="absolute -top-1 -righ-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>


        {/*njoftimet */}
        {notifications.length > 0 && (
          <div className="absolute top-12 right-0 w-64 bg-white shadow-lg border rounded-md z-50">
            {notifications.map((note, idx) => (
              <div
              key={idx}
              className={`p-2 border-b last:border-b-0 text-sm ${
                note.type === "new" ? "bg-green-100" : 
                note.type === "update" ? "bg-yellow-100" : 
                "bg-red-100"
              }`}>
                {note.message}
              </div>
            ))}
          </div>
        )}


        <div className="flex items-center gap-3">
          <FaUserCircle className="text-[#333]" size={40}/>
          <div className="flex flex-col items-center">

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;