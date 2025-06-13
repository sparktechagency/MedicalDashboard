// ProductCategory.jsx
import { Link } from "react-router-dom";
import Status from "../Dashboard/Status";
import UploadCategory from "../UploadCategory/UploadCategory";
import UploadProduct from "../UploadProduct/UploadProduct";

const ProductCategory = () => {
  return (
    <div>
      <Status />
      <br />
      <div className="flex justify-end -mb-10 space-x-2">
        <Link to="/AllCategory">
          <button className="bg-[#48B1DB] text-white py-2 px-4 rounded-md">
            All Category
          </button>
        </Link>
        <Link to="/AllProducts">
          <button className="bg-[#48B1DB] text-white py-2 px-4 rounded-md">
            All Products
          </button>
        </Link>
      </div>

      <UploadCategory />
      <UploadProduct />
    </div>
  );
};

export default ProductCategory;
