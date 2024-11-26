import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import ProfileUpdate from "./Pages/ProfileUpdate";
import ReadArticle from "./Pages/ReadArticle";
import ArticleCreate from "./Pages/ArticleCreate";
import { ToastContainer } from "react-toastify";
import PasswordChange from "./Pages/PasswordChange";
import Userprofile from "./Pages/Userprofile";
import ProfileSearch from "./Pages/ProfileSearch";

const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/user_profile/:username" element={<Userprofile />} />

          <Route path="/profile/update/:id" element={<ProfileUpdate />} />
          <Route path="/read/article/:id" element={<ReadArticle />} />
          <Route path="/create/article" element={<ArticleCreate />} />
          <Route path="/update/article/:id" element={<ArticleCreate />} />
          <Route path="/update/password" element={<PasswordChange />} />
          <Route path="/profile" element={<ProfileSearch />} />

        </Routes>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
};

export default App;
