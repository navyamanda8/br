const Header = () => {
  return (
    <div className="relative h-[50vh]">
      <div className="absolute inset-0 bg-cover bg-gray-800 text-white py-12 flex items-center justify-center z-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to Blogs Page.</h1>
      </div>
      <div className="absolute top-4 right-8 flex space-x-8 z-20">
        <a href="home" className="text-xl font-bold text-white hover:text-gray-300 cursor-pointer">
          Home
        </a>
        <a href="blogs" className="text-xl font-bold text-white hover:text-gray-300 cursor-pointer">
          Blogs
        </a>
        <a href="contact" className="text-xl font-bold text-white hover:text-gray-300 cursor-pointer">
          Contact
        </a>
      </div>
    </div>
  );
};
export default Header;
