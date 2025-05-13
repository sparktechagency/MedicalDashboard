import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";

import { useTranslation } from "react-i18next";
import { useGetAllPrivacyPolicyQuery } from "../../redux/features/PrivacyPolicy/PrivacyPolicyApi";


const PrivacyPolicyPage = () => {
  const {t} = useTranslation()
  const { data, error, isLoading } = useGetAllPrivacyPolicyQuery();
  console.log(data?.data?.attributes[0]?.content)
    
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading privacy policy</div>;
  }

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <Link to="/settings">
            <IoChevronBack className="text-xl" />
          </Link>
          <h1 className="text-2xl font-semibold">{t('Privacy Policy')}</h1>
        </div>
        <Link to={'/settings/edit-privacy-policy/11'}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>{t('Edit')}</span>
          </CustomButton>
        </Link>
      </div>
      <div>
        <h1  className="px-5 text-xl text-black">
          {data?.data?.attributes[0]?.content
          ? data?.data?.attributes[0]?.content
              .replace(/<br\s*\/?>/gi, "\n")  // Replace <br> with newlines
              .replace(/<\/?[^>]+(>|$)/g, "")  // Remove other HTML tags
          : ""}
        </h1>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
