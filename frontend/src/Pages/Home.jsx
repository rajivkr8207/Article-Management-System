import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

const Home = () => {
  const { getallarticle, refreshToken } = useContext(UserContext);
  const [getarticledata, setGetarticledata] = useState([]);
  const [filterarticle, setFilterarticle] = useState([]);
  const API_URL = "http://127.0.0.1:8000/api";
  const LocalName = "article";
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchcategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories/",
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("article")).access
              }`,
            },
          }
        );

        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/categories/",
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("article")).access
                }`,
              },
            }
          );

          setCategories(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    fetchcategory();
  }, [getarticledata]);

  useEffect(() => {
    const fetchgetdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/allarticle/`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem(LocalName)).access
            }`,
          },
        });
        // console.log('response' , response.data);
        setGetarticledata(response.data);
      } catch (error) {
        await refreshToken();
        try {
          const response = await axios.get(`${API_URL}/allarticle/`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem(LocalName)).access
              }`,
            },
          });
          // console.log('response' , response.data);
          setGetarticledata(response.data);
          // console.log(error);
        } catch (error) {
          console.log('error', error);
          navigate('/login')
          
        }
      }
    };
    fetchgetdata();
  }, []);

  const handleCategorySelect = (key) => {
    const filtered = getarticledata.filter((item) => item.category === key);
    setFilterarticle(filtered);
  };
  // const handleCategorySelect = (key) => {
  //   // Filter articles based on the selected category
  //   const filtered = getarticledata.filter((item) => item.category === key);
  //   setFilterarticle(filtered);
  // };
  if (!getallarticle) {
    return (
      <div>
        <ReactLoading
          type="spinningBubbles"
          color="#fff"
          className="mx-auto my-auto"
          width={200}
          height={200}
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4 my-8">
        <button
          className=" bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setFilterarticle([])} // Add functionality to handle clicks
        >
          All
        </button>
        {loading ? (
          <div>
            <ReactLoading
              type="bubbles"
              color="#fff"
              className="my-auto"
              width={60}
              height={40}
            />
          </div>
        ) : (
          Object.entries(categories)?.map(([key, value]) => (
            <button
              key={key}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleCategorySelect(key)} // Add functionality to handle clicks
            >
              {value}
            </button>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:p-6 p-3">
        {(filterarticle.length > 0 ? filterarticle : getarticledata)?.map(
          (item) => (
            <div
              key={item.id}
              className="bg-white/30 relative backdrop-blur-lg shadow-lg rounded-lg text-white overflow-hidden"
            >
              <Link to={`/read/article/${item.id}`}>
                <div className="relative">
                  {/* Article Image */}
                  <img
                    className="w-full h-48 object-cover"
                    src={item.photo}
                    alt={item.title}
                  />
                  {/* Category Badge */}
                  <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </Link>

              <Link to={`/read/article/${item.id}`}>
                <div className="p-4">
                  {/* Article Title */}
                  <h2 className="text-xl font-semibold truncate">
                    {item.title}
                  </h2>
                  {/* Article Description */}
                  <p className=" mt-2 line-clamp-3">{item.content}</p>
                </div>
              </Link>

              <div className="p-4 pt-2 flex justify-between items-center text-sm">
                {/* Publish Date */}
                <span>
                  Published: {new Date(item.created_at).toLocaleDateString()}
                </span>
                <Link to={`/user_profile/${item.username}`}>
              <span className="absolute bottom-4 right-4 text-white text-sm font-medium px-3 py-1 rounded-full bg-gray-800 bg-opacity-50">
                By {item.username}
              </span>
            </Link>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Home;
