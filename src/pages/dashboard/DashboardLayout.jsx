import React from "react";
import Greetings from "../../components/shared/home/Greetings";
import MiniCard from "../../components/shared/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import PopularDishes from "../../components/shared/home/PopularDishes";
import BootomNav from  "../../components/shared/BootomNav";
import OrdersPage from "../../components/shared/home/Order";
import OrderLogs from "../../components/OrderLogs";

const DashboardLayout = () => {
  return (
    <section className="bg-[#fffdfd] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
{/*Left */}
   <div className="flex-[3]">
    <Greetings/>
    <div className="flex items-center w-full gap-3 px-8 mt-8">
      <MiniCard
      title="Total"
      icon={<BsCashCoin />}
      number={512}
      footerNum={1.15}
      />
      <MiniCard
      title="In Progress"
      icon={<GrInProgress />}
      number={12}
      footerNum={3.6}
      />
    </div>
  <OrdersPage/>
    </div>

    {/*Right */}
    <div className="flex-[2]">
      <PopularDishes/>
    </div>

    <BootomNav/>
    </section>
  );
};

export default DashboardLayout