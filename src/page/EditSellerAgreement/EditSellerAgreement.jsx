import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useEffect, useState } from "react";
import { useGetAllSellerAgreementQuery, useUpdateSellerAgreementMutation, } from "../../redux/features/Agreement/Agreement";

// Simple function to strip HTML tags
const stripHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const EditSellerAgreement = () => {
  const { data } = useGetAllSellerAgreementQuery();
  const [updatePrivacyPolicy] = useUpdateSellerAgreementMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.data?.attributes.content) {
      // Strip HTML tags from the content
      const plainText = stripHtmlTags(data?.data?.attributes.content);
      setContent(plainText);
    }
  }, [data]);

  const handleSubmit = async () => {
    // Ensure content is not empty
    if (!content) {
      message.error("Content cannot be empty.");
      return;
    }

    try {
      // Prepare the update payload
      const updatedContent = { content };

      // Send the update request
      const result = await updatePrivacyPolicy(updatedContent);

      // Provide feedback to the user
      if (result) {
        message.success("Seller agreement updated successfully!");
        navigate("/settings/SellerAgreement");
      }
    } catch (error) {
      message.error("Failed to update user agreement");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings/UserAgreement">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Seller Agreement</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md bg-[#E5F6FD]">
        {content && (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="content" initialValue={content}>
              <ReactQuill
                value={content} // Use value instead of defaultValue for controlled input
                onChange={(value) => setContent(value)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline", "strike"],
                    [{ align: [] }],
                    [{ color: [] }, { background: [] }],
                    ["blockquote", "code-block"],
                    ["link", "image", "video"],
                    [{ script: "sub" }, { script: "super" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    ["clean"],
                  ],
                }}
                style={{ height: "300px" }}
              />
            </Form.Item>

            {/* Update Button */}
            <div className="flex justify-end mt-16">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#193664] text-white px-5 py-2 rounded-md"
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </div>
    </section>
  );
};

export default EditSellerAgreement;