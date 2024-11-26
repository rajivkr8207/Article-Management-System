import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ReactLoading from 'react-loading';


function Login() {
  const { login, userid } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [seen, setSeen] = useState(false)
  const [loading, setLoading] = useState(false)
// console.log(userid);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
   
    try {
      const response = await login(username, password);
      if (response) {
        // console.log('login successfull');
        toast.success('login successfull')
        navigate("/");
        setLoading(false)
      } else {
        toast.error("Login failed try again");
        setLoading(false)
      }
    } catch (err) {
      toast.error("Invalid credentials:", err.message);
      setLoading(false)
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
  <div className="bg-white/30 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
      Login
    </h2>
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label
          className="block mb-2 text-white font-semibold"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="relative">
        <label
          className="block mb-2 text-white font-semibold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type={seen ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-transparent text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          placeholder="Enter your password"
          required
        />
        <button
          type="button" // Ensure this is a button, not a submit action
          onClick={() => setSeen(!seen)}
          className="text-xl text-white absolute top-12 cursor-pointer right-3"
        >
          {seen ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <button
        type="submit"
        className="w-full text-lg font-semibold bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
      >
        
      {loading ? <ReactLoading type='spinningBubbles' color='#fff' className="mx-auto my-auto" width={30} height={28} />
      :
  
          'Login'
      }
      </button>
    </form>
    <p className="mt-6 text-center text-white text-sm">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="text-pink-600 font-medium hover:underline"
      >
        Register
      </Link>
    </p>
  </div>
</div>

    </>
  );
}

export default Login;
