import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useGetAllAboutsQuery, useUpdateAboutsMutation } from "../../redux/features/abouts/aboutsApi";
import decodeHtmlEntities from "../../utils/decodeHtmlEntities";

const EditAboutUs = () => {
  const { data } = useGetAllAboutsQuery();
  const aboutData = data?.data?.attributes?.content;

  const [update] = useUpdateAboutsMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [content, setContent] = useState('');

  useEffect(() => {
    // Ensure aboutData is decoded only once
    if (aboutData) {
      setContent(decodeHtmlEntities(aboutData)); // Decode once when aboutData is loaded
    }
  }, [data]);

  const handleSubmit = async () => {
    const plainText = content;

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
      const result = await update(updatedContent);

      // Provide feedback to the user
      if (result) {
        message.success("About Us section updated successfully!");
        navigate("/settings/about-us");
      }
    } catch (error) {
      message.error("Failed to update About Us section.");
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings/about-us">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit About Us</h1>
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
  style={{ height: "300px", textAlign: "left" }}
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

export default EditAboutUs;




