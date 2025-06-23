/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuPackageOpen } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import LogoImage from "../../../assets/auth/Logo.png";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegMessage, FaUsersBetweenLines, FaUsersRectangle } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LuLayoutDashboard className="size-8" /> },
    { path: "/vendorRequest", label: "Product Request", icon: <FaUsersRectangle className="size-8" /> },
    { path: "/UploadProduct", label: "Upload Product", icon: <LuPackageOpen className="size-8" /> },
    { path: "/Orders", label: "Orders", icon: <TiShoppingCart className="size-8" /> },
    { path: "/users", label: "Users", icon: <FaRegUserCircle className="size-8" /> },
    { path: "/Vendorlist", label: "Seller", icon: <FaUsersBetweenLines className="size-8" /> },
    { path: "/Earnings", label: "Earnings", icon: <RiMoneyDollarCircleLine className="size-8" /> },
    { path: "/Reports", label: "Reports", icon: <TbMessageReport className="size-8" /> },
    { path: "/Message", label: "Message", icon: <FaRegMessage  className="size-7" /> },
    { path: "/settings", label: "Settings", icon: <IoSettingsOutline className="size-8" /> },
  ];

  const renderLinks = () =>
    navItems.map(({ path, label, icon }) => (
      <NavLink
        to={path}
        key={path}
        onClick={() => {
          if (isSidebarOpen) toggleSidebar(); // Close sidebar on mobile
        }}
        className={({ isActive }) =>
          `px-2 py-2 flex items-center gap-3 rounded-md transition-all ${
            isActive ? "bg-[#48B1DB] text-white" : "text-black"
          }`
        }
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    ));

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[320px] h-screen bg-gradient-to-b from-[#F5F9FA] to-[#48b1dbd3] fixed">
        <div className="flex justify-center items-center pt-5">
          <img src={LogoImage} alt="logo" className="w-[128px] h-[128px] rounded-md" />
        </div>
        <div className="border border-[#91C5DF] my-7"></div>
        <div className="flex flex-col flex-grow justify-between">
          <ul className="w-[70%] mx-auto flex flex-col gap-3">{renderLinks()}</ul>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-7 py-4 text-red-500 mb-5 ml-7"
          >
            <IoIosLogOut className="size-8" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-gradient-to-b from-[#F5F9FA] to-[#48b1dbd3] shadow-lg flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-center mt-5">
          <img src={LogoImage} alt="logo" className="w-46 h-24" />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <ul className="w-[80%] mx-auto flex flex-col gap-4">{renderLinks()}</ul>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-8 py-4 text-red-500 mt-5 mb-5 hover:bg-[#2c3e50] rounded-lg transition-all duration-200"
          >
            <IoIosLogOut className="text-xl" />
            <span className="text-base">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

