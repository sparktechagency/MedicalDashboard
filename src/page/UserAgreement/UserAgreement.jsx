import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";

import { useGetAllPrivacyPolicyQuery } from "../../redux/features/PrivacyPolicy/PrivacyPolicyApi";

const UserAgreement = () => {
  const { data, error, isLoading } = useGetAllPrivacyPolicyQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading privacy policy</div>;
  }

  const content = data?.data?.attributes?.[0]?.content || "";

  const formatContent = (htmlString) => {
    return htmlString
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5 px-5">
        <div className="flex items-center space-x-3">
          <Link to="/settings">
            <IoChevronBack className="text-xl cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold">User Agreement</h1>
        </div>
        <Link to={'/settings/UserAgreement/1'}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>
      <div className="px-5 whitespace-pre-wrap text-black text-xl">
        {formatContent(content)}
      </div>
    </section>
  );
};

export default UserAgreement;

