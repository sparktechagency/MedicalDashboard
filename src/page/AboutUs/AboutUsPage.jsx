import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useTranslation } from "react-i18next";
import { useGetAllAboutsQuery } from "../../redux/features/abouts/aboutsApi";
import decodeHtmlEntities from "../../utils/decodeHtmlEntities";

const AboutUsPage = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetAllAboutsQuery();
  const aboutData = data?.data?.attributes?.content;

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
          <h1 className="text-2xl font-semibold">{t('About Us')}</h1>
        </div>
        <Link to={"/settings/edit-about-us/11"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>{t('Edit')}</span>
          </CustomButton>
        </Link>
      </div>

      {/* Render About Us content */}
      <div className="px-5">
        <h1 className="text-xl">
          {aboutData ? (
            <span
              dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(aboutData) }}
            />
          ) : (
            ""
          )}
        </h1>
      </div>
    </section>
  );
};

export default AboutUsPage;

