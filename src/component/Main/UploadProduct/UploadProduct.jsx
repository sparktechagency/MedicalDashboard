import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import Status from "../Dashboard/Status";
import UploadCategory from "../UploadCategory/UploadCategory";

const MAX_IMAGES = 5;
const MAX_SIZE_MB = 5;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const UploadProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productOrderNumber, setProductOrderNumber] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBidDate, setProductBidDate] = useState("");
  const [productBidHour, setProductBidHour] = useState("");
  const [productBidMinute, setProductBidMinute] = useState("");
  const [productBidSecond, setProductBidSecond] = useState("");
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

  const handleUpdateProfile = () => {
    console.log("Profile updated:", {
      productTitle,
      productCategory,
      productPrice,
      productOrderNumber,
      productDescription,
      productBidDate,
      productBidHour,
      productBidMinute,
      productBidSecond,
      imageFiles,
    });
    // TODO: Implement backend API call to upload images and form data
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

      <div className="max-w-7xl bg-[#E6F1F8] p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Upload Product</h2>
        </div>

        <div className="mt-6 md:grid lg:grid-cols-2 md:gap-6">
          {/* Left Section */}
          <div>
            {/* Product Title */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Title</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product title"
              />
            </div>

            {/* Product Category */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Category</label>
              <input
                type="text"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product category"
              />
            </div>

            {/* Product Price */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Price</label>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product price"
              />
            </div>

            {/* Product Order Number */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Order Number</label>
              <input
                type="text"
                value={productOrderNumber}
                onChange={(e) => setProductOrderNumber(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product order number"
              />
            </div>

            {/* Product Description */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Type product description"
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            {/* Product Bid Date Time */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Bid Date Time</label>
              <input
                type="date"
                value={productBidDate}
                onChange={(e) => setProductBidDate(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
              />
            </div>

            {/* Product Bid Hour Time */}
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Bid  Time</label>
              <input
                type="number"
                value={productBidHour}
                onChange={(e) => setProductBidHour(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="time"
              />
            </div>

            {/* Product Bid Minute Time
            <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Bid Minute Time</label>
              <input
                type="number"
                value={productBidMinute}
                onChange={(e) => setProductBidMinute(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Minute"
              />
            </div> */}

            {/* Product Bid Second Time */}
            {/* <div className="flex flex-col my-2">
              <label className="text-gray-600">Product Bid Second Time</label>
              <input
                type="number"
                value={productBidSecond}
                onChange={(e) => setProductBidSecond(e.target.value)}
                className="border border-[#48B1DB] p-3 rounded-md"
                placeholder="Second"
              />
            </div> */}

            {/* Product Image Upload */}
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

              {/* Display error message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {/* Display selected images */}
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

        {/* Upload Button */}
        <div className="mt-6 flex justify-start">
          <button
            onClick={handleUpdateProfile}
            className="w-full md:w-auto py-2 px-4 bg-[#48B1DB] text-white rounded-md transition hover:bg-[#3a9cbf]"
            type="button"
          >
            Upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadProduct;
