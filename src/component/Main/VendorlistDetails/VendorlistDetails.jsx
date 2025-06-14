import { Table, Button, ConfigProvider } from "antd";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useGetAllbidVendorQuery } from "../../../redux/features/Vendor/Vendor";
import moment from "moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const VendorlistDetails = () => {
  const { id } = useParams();
  const { data } = useGetAllbidVendorQuery(id);
  console.log(data);

  // Author information from API response
  const author = data?.data?.attributes?.author || {};

  // User information populated with API author data
  const user = {
    profileImage: author.image ? `${imageBaseUrl}/${author.image}` : "", // Empty string if image is not available
    fullName: author.name || "", // Empty string if name is not available
    name: author.name || "", // Empty string if name is not available
    email: author.email || "", // Empty string if email is not available
    dob: author.dob || "", // Empty string if dob is not available
    phone: author.phone || "", // Empty string if phone is not available
    joiningDate: author.joiningDate || "", // Empty string if joining date is not available
  };

  // Mapping API product data to table data
  const bidDetails = data?.data?.attributes?.products?.map((product, index) => ({
    key: product._id, // Use product _id as the key
    sl: (index + 1).toString().padStart(2, '0'),
    productName: product.title,
    category: product.category.name,
    price: `$${product.price}`,
    date: moment(product.date).format('DD MMMM YYYY'),
    image: product.images[0], // Assuming the first image is the primary image
  }));

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      width: 60,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={`${imageBaseUrl}/${record.image}`}
            alt={record.productName}
            className="w-16 h-12 rounded-md object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "Time & Date",
      dataIndex: "date",
      key: "date",
      width: 140,
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => <Button icon={<EyeOutlined />} type="text" />,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/Vendorlist" className="text-gray-500 hover:text-gray-800">
          <LeftOutlined style={{ fontSize: 20 }} />
        </Link>
        <h2 className="text-2xl font-semibold">Vendor list Details</h2>
      </div>

      {/* Profile */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img
            src={user.profileImage || "https://i.ibb.co/0C5x0zk/Ellipse-1232.png"} // Default image if no image available
            alt={user.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">{user.fullName || "N/A"}</h3> {/* Display "N/A" if no name */}
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl mb-10">
        {[
          { label: "Name", value: user.name || "N/A" },
          { label: "Email", value: user.email || "N/A" },
          { label: "Date of Birth", value: user.dob || "N/A" },
          { label: "Phone number", value: user.phone || "N/A" },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between border-b border-gray-300 pb-2">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      {/* User Bid Details */}
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EEF9FE",
            colorPrimary: "#1890ff",
          },
          components: {
            Table: {
              headerBg: "#48B1DB",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={bidDetails}
          pagination={{
            pageSize: 5,
          }}
          scroll={{ x: 1000 }}
          bordered
        />
      </ConfigProvider>
    </div>
  );
};

export default VendorlistDetails;

