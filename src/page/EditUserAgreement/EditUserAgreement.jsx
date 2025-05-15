import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  useGetAllPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../redux/features/PrivacyPolicy/PrivacyPolicyApi";

const EditUserAgreement = () => {
  const { data, isLoading } = useGetAllPrivacyPolicyQuery();
  const [updatePrivacyPolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.data?.attributes?.[0]?.content) {
      setContent(data.data.attributes[0].content);
    }
  }, [data]);

  const handleSubmit = async () => {
    // Trim content and check if empty (strip HTML tags for check)
    const plainText = content.replace(/<[^>]*>/g, "").trim();

    if (!plainText) {
      message.error("Content cannot be empty.");
      return;
    }

    try {
      // Sending the full HTML content (not stripped)
      const updatedContent = { content };

      const result = await updatePrivacyPolicy(updatedContent).unwrap();

      message.success("User Agreement section updated successfully!");
      navigate("/settings/UserAgreement");
    } catch (error) {
      message.error("Failed to update User Agreement section.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5 px-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit User Agreement</h1>
        </div>
      </div>

      <div className="w-full p-6 rounded-lg shadow-md bg-[#E5F6FD]">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Content" required>
            <ReactQuill
              value={content}
              onChange={setContent}
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

          <div className="flex justify-end mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              className="bg-[#193664] text-white px-5 py-2 rounded-md"
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditUserAgreement;
