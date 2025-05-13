import Logo from "../../../assets/auth/Logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const NewPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { email } = useParams();
  console.log(email);

  const submit = async (values) => {
    const { password } = values;
    console.log(password);

    try {
      const res = await resetPassword({ email, password }).unwrap();
      console.log(res);

      // Handle the response from the API
      if (res?.code === 200) {
        // You can access the `message` and `data.attributes` here for further customization
        console.log("Attributes:", res.data?.attributes); // Display the attributes if needed

        // Navigate to the login page or wherever necessary
        navigate("/auth");
        toast.success(res.message || "Password updated successfully!");
      } else {
        // In case the code is not 200, handle it accordingly
        toast.error(res?.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white bg-cover bg-center bg-no-repeat"
    >
      <div className="mt-16 md:mt-[115px] bg-[#707070b2] rounded-md p-5 w-full md:w-[80%]">
        <div className="mb-2">
          <img
            src={Logo}
            alt="logo"
            className="w-[80px] h-[80px] mb-5 rounded-md mx-auto"
          />
          <h1 className="font-semibold text-3xl text-white text-center">
            Reset Password
          </h1>
          <h1 className="text-gray-300 text-center">
            Your password must be 8-10 characters long.
          </h1>
        </div>

        <Form
          layout="vertical"
          onFinish={submit}
          initialValues={{ password: "", confirmPassword: "" }}
        >
          <Form.Item
            label={<span className="text-white">New Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your new password" }, { min: 8, message: "Password must be at least 8 characters" }]}
          >
            <CustomInput isPassword type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Confirm</span>}
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue("password") === value) { return Promise.resolve(); } return Promise.reject(new Error("Passwords do not match!")); } })]}
          >
            <CustomInput isPassword type="password" placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <CustomButton loading={isLoading} border className="w-full">
              {t("Update Password")}
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;
