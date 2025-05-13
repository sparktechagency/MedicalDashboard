/* eslint-disable no-unused-vars */
import Logo from "../../../assets/auth/Logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";

import { toast } from "sonner";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";


const Otp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  console.log(email)
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue) => {
    console.log(otpValue)
    setOtp(otpValue);
  };
  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({ code:otp, email });
      console.log(res)
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res?.data?.message);
        // const changePasswordToken = res?.data?.data?.attributes?.tokens?.access?.token;
        // dispatch(
        //   updatePasswordChangeToken({
        //     changePasswordToken: changePasswordToken,
        //   })
        // );
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) {
        toast.error(res?.error?.data?.message);
        console.log(res.error);
      }
      if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center  px-5 py-10 gap-8 bg-white bg-cover bg-center bg-no-repeat"
    >
      <div className="mt-16 md:mt-[115px] bg-[#707070b2] rounded-md p-5 w-full md:w-[80%]">
        <div className="mb-2">
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px] mb-5 rounded-md mx-auto"
          />
          <h1 className="font-semibold text-3xl text-white text-center">
            Verify Email
          </h1>
          <h1 className="text-gray-300 text-left text-xl py-1">
            Please enter the otp we have sent you in your email.
          </h1>
        </div>
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="otp-container"
          inputStyle={{
            width: "100%",
            maxWidth: "6.5rem",
            height: "3rem",
            margin: "0 0.5rem",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #1397D5",
            textAlign: "center",
            outline: "none",
          }}
        />
        <div onClick={handleMatchOtp} className="mt-5">
          <CustomButton loading={isLoading} border className="w-full">
            {t("Verify")}
          </CustomButton>
        </div>
        <div className="flex justify-between items-center my-4 px-2">
          <h1 className="text-white">Didn’t receive code?</h1>
          <button onClick={handleResendPassword} className="text-white">
            {t("Resend")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
