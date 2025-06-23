import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";

import decodeHtmlEntities from "../../utils/decodeHtmlEntities";
import { useGetAllSellerAgreementQuery,  } from "../../redux/features/Agreement/Agreement";

const EditSellerAgreement = () => {
  const { data, error, isLoading } = useGetAllSellerAgreementQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading privacy policy</div>;
  }


  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5 px-5">
        <div className="flex items-center space-x-3">
          <Link to="/settings">
            <IoChevronBack className="text-xl cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold">Seller Agreement</h1>
        </div>
        <Link to={'/settings/SellerAgreement/1'}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>
      <div className="px-5 whitespace-pre-wrap text-black text-xl">
      {data?.data?.attributes?.content ? (
            <span
              dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data?.data?.attributes?.content) }}
            />
          ) : (
            ""
          )}
      </div>
    </section>
  );
};

export default EditSellerAgreement;
