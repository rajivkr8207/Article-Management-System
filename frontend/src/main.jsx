import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Userprovider from "./Context/UserContext.jsx";

// import { Userprovider } from './Context/UserContext.jsx'
// const router = createBrowserRouter(Routes, {
//   future: {
//     v7_startTransition: true,
//     v7_relativeSplatPath: true,
//   },
// });
createRoot(document.getElementById("root")).render(
    <Userprovider>
      <App />
    </Userprovider>
);
