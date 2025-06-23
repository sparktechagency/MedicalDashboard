import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "../../../redux/features/profile/profileApi";
import { useEffect } from "react";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const PersonalInformation = () => {
  const { data, refetch,} = useGetUserQuery();
  const user = data?.attributes?.user
  console.log(user)


  const { t } = useTranslation();

  // Optionally, you can use useEffect to refetch on mount if needed
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="w-full lg:px-5">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center py-1 md:my-2 lg:my-6">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">
            {t("Personal Information")}
          </h1>
        </div>
      </div>

      {/* Profile Information */}
      <div className="w-full md:w-[95%] lg:w-[50%] py-5 px-14 rounded-md bg-[#E5F6FD] h-full md:mt-1  mx-auto">
        {/* Profile Picture */}
        <div className="rounded-lg flex justify-center items-center flex-col ">
          
        <div className="rounded-lg flex justify-center items-center flex-col ">
  <img
    className="border size-32 rounded-full mx-auto"
    src={user?.image ? `${imageBaseUrl}/${user?.image}` : '/path/to/default/image.jpg'}
    alt="Profile"
  />
</div>
          
        </div>
        {/* Personal Details */}
        <form className="w-full col-span-full md:col-span-9 space-y-6 md:mt-10">
          <div className="space-y-1">
            <label className="block text-sm font-semibold">{t("Name")}</label>
            <input
              type="text"
              defaultValue={user?.name}
              readOnly
              className="w-full  rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">{t("Email")}</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="w-full  rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Contact no</label>
            <input
              type="text"
              defaultValue={user?.phone}
              readOnly
              className="w-full  rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              defaultValue={user?.address}
              readOnly
              className="w-full  rounded-lg px-5 py-2 bg-white outline-none"
            />
          </div>
          <div className="flex justify-center">
            <Link to="/edit-personal-info">
              <button className="px-8 py-3 bg-[#48B1DB] text-white rounded-lg">
                {t("Edit Profile")}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
