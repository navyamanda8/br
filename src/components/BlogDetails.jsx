import { useState, useEffect } from "react";
import { FaThumbsUp, FaShareAlt, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom"; // To access params and navigate programmatically

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog id from the URL params
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const blogDetail = savedBlogs.find((b) => b.id === parseInt(id)); // Find the blog by id
    setBlog(blogDetail);
  }, [id]);

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const updatedBlogs = savedBlogs.map((b) =>
      b.id === blog.id ? updatedBlog : b
    );
    localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs));
    setBlog(updatedBlog); // Update the state with the new like count
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
      const updatedBlogs = savedBlogs.filter((b) => b.id !== blog.id);
      localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs));
      navigate("/"); // Navigate back to the blogs list
    }
  };

  const handleShare = () => {
    // Implement your share functionality here
    alert("Share functionality not implemented yet.");
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <section id="blog-detail" className="min-h-screen bg-gray-200 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">{blog.title}</h2>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="mb-4 w-full h-64 object-cover rounded-lg"
          />
        )}
        <p className="text-gray-700 mb-4">{blog.content}</p>
        <p className="text-gray-500 text-sm">By {blog.author} on {blog.date}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 hover: cursor-pointer"
            >
              <FaThumbsUp size={16} />
              <span>{blog.likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="text-green-500 hover:text-green-700 flex items-center space-x-1 hover: cursor-pointer"
            >
              <FaShareAlt size={16} />
              <span>Share</span>
            </button>

            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
