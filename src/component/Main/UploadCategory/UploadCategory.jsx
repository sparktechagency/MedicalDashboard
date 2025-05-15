import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const MAX_IMAGES = 1;
const MAX_SIZE_MB = 5;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const UploadCategory = () => {
  const [productCategory, setProductCategory] = useState("");
  const [profileImages, setProfileImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      profileImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [profileImages]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    if (imageFiles.length + files.length > MAX_IMAGES) {
      setError(`You can upload only ${MAX_IMAGES} image.`);
      return;
    }

    const file = files[0];

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setError("Please upload a valid image file (JPG, JPEG, or PNG).");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError(null);
    profileImages.forEach((url) => URL.revokeObjectURL(url));

    setProfileImages([URL.createObjectURL(file)]);
    setImageFiles([file]);
  };

  const handleRemoveImage = () => {
    setProfileImages([]);
    setImageFiles([]);
    setError(null);
  };

  const handleUpload = () => {
    // Add upload logic here (API call, etc.)
    console.log("Uploading:", { productCategory, imageFiles });
  };

  return (
    <section className="max-w-7xl bg-[#E6F1F8] p-8 rounded-lg shadow-lg mb-11">
      <h2 className="text-black text-lg font-semibold mb-6 flex items-center gap-2 cursor-pointer select-none">
        Upload Category
      </h2>

      {/* Product Category */}
      <label className="block text-[#92BED6] text-xs mb-1">Product Category</label>
      <input
        type="text"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        placeholder="Type product category"
        className="w-full mb-6 p-3 rounded border border-[#8EC9DB] placeholder-[#92BED6] text-sm outline-none focus:ring-2 focus:ring-[#8EC9DB]"
      />

      {/* Product Image Upload */}
      <label className="block text-[#92BED6] text-xs mb-1">Product image</label>

      <div
        className="w-full h-14 flex items-center justify-center border border-[#8EC9DB] rounded cursor-pointer mb-6 hover:bg-[#d4e6f3]"
        onClick={() => document.getElementById("imageInput").click()}
      >
        <input
          id="imageInput"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
          onChange={handleImageUpload}
        />
        <FaCloudUploadAlt className="text-[#8EC9DB] mr-2" size={18} />
        <span className="text-[#8EC9DB] text-sm select-none">Upload a image</span>
      </div>

      {profileImages.length > 0 && (
        <div className="mb-4 relative w-28 h-28 rounded overflow-hidden">
          <img
            src={profileImages[0]}
            alt="Uploaded"
            className="object-cover w-full h-full"
          />
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

      {/* Upload Button */}
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
