import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useCreateCategoryMutation } from "../../../redux/features/Category/Category";
import { message } from "antd";

const MAX_SIZE_MB = 10;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

const UploadCategory = () => {
  const [category, setCategory] = useState("");
  const [categoryFile, setCategoryFile] = useState(null); // Image file state
  const [error, setError] = useState(null);

  const [createCategory] = useCreateCategoryMutation();

  useEffect(() => {
    return () => {
      if (categoryFile) URL.revokeObjectURL(categoryFile);
    };
  }, [categoryFile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setError("Please upload a valid image file (JPG, JPEG, PNG, or SVG).");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError(null);
    setCategoryFile(file); // Store the file itself, not the object URL
  };

  const handleRemoveImage = () => {
    setCategoryFile(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!categoryFile) {
      setError("Please upload a category image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", category);
    formData.append("image", categoryFile); // Append the file object, not URL

    try {
      const res = await createCategory(formData);
      console.log(res);
      if (res?.data?.code === 201) {
        message.success(res?.data?.message);
      }
    } catch (err) {
      message.error("Failed to upload the category.");
    }
  };

  return (
    <section className="max-w-7xl bg-[#E6F1F8] p-8 rounded-lg shadow-lg mb-11">
      <h2 className="text-black text-lg font-semibold mb-6">Upload Category</h2>

      <label>Category name</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Product Category"
        className="w-full mb-6 p-3 rounded border border-[#8EC9DB] placeholder-[#92BED6] text-sm outline-none focus:ring-2 focus:ring-[#8EC9DB]"
      />

      <label>Category Image</label>
      <div
        className="w-full h-14 flex items-center justify-center border border-[#8EC9DB] rounded cursor-pointer mb-6 hover:bg-[#d4e6f3]"
        onClick={() => document.getElementById("categoryInput").click()}
      >
        <input
          id="categoryInput"
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/svg+xml"
          className="hidden"
          onChange={handleImageUpload}
        />
        <FaCloudUploadAlt className="text-[#8EC9DB] mr-2" size={18} />
        <span className="text-[#8EC9DB] text-sm select-none">Upload category image</span>
      </div>

      {categoryFile && (
        <div className="mb-4 relative w-28 h-28 rounded overflow-hidden">
          {/* Display SVG directly */}
          {categoryFile.type === "image/svg+xml" ? (
            <object
              type="image/svg+xml"
              data={URL.createObjectURL(categoryFile)} // Display file directly as SVG
              className="object-contain w-full h-full"
            >
              <p>Your browser does not support SVGs.</p>
            </object>
          ) : (
            <img
              src={URL.createObjectURL(categoryFile)}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
          )}
          <button
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            type="button"
            aria-label="Remove Image"
          >
            ✕
          </button>
        </div>
      )}

      {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

      <button
        onClick={handleUpload}
        className="py-2 px-6 rounded-md bg-[#48B1DB] text-white text-sm font-semibold hover:bg-[#3a9cbf] transition"
        type="button"
      >
        Upload 
      </button>
    </section>
  );
};

export default UploadCategory;
