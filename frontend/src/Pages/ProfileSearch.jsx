import axios from "axios";
import React, { useState } from "react";
import profilepic from "../assets/profile.png";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const ProfileSearch = () => {
  const [searchparams, setSearchparams] = useSearchParams();
  const [username, setUsername] = useState(searchparams.get("search" || "")); // Input username
  const [profile, setProfile] = useState(null); // Profile data
  const [error, setError] = useState(""); // Error message
  const API_URL = "http://127.0.0.1:8000/api";
  const LocalName = "article";


  useEffect(()=>{
    const queryusername = searchparams.get("search")
    if (queryusername){
      setUsername(queryusername)
      fetchProfile(queryusername)
    }


  },[searchparams])

const fetchProfile =  async (username)=>{
  setError(""); // Clear previous errors
    setProfile(null); // Clear previous profile data

    
    try {
      const response = await axios.get(`${API_URL}/user/profile/${username}/`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem(LocalName)).access
          }`,
        },
      }); // Adjust API endpoint as needed
      // console.log(response.data);

      setProfile(response.data);
    } catch (err) {
      setError("Unable to fetch data. Please try again later.");
    }

}


  const handleSearch =  () => {
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }
    setSearchparams({search   : username})

  };
  return (
    <>
      <div className="flex flex-col items-center p-6 ">
        <div className="flex flex-col items-center rounded-md bg-white/30 backdrop-blur-lg p-4 ">
          <h1 className="text-2xl font-bold mb-4 text-white">Search Profile</h1>
          <div className="flex items-center gap-3 w-full max-w-md">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 bg-white/30 rounded-l-md focus:outline-none "
            />
            <button
              onClick={handleSearch}
              className=" bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {profile && (
          <Link
            to={`/user_profile/${profile.username}`}
            className="flex items-center gap-4 mt-6 bg-white/30 backdrop-blur-lg p-4 rounded-lg text-white shadow-md w-full max-w-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0 relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-1">
                <img
                  src={
                    profile.profile && profile.profile.image
                      ? `http://127.0.0.1:8000${profile.profile.image}`
                      : profilepic
                  }
                  alt={profile.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900">
                {profile.username}
              </h2>
              <p className="text-sm text-gray-700">{profile.email}</p>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default ProfileSearch;
