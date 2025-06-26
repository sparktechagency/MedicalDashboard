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
  console.log(id);

  const { data } = useGetCategoryAllQuery();
  const categories = data?.data?.attributes || [];

  const { data: singleData } = useGetProductSingleQuery(id);
  const productData = singleData?.data?.attributes;

  const [updateProduct] = useUpdateProductMutation();

  const [profileImages, setProfileImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageNames, setExistingImageNames] = useState([]);
  const [error, setError] = useState(null);

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

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productTitle = form.productTitle.value;
    const productCategory = form.productCategory.value;
    const productPrice = form.productPrice.value;
    const productDescription = form.productDescription.value;
    const productBidDate = form.productBidDate.value;

    const formDataToSend = new FormData();
    formDataToSend.append("title", productTitle);
    formDataToSend.append("category", productCategory);
    formDataToSend.append("price", productPrice);
    formDataToSend.append("description", productDescription);
    formDataToSend.append("date", productBidDate);

    // Only append new images if there are any
    if (imageFiles.length > 0) {
      imageFiles.forEach((productImage) => {
        formDataToSend.append("image", productImage);
      });
    }

    const data = formDataToSend;

    try {
      const response = await updateProduct({ id, data }).unwrap();
      console.log(response);
      message.success("Product updated successfully");
    } catch (err) {
      message.error("Failed to update product");
    }
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
                  defaultValue={productData?.title}
                  className="border border-[#48B1DB] p-3 rounded-md"
                  placeholder="Type product title"
                />
              </div>

              <div className="flex flex-col my-2">
                <label className="block text-gray-600 mt-4 mb-1">Product Category</label>
                <select
                  name="productCategory"
                  defaultValue={productData?.category?._id}
                  className="w-full border border-[#48B1DB] p-3 rounded-md"
                >
                  <option value={productData?.category?._id}>{productData?.category?.name}</option>
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
                  defaultValue={productData?.price}
                  className="border border-[#48B1DB] p-3 rounded-md"
                  placeholder="Type product price"
                />
              </div>

              <div className="flex flex-col my-2">
                <label className="text-gray-600">Product Description</label>
                <textarea
                  name="productDescription"
                  defaultValue={productData?.description}
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
                  defaultValue={productData?.date ? new Date(productData.date).toISOString().split("T")[0] : ""}
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
              className="w-full md:w-auto py-2 px-4 text-white rounded-md bg-[#48B1DB] hover:bg-[#3a9cbf]"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProducts;
