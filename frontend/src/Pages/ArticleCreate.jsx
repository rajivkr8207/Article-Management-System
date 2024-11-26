import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ArticleCreate = () => {
  const { id } = useParams(); // This will hold the article ID for editing
  const { createarticle, userid } = useContext(UserContext);
  const navigate = useNavigate();
  const [articledata, setArticledata] = useState({
    title: "",
    content: "",
    category: "",
    photo: null,
  });
  const [categories, setCategories] = useState({})
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories/', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("article")).access
              }`,
          },
        });

        setCategories(response.data)
      } catch (error) {
        console.log(error);

      }
    }

    fetchcategory()
  }, [])

  // Fetch article data if we are in editing mode
  useEffect(() => {
    if (id) {
      const getArticleData = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/allarticle/${id}/`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("article")).access
                }`,
            },
          });

          const { title, content, category } = res.data;
          setArticledata({ title, content, category, photo: null });
          setIsEditing(true);
        } catch (error) {
          console.error("Error fetching article data:", error);
          toast.error("Failed to fetch article data");
        }
      };

      getArticleData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticledata({
      ...articledata,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setArticledata({
      ...articledata,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to append the data for both creating and updating
    const formData = new FormData();
    formData.append("title", articledata.title);
    formData.append("content", articledata.content);
    formData.append("category", articledata.category);
    if (articledata.photo) {
      formData.append("photo", articledata.photo);
    }

    try {
      if (isEditing) {
        // Update the article
        await axios.patch(
          `http://127.0.0.1:8000/api/allarticle/${id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("article")).access
                }`,
            },
          }
        );
        toast.success("Article updated successfully");
        navigate(`/profile/${userid}`);
      } else {
        // Create a new article
        await axios.post(`http://127.0.0.1:8000/api/allarticle/`, formData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("article")).access
              }`,
          },
        });
        toast.success("Article created successfully");
        navigate(`/profile/${userid}`);
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("Failed to submit article");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/30 text-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? "Edit Article" : "Create New Article"}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={articledata.title}
            onChange={handleChange}
            className="w-full bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter the article title"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="content">
            Content (HTML)
          </label>
          <textarea
            id="content"
            name="content"
            value={articledata.content}
            onChange={handleChange}
            rows="10"
            className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter HTML content (e.g., <h1>Heading</h1>, <p>Paragraph</p>)"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="photo">
            Image
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={articledata.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-black bg-transparent border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value=''>select a category</option>
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-md font-medium shadow-lg hover:shadow-xl hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105  "
        >
          {isEditing ? "Update Article" : "Submit Article"}
        </button>
      </form>
    </div>
  );
};

export default ArticleCreate;
