import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogData from "../data/blogs.json";  // Import blog data from JSON

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog id from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const selectedBlog = blogData.find((blog) => blog.id === parseInt(id));
    setBlog(selectedBlog);
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <section id="blog-details" className="min-h-screen flex justify-center items-center bg-white-200">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover mb-4" />
        <p>{blog.content}</p>
      </div>
    </section>
  );
};

export default BlogDetails;
