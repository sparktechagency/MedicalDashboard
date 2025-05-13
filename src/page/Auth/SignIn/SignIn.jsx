import signinImage from "../../../assets/auth/signIn.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Form, Checkbox } from "antd";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { loggedUser } from "../../../redux/features/auth/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await login({ email, password });
      if (res.error) {
        // Show error message if login fails
        toast.error(res.error.data.message);
      } else if (res.data) {
        const user = res?.data?.data?.attributes;
        const token = res?.data?.data?.token;
        dispatch(loggedUser({ user, token }));
        toast.success(res.data.message);
        navigate("/"); // Navigate to the root page after successful login
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-md">
        <div className="hidden md:block  justify-center bg-[#cbeafd]">
          <img
            src={signinImage}
            className="w-full h-full mx-auto object-cover rounded-md"
            alt="Sign in illustration"
          />
        </div>
        <div className="mt-16 px-8">
          <div className="mb-8">
            <h1 className="font-semibold text-3xl text-gray-800">
              Hello, Welcome!
            </h1>
            <p className="text-gray-500">
              Please Enter Your Details Below to Continue
            </p>
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
              label="Email"
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
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <CustomInput
                type="password"
                icon={HiOutlineLockClosed}
                placeholder="Password"
                isPassword
              />
            </Form.Item>

            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/auth/forget-password" className="text-[#1397D5]">
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <CustomButton
                loading={isLoading}
                className="w-full"
                border={true}
              >
                Sign In
              </CustomButton>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

