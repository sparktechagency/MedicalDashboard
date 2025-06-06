import { useState } from "react";
import { message, Pagination } from "antd";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductAllQuery,
} from "../../../redux/features/ProductManagement/ProductManagement";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const AllProducts = () => {
  const { data, isLoading, error, refetch } = useGetProductAllQuery();
  const [deleteProduct] = useDeleteProductMutation();

  // Transform API data
  const allProducts =
    data?.data?.attributes?.map((product) => ({
      ...product,
      id: product._id,
      name: product.title,
      image: product.images?.[0],
      status: product.status,
    })) || [];

  const handeleDeleteProduct = async (id) => {
    try {
     const res = await deleteProduct(id).unwrap();
     console.log(res)
     if(res.code === 200){
      message.success("Product deleted successfully");
      refetch(); // Refresh the product list after deletion
     }      
      // Refresh product list after deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-[20px] font-semibold text-gray-800 mb-4">
        List of all products ({allProducts.length})
      </h1>

      <div>
        {currentProducts.map((product) => (
          <Link
            to="/BidderList"
            key={product.id}
            className="flex items-center justify-between border-[#91C5DF] bg-gray-50 border my-5 rounded-md p-1"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  product.image ? `${imageBaseUrl}/${product.image}` : ""
                }
                alt={product.name}
                className="h-16 w-16 object-cover"
              />
              <div>
                <p className="text-gray-800 font-medium">{product.name}</p>
                <div className="flex space-x-5 items-center">
                  <p className="text-gray-600">${product.price}</p>
                  <p
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.status === "PENDING"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {product.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link to={`/AllProducts/${product.id}`}>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigating via Link
                  handeleDeleteProduct(product.id);
                }}
                className="p-2 hover:bg-gray-200 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          total={allProducts.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AllProducts;
