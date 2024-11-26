import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import profilepic from "../assets/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ProfileUpdate = () => {
  const { getProfile, updateProfile } = useContext(UserContext);
  const { id } = useParams();
  const [profileData, setProfile] = useState({
    username: "",
    email: "",
    profile: {
      bio: "",
      image: null,
      occupation: "",
      phone_number: "",
    },
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  // console.log(profileData);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("article"));
    // console.log(currentUser);

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile(id);
        // console.log(data);
        console.log(data);

        setProfile(data);
      } catch (err) {
        console.log("error");

        // setError("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, [navigate, id, getProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bio" || name === "occupation" || name === "phone_number") {
      setProfile({
        ...profileData,
        profile: {
          ...profileData.profile,
          [name]: value,
        },
      });
    } else {
      setProfile({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile({
        ...profileData,
        profile: {
          ...profileData.profile,
          image: URL.createObjectURL(file),
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("username", profileData.username);
    formData.append("email", profileData.email);
  
    // Append profile fields within "profile" structure
    formData.append("profile.bio", profileData.profile.bio);
    formData.append("profile.occupation", profileData.profile.occupation);
    formData.append("profile.phone_number", profileData.profile.phone_number);
  
    // Append the image file only if it exists
    if (imageFile) {
      formData.append("profile.image", imageFile);
    }
  
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("article")).access
            }`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Update successful");
      navigate(`/profile/${id}`);
    } catch (err) {
      toast.error("Failed to update profile");
      console.error("Failed to update profile", err);
    }
  };
  
  return (
    <>
      <div className="max-w-md relative mx-auto mt-10 p-6 bg-white/30 text-white backdrop-blur-lg shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>
        <button
          onClick={() => {
            navigate(`/profile/${id}`);
          }}
          className="absolute lg:top-10 top-6 lg:right-10 right-6 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Back
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.profile ? profileData.profile.bio : ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="occupation"
              className="block text-sm font-medium text-gray-700"
            >
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={profileData.profile ? profileData.profile.occupation : ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="occupation"
              className="block text-sm font-medium text-gray-700"
            >
              Phone_number
            </label>
            <input
              type="text"
              id="occupation"
              name="phone_number"
              value={
                profileData.profile ? profileData.profile.phone_number : ""
              }
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
            {profileData.profile && (
              <img
                src={profileData.profile.image ?  profileData.profile.image : profilepic}
                alt="Profile Preview"
                className="mt-2 h-20 w-20 rounded-full"
              />
            )}
          </div>
          <button
            type="submit"
            className=" z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileUpdate;
