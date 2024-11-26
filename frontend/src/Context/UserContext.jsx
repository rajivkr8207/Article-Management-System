import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = (props) => {
  const API_URL = "http://127.0.0.1:8000/api";
  const LocalName = "article";
  const [userid, setUserId] = useState();
  const [user, setUser] = useState(false);

  // Refresh token function
  const refreshToken = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem(LocalName));
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: currentUser.refresh,
      });
      const updatedUser = {
        ...currentUser,
        access: response.data.access,
      };
      localStorage.setItem(LocalName, JSON.stringify(updatedUser));
      return response.data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  };

  // Check token and refresh if needed
  const authRequest = async (request) => {
    try {
      return await request();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          return await request();
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  };

  const register = (username, email, password) => {
    return axios.post(`${API_URL}/register/`, { username, email, password });
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(LocalName));
  };

  const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password,
    });
    if (response.data.access) {
      localStorage.setItem(LocalName, JSON.stringify(response.data));
      setUser(true);
    }
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem(LocalName);
    setUser(false);
    return true;
  };

  useEffect(() => {
    const tokenString = localStorage.getItem(LocalName);
    if (tokenString) {
      try {
        const token = JSON.parse(tokenString);
        const userdata = JSON.parse(atob(token.access.split(".")[1]));
        setUserId(userdata.user_id);
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
  }, [user]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  // Fetch profile by user ID
  const getProfile = async (Id) => {
    return await authRequest(async () => {
      const response = await axios.get(`${API_URL}/profile/${Id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem(LocalName)).access
          }`,
        },
        
      }
    );
    
      return response.data;
      
    });
    
  };

  const updateProfile = async (userId, profileData) => {
    return await authRequest(async () => {
      const response = await axios.put(
        `${API_URL}/profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem(LocalName)).access
            }`,
          },
        }
      );
      return response.data;
    });
  };


// Arictle logic

  const getallarticle = async ()=>{
    const response  = await axios.get(`${API_URL}/allarticle/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(LocalName)).access
        }`,
      },
    }); 
    // console.log('response' , response.data);
    return response.data
  }
  const createarticle = async (articledata)=>{
    try {
      const response  = await axios.post(`${API_URL}/allarticle/`,articledata, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem(LocalName)).access
          }`,
        },
      }); 
      // console.log('response' , response.data);
      return response.data
    } catch (error) {
      console.error('error hai bhai',error);
      
    }
  }
  const readarticle = async (id)=>{
    const response  = await axios.get(`${API_URL}/allarticle/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(LocalName)).access
        }`,
      },
    }); 
    // console.log('response' , response.data);
    return response.data
  }
  const deletearticle = async (id)=>{
    const response  = await axios.delete(`${API_URL}/allarticle/${id}/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem(LocalName)).access
        }`,
      },
    }); 
    // console.log('response' , response.data);
    return response.data
  }

  const allValues = {
    userid,
    login,
    register,
    logout,
    user,
    getProfile,
    updateProfile,
    getallarticle,
    createarticle,
    // getuserarticle,
    deletearticle,
    readarticle,
    refreshToken
  };
  return (
    <UserContext.Provider value={allValues}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
// const formdatas = {
//   username: `${profileData.username}`,
//   email: `${profileData.email}`,
//   profile: {
//     bio: `${profileData.profile.bio}`,
//     image: imageFile,
//     occupation: `${profileData.profile.occupation}`,
//     phone_number: `${profileData.profile.phone_number}`,
//   },
// };
// console.log(formdatas)