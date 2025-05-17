import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import SettingsPage from "../page/Settings/SettingsPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import Notification from "../component/Main/Notification/Notification";
import EditPersonalInformationPage from "../page/EditPersonalInformationPage/EditPersonalInformationPage";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import UserManagementPage from "../page/UserManagement/UserManagementPage";
import AdminRoutes from "./AdminRoutes";
import VendorRequest from "../page/VendorRequest/VendorRequest";
import VendorDetailsPage from "../page/VendorRequestsDetailsPage/VendorRequestsDetailsPage";
import UserDetailsPage from "../page/UserDetailsPage/UserDetailsPage";
import VendorlistPage from "../page/VendorlistPage/VendorlistPage";
import VendorlistDetailsPage from "../page/VendorlistDetailsPage/VendorlistDetailsPage";
import EarningsPage from "../page/EarningsPage/EarningsPage";
import ReportsPage from "../page/ReportsPage/ReportsPage";
import UserAgreement from "../page/UserAgreement/UserAgreement";
import EditUserAgreement from "../page/EditUserAgreement/EditUserAgreement";
import UploadProductPage from "../page/UploadProductPage/UploadProductPage";
import AllProductsPage from "../page/AllProductsPage/AllProductsPage";
import EidtProductsPage from "../page/EidtProductsPage/EidtProductsPage";
import EditUploadCategoryPage from "../page/EditUploadCategoryPage/EditUploadCategoryPage";
import AllCategoryPage from "../page/AllCategoryPage/AllCategoryPage";
import MessagePage from "../page/MessagePage/MessagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AdminRoutes>
      <MainLayout />
      // </AdminRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/users",
        element: <UserManagementPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailsPage />,
      },
      {
        path: "personal-info",
        element: <PersonalInformationPage />,
      },
      {
        path: "edit-personal-info",
        element: <EditPersonalInformationPage />,
      },
      {
        path: "vendorRequest",
        element: <VendorRequest />,
      },
      {
        path: "Vendorlist",
        element: <VendorlistPage />,
      },
      {
        path: "Vendorlist/:id",
        element: <VendorlistDetailsPage />,
      },
      {
        path: "vendorRequest/:id",
        element: <VendorDetailsPage />,
      },
      {
        path: "UploadProduct",
        element: <UploadProductPage />,
      },
      {
        path: "AllProducts/:id",
        element: <EidtProductsPage />,
      },
      {
        path: "AllProducts",
        element: <AllProductsPage />,
      },
      {
        path: "AllCategory",
        element: <AllCategoryPage />,
      },
      {
        path: "AllCategory/:id",
        element: <EditUploadCategoryPage />,
      },
      {
        path: "Message",
        element: <MessagePage />,
      },
      {
        path: "Earnings",
        element: <EarningsPage />,
      },
      {
        path: "Reports",
        element: <ReportsPage />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "/settings/UserAgreement",
        element: <UserAgreement />,
      },
      {
        path: "/settings/UserAgreement/:id",
        element: <EditUserAgreement />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/edit-privacy-policy/:id",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsconditionPage />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
