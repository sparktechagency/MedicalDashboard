import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>

    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors  position="top-center"  />
    </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
