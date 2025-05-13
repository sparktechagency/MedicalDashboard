
import Logo from "../../../assets/auth/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Checkbox, message } from "antd";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import {
  loggedUser,
  updateToken,
} from "../../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await login({ email, password });
      if (res?.data?.code === 200) {
        const user = res?.data?.data?.attributes?.user;
        const token = res?.data?.data?.attributes?.tokens?.access?.token;
        dispatch(loggedUser({ user, token }));
        message.success(res.data.message || "Login successful!");
        navigate("/");
      } 
    } catch (error) {
        console.error(error);
        message.error(error.message);
      }
    }
  

  const { t } = useTranslation();

  return (
    <div
      className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white  bg-cover bg-center bg-no-repeat"

    >
      <div className="mt-16 px-8 bg-[#707070b2] rounded-md p-5 w-full md:w-[80%]">
        <div className="mb-2">
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px] mb-5 rounded-md mx-auto"
          />
          <h1 className="font-semibold text-3xl text-white text-center">
            Sign In
          </h1>
        </div>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <CustomInput
              type="email"
              icon={HiOutlineMail}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <CustomInput
              type="password"
              icon={HiOutlineLockClosed}
              placeholder="Password"
              isPassword
            />
          </Form.Item>

          <div className="flex justify-between items-center text-white">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-white">Remember me</Checkbox>
            </Form.Item>
            <Link to="/auth/forget-password" className="text-white">
              Forgot password
            </Link>
          </div>

          <Form.Item>
            <CustomButton
              loading={isLoading}
              className="w-full font-semibold"
              border={true}
            >
              {t("Sign In")}
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
