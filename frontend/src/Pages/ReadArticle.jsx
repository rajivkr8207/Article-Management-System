import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReadArticle = () => {
  const { id } = useParams();
  const { readarticle, refreshToken } = useContext(UserContext);
  const [articleData, setArticleData] = useState(null);
  const navigate = useNavigate();
  //   const history = useHistory();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await readarticle(id);

        setArticleData(res);
      } catch (error) {
        await refreshToken();
        try {
          const res = await readarticle(id);

          setArticleData(res);
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      }
    };
    fetchdata();
  }, [id]);

  const goBack = () => {
    navigate("/");
    // history.goBack();
  };

  return (
    <div className="lg:w-[50rem] w-[98%] my-8 mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-white overflow-hidden">
      {articleData ? (
        <>
          <div className="relative">
            <img
              className="w-full h-[25rem] object-cover rounded-t-lg shadow-lg"
              src={articleData.photo}
              alt={articleData.title}
            />
            <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
              {articleData.category}
            </span>
          </div>
          <div className="p-6 relative space-y-4">
            <Link to={`/user_profile/${articleData.username}`}>
              <span className="absolute bottom-4 right-4 text-white text-sm font-medium px-3 py-1 rounded-full bg-gray-800 bg-opacity-50">
                By {articleData.username}
              </span>
            </Link>
            <h2 className="text-3xl font-extrabold capitalize leading-tight mb-3">
              {articleData.title}
            </h2>
            <p className="text-sm text-gray-200 mb-4">
              Published on:{" "}
              {new Date(articleData.created_at).toLocaleDateString()}
            </p>
            <p className="text-base text-white leading-relaxed">
              {articleData.content}
            </p>

            <button
              onClick={goBack}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Go Back
            </button>
          </div>
        </>
      ) : (
        <p className="text-center p-6 text-lg font-medium text-gray-200">
          Article not Found...
        </p>
      )}
    </div>
  );
};

export default ReadArticle;
