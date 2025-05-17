import DemoPieChart from "../../component/Main/Dashboard/DemoPieChart";
import PureComponentChart from "../../component/Main/Dashboard/PureComponentChart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";

const DashboardHome = () => {
  return (
    <section>
      <div className=" py-1">
        <Status />
        <br />
         <div className="w-full h-full md:h-[60vh]  flex flex-col gap-4 md:flex-row justify-between items-center">
        {/* Left Column: Chart */}
        <div className="w-full lg:w-[74%] bg-[#EEF9FE] rounded-md p-5">
          <PureComponentChart />
        </div>
        
        {/* Right Column: Pie Chart */}
        <div className="w-full lg:w-[24%]">
          <DemoPieChart />
        </div>
      </div>
        <RecentTransactions />
      </div>
      <br />
    </section>
  );
};

export default DashboardHome;
