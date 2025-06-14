import { Table, Button, ConfigProvider } from "antd";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useGetAllbidUserQuery } from "../../../redux/features/user-management/user-management";
import moment from "moment/moment";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const UserDetails = () => {
  const { id } = useParams();
  const { data } = useGetAllbidUserQuery(id); // Fetching the data dynamically
  

  

  // Dynamically mapping bid details from the API response
  const bidDetails = data?.data?.attributes?.products.map((bid, index) => ({
    key: index + 1,
    sl: (index + 1).toString().padStart(2, "0"), 
    productName: bid.product.title, 
    bidPrice: `${bid.bidAmount}`, 
    date: moment(bid.createdAt).format("DD MMMM YYYY"), 
  })) || []; 

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
    },
    {
      title: "Bid Price",
      dataIndex: "bidPrice",
      key: "bidPrice",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => <Button icon={<EyeOutlined />} type="text" />,
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/users" className="text-gray-500 hover:text-gray-800">
          <LeftOutlined style={{ fontSize: 20 }} />
        </Link>
        <h2 className="text-2xl font-semibold">User Details</h2>
      </div>

      {/* Profile */}
      <div className="flex items-center space-x-6 mb-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
          <img
              src={`${imageBaseUrl}/${data?.data?.attributes?.author?.image}`}
              alt={data?.data?.attributes?.author?.name} 
              className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">{data?.data?.attributes?.author?.name }</h3>
      </div>

{/* User Info */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-12 w-full md:max-w-3xl mb-10">
        {[
          { label: "Name", value: data?.data?.attributes?.author?.name  },
          { label: "Email", value: data?.data?.attributes?.author?.email  },
          { label: "Phone number", value: data?.data?.attributes?.author?.phone },
          { label: "Address", value: data?.data?.attributes?.author?.address },
          { label: "Joined at", value: moment(data?.data?.attributes?.author?.createdAt).format("DD MMMM YYYY") },
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
            pageSize: 8,
          }}
          scroll={{ x: 1000 }}
          bordered
          className="ant-table-wrapper"
        />
      </ConfigProvider>
    </div>
  );
};

export default UserDetails;
