/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useTranslation } from "react-i18next";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className=" w-full md:h-[80px] px-3 py-2  flex justify-between items-center  text-white sticky top-0 left-0 z-10 bg-[#48B1DB]">
      <div className="flex items-center gap-3 py-1 px-3 md:w-8/12 rounded">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex justify-between items-center gap-2 pl-2 mr-5">
        <div>
          <Link to="/notification">
            <div className="mr-4 bg-white rounded-full p-3">
              <IoNotificationsCircleOutline
                className="text-[#48B1DB]"
                size={30}
              />
            </div>
          </Link>
        </div>
        <img
          onClick={() => navigate("/personal-info")}
          src={
            user?.profileImage
              ? `${imageBaseUrl}${user?.profileImage}`
              : "/src/assets/user.png"
          }
          className="size-12 rounded-full cursor-pointer"
        />
        {/* Right Side */}
        <div className="text-white">
          <div className="mr-2">Hisham</div>
          <div className="text-sm">Admin</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
