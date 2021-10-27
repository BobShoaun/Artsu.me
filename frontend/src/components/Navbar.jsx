import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container z-20 mx-auto py-5 shadow-lg backdrop-filter backdrop-blur-sm sticky top-0">
      <ul className="flex items-center gap-10">
        <li>
          <Link className="dark:text-white text-2xl font-semibold">
            artsu.me
          </Link>
        </li>
        <li className="ml-auto">
          <input
            className="px-2 py-1 w-96 min-w-full outline-none text-white bg-transparent border-opacity-50 focus:border-opacity-100 border-gray-200"
            type="text"
            style={{ borderBottomWidth: "1px" }}
          />
        </li>
        <li className="ml-auto">
          <Link
            to="/register"
            className=" text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm"
            style={{ textUnderlineOffset: "3px" }}
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-gray-200 text-sm hover:underline font-semibold"
            style={{ textUnderlineOffset: "3px" }}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
