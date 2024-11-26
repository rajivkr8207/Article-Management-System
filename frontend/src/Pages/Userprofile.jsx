import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import profilepic from "../assets/profile.png";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const Userprofile = () => {
  const { username } = useParams();
  const { getProfile, getallarticle, deletearticle, refreshToken, userid } =
    useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [getarticledata, setGetarticledata] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://127.0.0.1:8000/api";
  const LocalName = "article";
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("article"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/user/profile/${username}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem(LocalName)).access
            }`,
          },
        });
        // console.log(res.data);

        if (res.data.id == userid) {
          navigate(`/profile/${userid}`);
        } else {
          setProfile(res.data);
        }
        if (res.data.id) {
          try {
            // Attempt to fetch articles
            const response = await axios.get(`${API_URL}/allarticle/`, {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem(LocalName)).access
                }`,
              },
            });

            const userArticles = response.data.filter(
              (item) => item.author == res.data.id
            );

            setArticles(userArticles);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }
      } catch (err) {
        toast.error("User Not found");
        navigate("/");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, username, getProfile, getarticledata]);

  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="max-w-md relative mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden mt-10 p-6">
        <div className="profile-container text-white">
          <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
          <div className="flex justify-center items-center">
            <img
              src={
                profile.profile && profile.profile.image
                  ? `http://127.0.0.1:8000/${profile.profile.image}`
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          <ReactLoading
            type="spinningBubbles"
            color="#fff"
            className="mx-auto my-auto"
            width={200}
            height={200}
          />
        ) : articles.length > 0 ? (
          articles.map((item) => (
            <div
              key={item.id}
              className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-white p-4"
            >
              <Link to={`/read/article/${item.id}`}>
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.photo}
                    alt={item.title}
                  />
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

export default Userprofile;
