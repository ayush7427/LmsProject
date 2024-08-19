import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../Redux/AuthSlice";

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const = useSelector(())

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // console.log(LoginData);

  const handleuserInput = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...LoginData,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!LoginData.email || !LoginData.password) {
      toast.error("Please fill all the details ");
      return;
    }

    //  dispatch create account action
    const response = await dispatch(login(LoginData));

    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleuserInput}
              value={LoginData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleuserInput}
              value={LoginData.password}
            />
          </div>

          <button
            onClick={onLogin}
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-xl cursor-pointer mt-2"
            type="submit"
          >
            Login
          </button>

          <p className="text-center">
            Don't have any account yet? {" "}
            <Link to={"/signup"} className="link text-accent cursor-pointer">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
