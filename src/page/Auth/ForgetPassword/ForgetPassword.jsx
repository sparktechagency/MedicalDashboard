/* eslint-disable react/no-unescaped-entities */
import {  useNavigate } from "react-router-dom";
import Logo from "../../../assets/auth/Logo.png";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import { HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateToken } from "../../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      console.log(res)
      if (res.error) {
        toast.error(res?.error?.data?.message);
        // console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
        // console.log(res.data?.data?.token)
        dispatch(
          updateToken({
            token: res.data?.data?.token,
          })
        );
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white bg-cover bg-center bg-no-repeat"
    >
      <div className="mt-16 bg-[#707070b2] rounded-md p-5 w-full md:w-[80%]">
        <div className="mb-2">
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px] mb-5 rounded-md mx-auto"
          />
          <h1 className="font-semibold text-3xl text-white text-center">
          Forgot Password
          </h1>
          <h1 className="text-gray-300 text-center">Please enter your email address to reset <br />
          your password.</h1>
        </div>
        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={submit} // Ant Design form submission
          initialValues={{ email: "" }} // Set initial form values
        >
          {/* CustomInput wrapped in Form.Item for validation */}
          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <CustomInput icon={HiOutlineMail} placeholder="Email" />
          </Form.Item>

          {/* CustomButton for submit */}
          <Form.Item>
            <CustomButton
              loading={isLoading}
              border
              type="submit"
              className="w-full"
            >
              {t("Send OTP")}
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
