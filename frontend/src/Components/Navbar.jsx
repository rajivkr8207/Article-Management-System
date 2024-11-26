import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProvider, { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

function Navbar() {
  const { user, userid, logout } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  // console.log(userid);
  const handleLogout = () => {
    setToggle(false);
    if (logout()) {
      toast.success("logout successfull");
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="bg-black/20 shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-bold text-white">
                R/M
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                {user ? (
                  <>
                    <Link
                      to={`/`}
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Home
                    </Link>
                    <Link
                      to={`/profile/${userid}`}
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/create/article"
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Article Create
                    </Link>
                    <Link
                      to="/profile"
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Profile Search
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setToggle(!toggle)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-black/30 focus:outline-none"
              >
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      toggle ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${toggle ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {user ? (
              <>
                <Link
                  onClick={() => setToggle(false)}
                  to="/"
                  className="text-white hover:text-[#ec4899] block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setToggle(false)}
                  to={`/profile/${userid}`}
                  className="text-white hover:text-[#ec4899] block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Profile
                </Link>
                <Link
                  onClick={() => setToggle(false)}
                  to="/create/article"
                  className="text-white hover:text-[#ec4899] block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Article Create
                </Link>
                <Link
                  onClick={() => setToggle(false)}
                  to="/profile"
                  className="text-white hover:text-[#6366f1] px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Profile Search
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-400 block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setToggle(false)}
                  to="/login"
                  className="text-white hover:text-[#ec4899] block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setToggle(false)}
                  to="/register"
                  className="text-white hover:text-[#ec4899] block px-3 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Navbar;
