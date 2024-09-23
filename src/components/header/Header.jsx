import { FcLike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchProductMutation } from "../../redux/api/productsApi";
import { AutoComplete } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import DU from "../../imgs/DU.png";
import "../header/header.css";

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [searchProduct, { data }] = useSearchProductMutation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const likedProductsCount = useSelector((state) => state.like.likes.length);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (pathname.includes("auth")) return null;
  if (pathname.includes("dashboard/profile")) return null;
  if (pathname.includes("dashboard/users")) return null;
  if (pathname.includes("/dashboard")) return null;

  return (
    <div className="navbarcontainer">
      <div
        className={` top-0 left-0  transition-transform transform ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } z-40 w-72`}
        style={{ transition: "transform 0.3s ease", height: "100vh" }}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-3xl text-white hover:text-gray-400"
        >
          &times;
        </button>
        <ul className="flex flex-col items-start p-6 space-y-6">
          <li>
            <Link
              to={"/"}
              onClick={toggleSidebar}
              className="hover:text-gray-400 text-lg font-medium"
            >
              Home 
            </Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link
                  to={"auth/signUp"}
                  onClick={toggleSidebar}
                  className="hover:text-gray-400 text-lg font-medium"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to={"auth/login"}
                  onClick={toggleSidebar}
                  className="hover:text-gray-400 text-lg font-medium"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to={"/dashboard/profile"}
                onClick={toggleSidebar}
                className="hover:text-gray-400 text-lg font-medium"
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      {sidebarVisible && (
        <div
          onClick={toggleSidebar}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
          style={{ cursor: "pointer" }}
        ></div>
      )}

      <nav className="    w-full flex items-center justify-between p-4      navbar">
        <button
          onClick={toggleSidebar}
          className={`text-gray-800 text-2xl hover:text-gray-600 ${
            sidebarVisible ? "hidden" : ""
          }`}
        >
          <GiHamburgerMenu />
        </button>

        <Link to={"/"} className="flex items-center">
          <div className="flex items-center justify-center  rounded-full ml-[201px]">
          <div className=" DU ">
            <span className="text-5xl font-bold ml-[20px]">D</span>
            <span className="text-5xl font-bold ml-[-10px]">U</span>
            <span className="text-5xl  font-bold ml-[-10px]">F</span>
          </div>
          </div>
        </Link>

        <form onSubmit={handleSearch} className="flex flex-grow justify-center">
          <AutoComplete
            options={data?.payload?.map((product) => ({
              label: (
                <Link key={product._id} to={`/products/${product._id}`}>
                  {product.product_name}
                </Link>
              ),
            }))}
            style={{ maxWidth: "400px", width: "100%" }}
            onChange={(value) => setSearchValue(value)}
            onSearch={(text) => searchProduct(text)}
            placeholder="Search products..."
            className="flex-grow border border-gray-300 rounded-lg"
          />
        </form>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <Link to="/liked" className="text-2xl">
              <FcLike />
            </Link>
            {likedProductsCount > 0 && (
              <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {likedProductsCount}
              </span>
            )}
          </div>

          <Link to="/dashboard/profile">
            <CgProfile className="text-3xl text-gray-800 hover:text-gray-600" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
