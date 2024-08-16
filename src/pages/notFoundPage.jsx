import React from 'react'
import { Link } from "react-router-dom"

export default function NotFoundPage(props) {


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Go to Home
            </Link>
        </div>
    )
}
