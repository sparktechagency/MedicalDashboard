import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useGetCategoryAllQuery } from "../../../redux/features/Category/Category";
import { useCreateProductMutation } from "../../../redux/features/ProductManagement/ProductManagement";
import { message } from "antd";

const MAX_IMAGES = 5;
const MIN_IMAGES = 4; // Minimum 4 images
const MAX_SIZE_MB = 20;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    productTitle: "",
    productCategory: "",
    productPrice: "",
    productOrderNumber: "",
    productDescription: "",
    productBidDate: "",
  });

  const [productImages, setProductImages] = useState([]); // Renamed to 'productImages'
  const [productFiles, setProductFiles] = useState([]); // Renamed to 'productFiles'
  const [error, setError] = useState(null);

  const { data, isLoading, error: apiError } = useGetCategoryAllQuery();

  const [createProduct] = useCreateProductMutation();

  useEffect(() => {
    return () => {
      productImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [productImages]);

  if (isLoading) return <div>Loading...</div>;
  if (apiError) return <div>Error loading categories</div>;

  const categories = data?.data?.attributes || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    if (productFiles.length + files.length > MAX_IMAGES) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }

    const newPreviewUrls = [];
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
      newPreviewUrls.push(URL.createObjectURL(file));
      newFiles.push(file);
    }

    setError(null);
    setProductImages((prev) => [...prev, ...newPreviewUrls]);
    setProductFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => {
      const urls = [...prev];
      URL.revokeObjectURL(urls[index]);
      urls.splice(index, 1);
      return urls;
    });
    setProductFiles((prev) => {
      const files = [...prev];
      files.splice(index, 1);
      return files;
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.productTitle || !formData.productCategory || !formData.productPrice || !formData.productDescription || !formData.productBidDate) {
      setError("Please fill in all required fields.");
      return;
    }
  
    if (productFiles.length < MIN_IMAGES) {
      setError(`Please upload at least ${MIN_IMAGES} images.`);
      return;
    }
  
    // Prepare the form data
    const payload = new FormData();
    payload.append("title", formData.productTitle); // Title
    payload.append("category", formData.productCategory); // Category
    payload.append("price", formData.productPrice); // Price
    payload.append("description", formData.productDescription); // Description
    payload.append("date", formData.productBidDate); // Date (Bid Date)
  
    // Append images
    productFiles.forEach((file) => {
      payload.append("image", file); // Note the key for the image field is now "image"
    });
  
    try {
      const res = await createProduct(payload);
      console.log(res);
      if (res?.data?.code === 201) {
        // Successful upload, show success message
        message.success("Product uploaded successfully.");
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    }
  };
  

  return (
    <section>
      <form onSubmit={handleSubmit} className="max-w-7xl bg-[#E6F1F8] p-2 lg:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mt-10 md:mt-0 md:mb-4">Upload Product</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-1">Product Title</label>
            <input
              type="text"
              name="productTitle"
              value={formData.productTitle}
              onChange={handleChange}
              className="w-full border border-[#48B1DB] p-3 rounded-md"
              placeholder="Type product title"
            />
            <label className="block text-gray-600 mt-4 mb-1">Product Category</label>
            <select
              name="productCategory"
              value={formData.productCategory}
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
            <label className="block text-gray-600 mt-4 mb-1">Product Price</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className="w-full border border-[#48B1DB] p-3 rounded-md"
              placeholder="Type product price"
            />
            <label className="block text-gray-600 mt-4 mb-1">Product Description</label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              className="w-full border border-[#48B1DB] p-3 rounded-md"
              placeholder="Type product description"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Bid Date</label>
            <input
              type="date"
              name="productBidDate"
              value={formData.productBidDate}
              onChange={handleChange}
              className="w-full border border-[#48B1DB] p-3 rounded-md"
            />

            <div className="mt-6">
              <label className="block text-gray-600 mb-1">Product Images (Max 5)</label>
              <div className="border border-[#48B1DB] p-4 text-center rounded-md hover:bg-gray-100">
                <input
                  type="file"
                  id="imageInput"
                  accept={VALID_IMAGE_TYPES.join(",")}
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="imageInput" className="text-[#48B1DB] cursor-pointer">
                  <FaImage className="inline-block mr-2" /> Upload images
                </label>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {productImages.length > 0 && (
                <div className="mt-4 grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
                  {productImages.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-[132px] object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
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

        <button
          type="submit"
          className="mt-6 w-full md:w-auto py-2 px-4 bg-[#48B1DB] text-white rounded-md hover:bg-[#3a9cbf] transition"
        >
          Upload
        </button>
      </form>
    </section>
  );
};

export default UploadProduct;
