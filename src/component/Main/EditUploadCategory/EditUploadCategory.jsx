import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  useGetCategorySingleQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/Category/Category";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const MAX_SIZE_MB = 5;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const EditUploadCategory = () => {
  const { id } = useParams();
  const { data, } = useGetCategorySingleQuery(id);
  const category = data?.data?.attributes;
  
  const navigator = useNavigate();
  const [categoryUpdate] = useUpdateCategoryMutation();

  const imageRef = useRef(null);
  const previewRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      message.error("Please upload a valid image file (JPG, JPEG, or PNG).");
      e.target.value = ""; // reset file input
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      message.error(`File size must be less than ${MAX_SIZE_MB}MB.`);
      e.target.value = ""; // reset file input
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    previewRef.current.src = objectUrl;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await categoryUpdate({ id, data: formData });
      if (res?.data?.code === 200) {
        message.success(res?.data?.message || "Category updated successfully.");
        navigator("/AllCategory");
      } else {
        message.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to update category.");
    }
  };



  return (
    <section className="max-w-7xl bg-[#E6F1F8] p-8 rounded-lg shadow-lg mb-11">
      <h2 className="text-black text-lg font-semibold mb-6 flex items-center gap-2 cursor-pointer select-none">
        Edit Category
      </h2>

      <form onSubmit={handleUpload}>
        {/* Category Name */}
        <label className="block text-[#92BED6] text-xs mb-1">Product Category</label>
        <input
          type="text"
          name="name"
          defaultValue={category?.name || ""}
          placeholder="Type product category"
          className="w-full mb-6 p-3 rounded border border-[#8EC9DB] placeholder-[#92BED6] text-sm outline-none focus:ring-2 focus:ring-[#8EC9DB]"
        />

        {/* Image Upload */}
        <label className="block text-[#92BED6] text-xs mb-1">Product Image</label>
        <div
          onClick={() => imageRef.current.click()}
          className="w-full h-14 flex items-center justify-center border border-[#8EC9DB] rounded cursor-pointer mb-6 hover:bg-[#d4e6f3]"
        >
          <input
            id="imageInput"
            type="file"
            name="image"
            ref={imageRef}
            accept={VALID_IMAGE_TYPES.join(",")}
            className="hidden"
            onChange={handleImageUpload}
          />
          <FaCloudUploadAlt className="text-[#8EC9DB] mr-2" size={18} />
          <span className="text-[#8EC9DB] text-sm select-none">Upload an image</span>
        </div>

        {/* Preview Image */}
        <div className="mb-4 relative w-28 h-28 rounded overflow-hidden">
          <img
            ref={previewRef}
            src={`${category?.image}` || ""}  
            alt="Preview"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          className="py-2 px-6 rounded-md bg-[#48B1DB] text-white text-sm font-semibold hover:bg-[#3a9cbf] transition"
        >
          Upload
        </button>
      </form>
    </section>
  );
};

export default EditUploadCategory;


