/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, message, Modal, Switch } from "antd";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";
import { updatePasswordChangeToken } from "../../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";
// import { useChangePasswordMutation } from "../../../redux/features/profile/profileApi";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import { useChangePasswordMutation } from "../../../redux/features/profile/profileApi";
const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const token = useSelector((state) => state?.auth?.token);
  // console.log(token);

  const email = user?.email;
  // console.log(email);

  // console.log(user?.email)
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [otp, setOtp] = useState("");
  const [form] = Form.useForm();
  const changePasswordToken = useSelector(
    (state) => state.auth.changePasswordToken
  );
  //change password useing old password rtk query api
  const [changePassWithOldPass, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();
  // //forgot password rtk query api
  const [forgotPassword, { isLoading: forgotPasswordLoading }] =
    useForgotPasswordMutation();
  // console.log(forgotPasswordData)

  // //verify opt rtk query api
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyEmailMutation();
  // //change password rtk query api
  const [ResetPassword, { isLoading: resetPassLoading }] =
    useResetPasswordMutation();
  // console.log(changePassRes)

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handleNavigate = (value) => {
    if (value === "notification") {
      return;
    } else if (value === "change-password") {
      setModelTitle("Change password");
      setIsModalOpen(true);
    } else {
      navigate(`/settings/${value}`);
    }
  };
  const handleChangePassword = async (values) => {
    console.log(values);
    const { oldPassword, newPassword } = values;
    const data = { oldPassword, newPassword, };
    try {
      const res = await changePassWithOldPass(data);
      console.log(res);
      if(res?.data?.code === 200){
        message.success(res?.data?.message)
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("first");
    }
  };

  const handleForgetPassword = async (values) => {
    const res = await forgotPassword(values);
    console.log(res);
    setModelTitle("Verify OTP");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await verifyOtp({
      email: user?.email,
      otp,
    });

    const changePasswordToken = res.data?.token;
    console.log("change password token is", changePasswordToken);
    dispatch(
      updatePasswordChangeToken({
        changePasswordToken: changePasswordToken,
      })
    );

    if (res?.data?.success) {
      setModelTitle("Reset Password");
    }
  };

  const handleResetPassword = async (values) => {
    const res = await ResetPassword({
      jwtToken: changePasswordToken,
      newPassword: values?.password,
    });
    navigate(`/auth`);
  };
  const { t } = useTranslation();

  const settingsItem = [
    {
      title: `${t("Change password")}`,
      path: "change-password",
    },
    {
      title: `${t("Privacy Policy")}`,
      path: "privacy-policy",
    },
    {
      title: `${t("Terms & Conditions")}`,
      path: "terms-conditions",
    },
    {
      title: `${t("User Agreement")}`,
      path: "UserAgreement",
    },
    {
      title: `${t("About us")}`,
      path: "about-us",
    },
  ];

  return (
    <section className="w-full py-6 pr-3">
      {settingsItem.map((setting, index) => (
        <div
          key={index}
          className="w-full p-4 mb-2 text-sm rounded-lg bg-[#E5F6FD]  flex items-center justify-between cursor-pointer"
          onClick={() => handleNavigate(setting.path)}
        >
          <h2 className="font-semibold">{setting.title}</h2>
          <h2>
            {setting.path === "notification" ? (
              <Switch defaultChecked onChange={onChange} />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </h2>
        </div>
      ))}
      <Modal
        title={
          <div
            onClick={() => setIsModalOpen(false)}
            className="flex bg-primary items-center cursor-pointer text-black"
          >
            <h1 className="text-xl  font-medium  mb-5">{modelTitle}</h1>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        centered
      >
        {modelTitle === "Change password" && (
          <div className="w-full px-5 ">
            <p className="text-[14px] mb-[14px]">
              {t("Your password must be 8-10 character long.")}
            </p>
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleChangePassword}
            >
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Old Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Enter Your old Password"
                  name="oldPassword"
                  className="w-full px-3 py-2"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Input Your New Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Set Your New Password"
                  name="newPassword"
                  className="w-full px-3 py-2"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please Input Your Re-enter Password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  className="w-full px-3 py-2"
                />
              </Form.Item>
              <p className=" text-secondary font-medium">
                <button onClick={() => setModelTitle("Forget password")}>
                  <h1 className="underline text-[#48B1DB]">
                    {t("Forget Password")}
                  </h1>
                </button>
              </p>
              <Form.Item>
                <button
                  type="submit"
                  className="w-full px-5 py-4  mt-2 text-white bg-[#48B1DB] rounded-lg"
                >
                  {changePasswordLoading ? (
                    <h1 className="flex justify-center items-center gap-1">
                      <ImSpinner6 className="animate-spin size-5" />
                      <span>Update password</span>
                    </h1>
                  ) : (
                    ""
                  )}
                  {t("Update Password")}
                </button>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Forget password" && (
          <div className="w-full px-5">
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={handleForgetPassword}
              className="space-y-7 fit-content object-contain"
            >
              <div className="">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    name="email"
                    className="w-full px-3 py-2"
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <button
                  type="submit"
                  className="w-full px-5 py-4  mt-2 text-white bg-[#48B1DB] rounded-lg"
                >
                  {forgotPasswordLoading ? (
                    <h1 className="flex justify-center items-center gap-1">
                      <ImSpinner6 className="animate-spin size-5" />{" "}
                      <span>{t("Update password")}</span>
                    </h1>
                  ) : (
                    ""
                  )}
                  {t("Send OTP")}
                </button>
              </Form.Item>
            </Form>
          </div>
        )}
        {modelTitle === "Verify OTP" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <form onSubmit={handleVerifyOtp}>
              <p className="text-[16px] mb-[14px]">
                {t("Please enter your email address to recover your account.")}
              </p>
              <div className="">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    height: "50px",
                    background: "transparent",
                    width: "50px",
                    border: "1px solid #193664",
                    marginRight: "20px",
                    outline: "none",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
                <p className="flex items-center justify-between mt-2 mb-6">
                  {t("Didn’t receive code?")}
                  <button className="font-medium text-">{t("Resend")}</button>
                </p>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: "#193664",
                  color: "#fff",
                  size: "18px",
                  height: "56px",
                }}
                className="bg-[#48B1DB]
                w-full
                text-white mt-5 py-3 rounded-lg duration-200"
              >
                {verifyOtpLoading ? (
                  <h1 className="flex justify-center items-center gap-1">
                    <ImSpinner6 className="animate-spin size-5" />
                    <span>{t("Verify")}</span>
                  </h1>
                ) : (
                  ""
                )}
                {t("Verify")}
              </button>
            </form>
          </div>
        )}
        {modelTitle === "Reset Password" && (
          <div className="px-[60px] pb-[60px] bg-primary">
            <Form
              form={form}
              name="dependencies"
              autoComplete="off"
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
              className="space-y-4 fit-content object-contain"
              onFinish={handleResetPassword}
            >
              <Form.Item
                name="enter_password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  // onChange={handleChange}
                  placeholder="Set your password"
                  name="set_password"
                  prefix={
                    <HiOutlineLockClosed
                      className="bg-white rounded-full p-[6px]"
                      size={28}
                    />
                  }
                  className="bg-primary
                        rounded w-full 
                        justify-start 
                        mt-[12px]
                         outline-none focus:border-none border-secondary"
                />
              </Form.Item>

              {/* Field */}
              <Form.Item
                name="password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("enter_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter password"
                  name="re_enter_password"
                  prefix={
                    <HiOutlineLockClosed
                      className="bg-white rounded-full p-[6px]"
                      size={28}
                    />
                  }
                  className="p-4 bg-primary
                    rounded w-full 
                    justify-start 
                    mt-[12px]
                     outline-none focus:border-none border-secondary"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "#193664",
                    color: "#fff",
                    size: "18px",
                    height: "56px",
                  }}
                  htmlType="submit"
                  className="block w-full h-[56px] px-2 py-4 mt-2 text-white bg-[#48B1DB] rounded-lg"
                >
                  {resetPassLoading ? (
                    <h1 className="flex justify-center items-center gap-1">
                      <ImSpinner6 className="animate-spin siz" />{" "}
                      <span>{t("Update password")}</span>
                    </h1>
                  ) : (
                    ""
                  )}
                  {t("Update password")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Settings;
