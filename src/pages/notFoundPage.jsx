import React from 'react'
import { Link } from "react-router-dom"

export default function NotFoundPage(props) {


    return (
        <div className="min-h-screen bg-[#1A2238] flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <p className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">Page Not Found</p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Go to Home
            </Link>
        </div>
    )
}
