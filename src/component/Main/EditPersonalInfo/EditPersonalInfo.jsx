import { Form } from "antd";
import { useEffect, useState, useRef } from "react";
import { IoChevronBack, IoCameraOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useTranslation } from "react-i18next";

const EditInformation = () => {
  const { data } = useGetUserQuery();
  const user = data?.attributes?.user;
  // console.log(user);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [updateProfileInfo, { isLoading }] = useUpdateUserMutation();

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    user?.profileImage ? `${imageBaseUrl}${user.profileImage}` : null
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        callingCode: user.callingCode || "",
        phoneNumber: user.phoneNumber || "",
        nidNumber: user.nidNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        address: user.location?.locationName || "", // Assuming you want to display location as address
      });
    }
  }, [user, form]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageFile(file); // Store file to send on update
      setImageUrl(newImageUrl); // Show preview
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const onFinish = async (values) => {
    const formdata = new FormData();

    // Append the updated values with updated field names
    formdata.append("first_name", values.firstName);  // Changed field name
    // formdata.append("last_name", values.lastName);    // Changed field name
    formdata.append("phone_number", values.phoneNumber); // Changed field name
    formdata.append("address", values.address);

    // Add image if updated
    if (imageFile) {
      formdata.append("profileImage", imageFile);  // Changed field name
    }

    try {
      const response = await updateProfileInfo(formdata);
      console.log(response);
      if (response.error) {
        toast.error(response.error.data.message);
      }
      if (response.data) {
        toast.success("Profile updated successfully!");
        navigate("/personal-info");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating your profile.");
    }
  };

  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex items-center my-6">
          <Link to="/personal-info">
            <IoChevronBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-semibold">{t("Edit Information")}</h1>
        </div>
      </div>
      {/* Profile Information */}
      <div className="w-full md:w-[95%] lg:w-[50%] p-7 px-14 rounded-md bg-[#E5F6FD] h-full md:mt-1  mx-auto mb-5">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div onClick={handleDivClick} className="cursor-pointer">
            {imageUrl ? (
              <>
                <img
                  className="border rounded-full w-[130px] h-[130px]"
                  src={imageUrl}
                  alt="Profile Preview"
                />
              </>
            ) : (
              <div className="border rounded-3xl p-5 text-white ">
                <IoCameraOutline size={60} />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {/* Edit Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-full col-span-full md:col-span-9 space-y-6 mt-5"
        >
          {/* First Name */}
          <Form.Item label={t("User Name")} name="firstName">
            <CustomInput placeholder="Enter your first name" />
          </Form.Item>

          {/* Last Name */}
          {/* <Form.Item label={t("Last Name")} name="lastName">
            <CustomInput placeholder="Enter your last name" />
          </Form.Item> */}

          {/* Phone Number */}
          <Form.Item label={t("Phone Number")} name="phoneNumber">
            <CustomInput placeholder="Enter your phone number" />
          </Form.Item>

          {/* Address */}
          <Form.Item label={t("Address")} name="address">
            <CustomInput placeholder="Enter your address" />
          </Form.Item>

          {/* Submit Button */}
          <div className="flex justify-center">
            <CustomButton loading={isLoading} className="px-5 py-3">
              {t("Update Information")}
            </CustomButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditInformation;
