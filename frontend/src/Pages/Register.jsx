import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import ReactLoading from 'react-loading';

function Register() {
    const { register } = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [Passwordshow, setPasswordshow] = useState(false);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await register(username, email, password)
            if (response) {
                toast.success('Register successfull')
                navigate('/login');
                setLoading(false)
            } else {
                toast.error('something error')
                setLoading(false)
            }
        } catch (error) {
            toast.error('username already exist try other username');
            setLoading(false)

        }
        // console.log("Username:", username, "Email:", email, "Password:", password);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="bg-white/30 backdrop-blur-md p-10 shadow-xl rounded-xl w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">Register</h2>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                            {typeof error === 'string' ? error : JSON.stringify(error)}
                        </div>
                    )}
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-white font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-white font-medium mb-2">Password</label>
                            <input
                                type={Passwordshow ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordshow(!Passwordshow)}
                                className="text-xl text-white absolute top-12 cursor-pointer right-3"
                            >
                                {Passwordshow ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 hover:shadow-lg transition-all duration-300"
                        >
                            {loading ? <ReactLoading type='spinningBubbles' color='#fff' className="mx-auto my-auto" width={30} height={28} />
      :
  
          'Register'
      }
                        </button>
                    </form>
                    <p className="mt-6 text-center text-white text-sm">
                        have an account? <Link to="/login" className="text-pink-600 font-medium hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
