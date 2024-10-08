import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/AuthSlice";

export default function Header(props) {
    const changeWidth = () => {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    };

    const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 0;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    const handleLogout = async (e) => {
        e.preventDefault();

        const result = await dispatch(logout())
        if (result?.payload?.success) {

            navigate("/");
        }
    };

    return (
        <div className="min-h-[10vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={() => changeWidth()}
                            size={"32px"}
                            className="font-bold text-white m-4"
                        />
                    </label>
                </div>

                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                        <ul className="menu p-4 h-[100%] w-48 sm:w-80 bg-base-100 text-base-content relative">
                            <li className="w-fit absolute right-2 z-50">
                                <button onClick={() => hideDrawer()}>
                                    <AiFillCloseCircle size={"24px"} />
                                </button>
                            </li>

                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            {isLoggedIn && role === "ADMIN" && (
                                <li>
                                    <Link to={"/course/create"}>Create New Course</Link>
                                </li>
                            )}

                            <li>
                                <Link to="/courses">Courses</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link to="/about">About us </Link>
                            </li>

                            {!isLoggedIn && (
                                <li className="absolute bottom-4 w-[90%]">
                                    <div className="w-full flex items-center justify-center">
                                        <button className="bg-blue-600 text-white btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link to="/login">Login</Link>
                                        </button>

                                        <button className="bg-purple-700 text-white btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link to="/signup">Signup</Link>
                                        </button>
                                    </div>
                                </li>
                            )}

                            {isLoggedIn && (
                                <li className="absolute bottom-4 w-[90%]">
                                    <div className="w-full flex items-center justify-center">
                                        <button className="bg-green-700 text-white btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link to="/user/profile">Profile</Link>
                                        </button>

                                        <button className="bg-rose-700 text-white btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                            <Link onClick={handleLogout}>Logout</Link>
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </label>
                </div>
            </div>
        </div>
    );
}
