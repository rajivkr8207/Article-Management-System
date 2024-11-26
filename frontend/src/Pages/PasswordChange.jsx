import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ReactLoading from 'react-loading';

const PasswordChange = () => {
  const { userid } = useContext(UserContext);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    conformPassword: "",
  });
  const [Passwordshow, setPasswordshow] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handlechange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = {
      old_password: passwords.oldPassword,
      new_password: passwords.newPassword,
    };

    if (passwords.newPassword == passwords.conformPassword) {
      if (passwords.newPassword.length >= 8) {
        if (/[!@#$%^&*()<>?:"|{}]/.test(passwords.newPassword)) {
          if (/[0-9]/.test(passwords.newPassword)) {
            if (/[A-Z]/.test(passwords.newPassword)) {
              if (/[a-z]/.test(passwords.newPassword)) {
                try {
                  await axios.put(
                    `http://127.0.0.1:8000/api/change-password/`,
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem("article")).access
                        }`,
                      },
                    }
                  );

                  toast.success("Password changed successfully");
                  navigate(`/`);
                  setLoading(false)
                } catch (error) {
                  console.error(error);
                 
                  toast.error('old password is incorrect');
                  setLoading(false)
                }
              } else {
                toast.error(
                  "Password must contain at least one lowercase letter"
                );
        setLoading(false)

              }
            } else {
              toast.error(
                "Password must contain at least one uppercase letter"
              );
        setLoading(false)

            }
          } else {
            toast.error("Password must contain at least one digit");
            setLoading(false)
          }
        } else {
          toast.error("Password must contain at least one special character");
          setLoading(false)
        }
      } else {
        toast.error("Password length must be at least 8 characters");
        setLoading(false)
      }
    } else {
      toast.error("password and confirm password must match");
      setLoading(false)
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <form
          onSubmit={handlePasswordChange}
          className="bg-white/30 backdrop-blur-lg shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
         
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Old Password
            </label>
            <input
              type="text"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlechange}
              className="shadow appearance-none border rounded bg-transparent w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4 p-4 bg-blue-100/30 border border-gray-300 rounded-lg text-gray-700">
            <h4 className="font-bold text-blue-600 mb-2">Password Tips:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Password must be more than 8 characters</li>
              <li>Include at least one symbol</li>
              <li>Include at least one uppercase and one lowercase letter</li>
              <li>Password should not be similar to your username or email</li>
            </ul>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type={Passwordshow ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlechange}
              className="shadow appearance-none border rounded bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setPasswordshow(!Passwordshow)}
              className="text-xl text-white absolute top-9 cursor-pointer right-3"
            >
              {Passwordshow ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="text"
              name="conformPassword"
              value={passwords.conformPassword}
              onChange={handlechange}
              className="shadow appearance-none border rounded bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? <ReactLoading type='spinningBubbles' color='#fff' className="mx-auto my-auto" width={30} height={28} />
      :
  
          'Change Password'
      }
            
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordChange;
