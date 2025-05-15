import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useEffect, useState } from "react";
import {
  useGetAllPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../redux/features/PrivacyPolicy/PrivacyPolicyApi";

const EditPrivacyPolicy = () => {
  const { data } = useGetAllPrivacyPolicyQuery();
  const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [content, setContent] = useState(data?.data?.attributes[0]?.content);
  useEffect(() => {
    if (data?.data?.attributes[0]?.content) {
      setContent(data?.data?.attributes[0]?.content);
    }
  }, [data]);

  const handleSubmit = async () => {
    // Extract plain text from Quill content
    const plainText = content.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags and trim whitespace

    console.log(plainText);
    // Ensure content is not empty
    if (!plainText) {
      message.error("Content cannot be empty.");
      return;
    }

    try {
      // Prepare the update payload
      const updatedContent = { content: plainText };

      // Send the update request
      const result = await updatePrivacyPolicy(updatedContent);

      // Provide feedback to the user
      if (result) {
        message.success("About Us section updated successfully!");
        navigate("/settings/privacy-policy");
      }
    } catch (error) {
      message.error("Failed to update About Us section.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Privacy Policy</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md bg-[#E5F6FD]">
        {content && (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="content" initialValue={content}>
              <ReactQuill
                defaultValue={content}
                onChange={(value) => setContent(value)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
                    [{ font: [] }], // Font options
                    [{ list: "ordered" }, { list: "bullet" }], // Ordered and bullet lists
                    ["bold", "italic", "underline", "strike"], // Formatting options
                    [{ align: [] }], // Text alignment
                    [{ color: [] }, { background: [] }], // Color and background
                    ["blockquote", "code-block"], // Blockquote and code block
                    ["link", "image", "video"], // Link, image, and video upload
                    [{ script: "sub" }, { script: "super" }], // Subscript and superscript
                    [{ indent: "-1" }, { indent: "+1" }], // Indent
                    ["clean"], // Remove formatting
                  ],
                }}
                style={{ height: "300px" }} // Set the increased height
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

export default EditPrivacyPolicy;
