import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import Status from "../Dashboard/Status";
import UploadCategory from "../UploadCategory/UploadCategory";


const MAX_IMAGES = 5;
const MAX_SIZE_MB = 20;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    productTitle: "",
    productCategory: "",
    productPrice: "",
    productOrderNumber: "",
    productDescription: "",
    productBidDate: "",
    productBidHour: "",
    productBidMinute: "",
    productBidSecond: "",
  });

  const [profileImages, setProfileImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      profileImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [profileImages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    if (imageFiles.length + files.length > MAX_IMAGES) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const newImages = [];
    const newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        setError("Please upload valid image files (JPG, JPEG, or PNG).");
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Each file must be less than ${MAX_SIZE_MB}MB.`);
        return;
      }

      newImages.push(URL.createObjectURL(file));
      newFiles.push(file);
    }

    setError(null);
    profileImages.forEach((url) => URL.revokeObjectURL(url));

    setProfileImages((prev) => [...prev, ...newImages]);
    setImageFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    setProfileImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index]);
      newImages.splice(index, 1);
      return newImages;
    });

    setImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.productTitle.value;
    const category = form.productCategory.value;
    const price = form.productPrice.value;
    const orderNumber = form.productOrderNumber.value;
    const description = form.productDescription.value;
    const bidDate = form.productBidDate.value;
  

  };

  return (
    <section>
      <Status />
      <br />

      <div className="flex justify-end -mb-10 space-x-2">
        <a href="/AllCategory">
          <button className="bg-[#48B1DB] text-white py-2 px-4 rounded-md">
            All Category
          </button>
        </a>
        <a href="/AllProducts">
          <button className="bg-[#48B1DB] text-white py-2 px-4 rounded-md">
            All Products
          </button>
        </a>
      </div>

      <UploadCategory />

      <form
        onSubmit={handleSubmit}
        className="max-w-7xl bg-[#E6F1F8] p-8 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Upload Product</h2>
        </div>

        <div className="mt-6 md:grid lg:grid-cols-2 md:gap-6">
          <div>
            {/* Left Side Inputs */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Title</label>
              <input
                type="text"
                name="productTitle"
                value={formData.productTitle}
                onChange={handleChange}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product title"
              />
            </div>

            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Category</label>
              <input
                type="text"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product category"
              />
            </div>

            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Price</label>
              <input
                type="text"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product price"
              />
            </div>

            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Order Number</label>
              <input
                type="text"
                name="productOrderNumber"
                value={formData.productOrderNumber}
                onChange={handleChange}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product order number"
              />
            </div>

            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Description</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product description"
              />
            </div>
          </div>

          <div>
            {/* Right Side Inputs */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Bid Date</label>
              <input
                type="date"
                name="productBidDate"
                value={formData.productBidDate}
                onChange={handleChange}
                className="border border-[#48B1DB] p-3 rounded-md"
              />
            </div>


            {/* Image Upload */}
            <div className="flex flex-col mt-6">
              <label htmlFor="imageInput" className="text-gray-600">
                Product Images (Max 5)
              </label>
              <div className="border border-[#48B1DB] p-4 text-center rounded-md cursor-pointer hover:bg-gray-100">
                <input
                  type="file"
                  id="imageInput"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="imageInput"
                  className="text-[#48B1DB] cursor-pointer"
                >
                  <FaImage className="inline-block mr-2" /> Upload images
                </label>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {profileImages.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {profileImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Uploaded Image ${index + 1}`}
                        style={{ width: 132, height: 132, objectFit: "cover" }}
                        className="rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        type="button"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-start">
          <button
            type="submit"
            className="w-full md:w-auto py-2 px-4 bg-[#48B1DB] text-white rounded-md transition hover:bg-[#3a9cbf]"
          >
            Upload
          </button>
        </div>
      </form>
    </section>
  );
};

export default UploadProduct;
