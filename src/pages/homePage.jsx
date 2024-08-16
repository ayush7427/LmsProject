import React from 'react'
import { Layout } from "../components/index.js"
import { Link } from 'react-router-dom'

export default function HomePage(props) {


    return (
        <Layout>
            <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>

                <div className='w-1/2 space-y-6 '>

                    <h1 className='text-5xl font-semibold'>
                        Find out best
                        <span className='text-yellow-500 font-bold'>
                            {""} Online Courses
                        </span>
                    </h1>
                    <p className='text-xl text-gray-200'>
                        We offer an extensive library of courses, taught by highly skilled and qualified instructors, all at an affordable price, ensuring you receive top-quality education without breaking the bank.
                    </p>

                    <div className='space-x-6'>
                        <Link to={"/courses"}>
                        <button className='bg-rose-600 px-5 py-3 rounded-md font-semibold text-lg  cursor-pointer hover:bg-rose-700 transition-all ease-in-out duration-300'>
                            Explore courses
                        </button>
                         </Link>
                        <Link to={"/contact"}>
                        <button className='border-yellow-500 border-2 px-5 py-3 rounded-md font-semibold text-lg  cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300'>
                            Contact Us
                        </button>
                         </Link>
                    </div>
                </div>

                <div className='w-1/2 flex items-center justify-center '>
                <img src="https://pwskills.com/images/homePage/homepage-degree.webp" alt="home-page-image" />
                </div>
            </div>
        </Layout>
    )
}
