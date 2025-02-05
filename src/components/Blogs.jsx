import { useState, useEffect } from "react";
import staticBlogs from "../data/blogs.json";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    setBlogs([...staticBlogs, ...savedBlogs]);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      const reader = new FileReader();
      reader.onloadend = () => setImageData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") return;

    const newBlog = {
      id: Date.now(),
      title,
      content,
      image: imageData,
      author: "You",
      date: new Date().toISOString().split("T")[0],
    };

    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const updatedBlogs = [...savedBlogs, newBlog];
    localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs));

    setBlogs([...staticBlogs, ...updatedBlogs]);

    setTitle("");
    setContent("");
    setImageData(null);
    setImagePreview(null);
    setShowAddModal(false);
  };

  const handleDeleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);

    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const newSavedBlogs = savedBlogs.filter((blog) => blog.id !== id);
    localStorage.setItem("dynamicBlogs", JSON.stringify(newSavedBlogs));
  };

  return (
    <section id="blogs" className="min-h-screen bg-gray-200 py-10 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5 m-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-5 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="mb-4 w-full h-64 object-cover rounded-lg"
                />
              )}
              <p className="text-gray-700 mb-4">{blog.content.substring(0, 100)}...</p>
              <p className="text-gray-500 text-sm">
                By {blog.author} on {blog.date}
              </p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/blogs/${blog.id}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  Read More
                </Link>

                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <FaPlus size={20} />
      </button>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-2xl font-semibold mb-4">Add New Blog</h3>
            <form onSubmit={handleAddBlog}>
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                placeholder="Blog Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mb-4"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mb-4 w-full h-48 object-cover rounded"
                />
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setTitle("");
                    setContent("");
                    setImageData(null);
                    setImagePreview(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
