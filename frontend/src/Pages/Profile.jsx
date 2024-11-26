import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import profilepic from "../assets/profile.png";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const Profile = () => {
  const { id } = useParams();
  const { getProfile, getallarticle, deletearticle, refreshToken } =
    useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [getarticledata, setGetarticledata] = useState([]);
  const API_URL = "http://127.0.0.1:8000/api";
  const LocalName = "article";
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("article"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getProfile(id);
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch profile data");
      }
    };

    const fetchgetdata = async () => {
      setLoading(true);
      try {
        // Attempt to fetch articles
        const response = await axios.get(`${API_URL}/allarticle/`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem(LocalName)).access
            }`,
          },
        });

        const userArticles = response.data.filter((item) => item.author == id);
        setArticles(userArticles);
        setLoading(false);
      } catch (error) {
        // Check if the error is due to token expiration
        if (error.response && error.response.status === 401) {
          try {
            // Refresh the token
            await refreshToken();
            // Retry fetching articles after refreshing the token
            const retryResponse = await axios.get(`${API_URL}/allarticle/`, {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem(LocalName)).access
                }`,
              },
            });

            const retryUserArticles = retryResponse.data.filter(
              (item) => item.author == id
            );
            setArticles(retryUserArticles);
            setLoading(false);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            setError("Session expired. Please log in again.");
            navigate("/login");
            setLoading(false); // Redirect to login if refresh fails
          }
        } else {
          console.error("Failed to fetch articles:", error);
          setError("Failed to fetch articles");
        }
      }
    };
    fetchProfile();
    fetchgetdata();
  }, [navigate, id, getProfile, getarticledata]);

  const handledelete = async (id) => {
    try {
      await deletearticle(id);
      setArticles(articles.filter((article) => article.id !== id));
      toast.success("Post Delete successfully");
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return (
      <div className="w-full h-screen grid place-content-center">
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
  // console.log(profile);

  return (
    <>
      <div className="max-w-md relative mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden mt-10 p-6">
        <div className="profile-container text-white">
          <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
          <div className="flex justify-center items-center">
            <img
              src={
                profile.profile && profile.profile.image
                  ? profile.profile.image
                  : profilepic
              }
              alt={profile.username}
              className="w-[6rem] h-[6rem] rounded-full"
            />
          </div>
          <div className="space-y-4">
            <p>
              <strong className="font-semibold">Username:</strong>{" "}
              {profile.username}
            </p>
            <p>
              <strong className="font-semibold">Email:</strong> {profile.email}
            </p>
            <p>
              <strong className="font-semibold">Occupation:</strong>{" "}
              {profile.profile ? profile.profile.occupation : "N/A"}
            </p>
            <p>
              <strong className="font-semibold">Bio:</strong>{" "}
              {profile.profile ? profile.profile.bio : "No bio provided."}
            </p>
            <p>
              <strong className="font-semibold">Phone Number:</strong>{" "}
              {profile.profile
                ? profile.profile.phone_number
                : "No phone number provided."}
            </p>
            <div className="flex gap-5">
              <strong className="font-semibold">Password:</strong>
              <Link to={`/update/password`}>
                <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Change Password
                </button>
              </Link>
            </div>
            <Link to={`/profile/update/${profile.id}`}>
              <button className="absolute lg:top-10 top-10 lg:right-10 right-1 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          <ReactLoading
            type="spinningBubbles"
            color="#fff"
            className="mx-auto my-auto"
            width={30}
            height={28}
          />
        ) : articles.length > 0 ? (
          articles.map((item) => (
            <div
              key={item.id}
              className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-white p-4"
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
              <div className="p-2 ">
                <Link to={`/read/article/${item.id}`} className="">
                  <h3 className="text-lg font-semibold">
                    {item.title.slice(0, 20)}...
                  </h3>
                  <p className="">{item.content.slice(0, 20)}....</p>
                  <p className=" text-xs my-2">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </Link>
                <button
                  onClick={() => handledelete(item.id)}
                  className=" absolute lg:bottom-5 bottom-6 lg:right-10 right-6 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Delete
                </button>
                <Link
                  to={`/update/article/${item.id}`}
                  className=" bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Update
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </>
  );
};

export default Profile;
