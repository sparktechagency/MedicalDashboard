import { useEffect, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetProductSingleQuery, useUpdateProductMutation } from "../../../redux/features/ProductManagement/ProductManagement";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { message } from "antd";
import { useGetCategoryAllQuery } from "../../../redux/features/Category/Category";

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 20;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const EditProducts = () => {
  const { id } = useParams();
  
  const { data } = useGetCategoryAllQuery();
  const categories = data?.data?.attributes || [];

  const { data: singleData } = useGetProductSingleQuery(id);
  const productData = singleData?.data?.attributes;
  console.log(productData);

  const [profileImages, setProfileImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageNames, setExistingImageNames] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (productData?.images?.length) {
      const urls = productData.images.map((img) => `${imageBaseUrl}/${img}`);
      setProfileImages(urls);
      setExistingImageNames(productData.images);
    }
  }, [productData]);

  useEffect(() => {
    return () => {
      profileImages.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [profileImages]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    if (profileImages.length + files.length > MAX_IMAGES) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const newImages = [];
    const newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!VALID_IMAGE_TYPES.includes(file.type)) {
        setError("Only JPG, JPEG, PNG files are allowed.");
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
    setProfileImages((prev) => [...prev, ...newImages]);
    setImageFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = profileImages[index];

    if (imageToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove);
      setImageFiles((prev) => prev.filter((_, i) => i !== index - existingImageNames.length));
    } else {
      setExistingImageNames((prev) => prev.filter((_, i) => i !== index));
    }

    setProfileImages((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const [updateProduct] = useUpdateProductMutation();

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const { productTitle, productCategory, productPrice, productDescription, productBidDate } = formData;

    if (!productTitle || !productCategory || !productPrice || !productDescription || !productBidDate) {
      setError("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", productTitle);
    formDataToSend.append("category", productCategory);
    formDataToSend.append("price", productPrice);
    formDataToSend.append("description", productDescription);
    formDataToSend.append("date", productBidDate);

    imageFiles.forEach((file) => {
      formDataToSend.append("image", file);
    });

    const data = {
      id,
      data: formDataToSend,
    };

    try {
      setIsSubmitting(true);
      const response = await updateProduct(data).unwrap();
      console.log(response);
      message.success("Product updated successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  return (
    <section>
      <div className="max-w-7xl bg-[#E6F1F8] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Update Product</h2>

        <form onSubmit={handleProductSubmit}>
          <div className="md:grid lg:grid-cols-2 md:gap-6">
            {/* Left */}
            <div>
              <div className="flex flex-col my-2">
                <label className="text-gray-600">Product Title</label>
                <input
                  type="text"
                  name="productTitle"
                  value={productData?.title}
                  onChange={handleChange}
                  className="border border-[#48B1DB] p-3 rounded-md"
                  placeholder="Type product title"
                />
              </div>

              <div className="flex flex-col my-2">
                <label className="block text-gray-600 mt-4 mb-1">Product Category</label>
                <select
                  name="productCategory"
                  value={productData?.category?._id}
                  onChange={handleChange}
                  className="w-full border border-[#48B1DB] p-3 rounded-md"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col my-2">
                <label className="text-gray-600">Product Price</label>
                <input
                  type="number"
                  name="productPrice"
                  value={productData?.price}
                  onChange={handleChange}
                  className="border border-[#48B1DB] p-3 rounded-md"
                  placeholder="Type product price"
                />
              </div>

              <div className="flex flex-col my-2">
                <label className="text-gray-600">Product Description</label>
                <textarea
                  name="productDescription"
                  value={productData?.description}
                  onChange={handleChange}
                  className="border border-[#48B1DB] p-3 rounded-md"
                  placeholder="Type product description"
                />
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="flex flex-col my-2">
                <label className="text-gray-600">Product Bid Date</label>
                <input
                  type="date"
                  name="productBidDate"
                  value={
                    productData?.date
                      ? new Date(productData.date).toISOString().split("T")[0] // Format the date as YYYY-MM-DD
                      : ""
                  }
                  onChange={handleChange}
                  className="border border-[#48B1DB] p-3 rounded-md"
                />
              </div>

              <div className="flex flex-col mt-6">
                <label htmlFor="imageInput" className="text-gray-600">
                  Product Images (Max 4)
                </label>
                <div className="border border-[#48B1DB] p-4 text-center rounded-md cursor-pointer hover:bg-gray-100">
                  <input
                    type="file"
                    name="productImages"
                    id="imageInput"
                    accept="image/jpeg,image/png,image/jpg"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="imageInput" className="text-[#48B1DB] cursor-pointer">
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
                          alt={`Uploaded ${index + 1}`}
                          className="w-[132px] h-[132px] object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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

          <div className="mt-6 flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto py-2 px-4 text-white rounded-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#48B1DB] hover:bg-[#3a9cbf]"}`}
            >
              {isSubmitting ? "Updating..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProducts;
