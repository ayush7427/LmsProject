import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { cancelCourseBundle } from '../Redux/razorPaySlice'
import { getUserData } from '../Redux/AuthSlice'
import { toast } from 'react-toastify'

export default function ProfilePage(props) {

    const userData = useSelector((state) => state?.auth?.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCancellation = async () => {
        await dispatch(cancelCourseBundle())
        await dispatch(getUserData())
        toast.success("Cancellation completed")
        navigate("/")
    }

    return (
        <Layout>
            <div className='min-h-[90vh] flex items-center justify-center'>
                <div className='my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <img
                        className='w-40 m-auto rounded-full border border-black'
                        src={userData?.avatar?.secure_url}
                        alt="" />

                    <h3 className='text-xl font-semibold text-center capitalize' >
                        {userData?.fullName}
                    </h3>

                    <div className='grid grid-cols-2 '>
                        <p>Email: {userData?.email} </p>
                        <p>Role: {userData?.role} </p>
                        <p>Subscription: </p>
                        <p>{userData?.subscription?.status === "active" ? "Active" : "Inactive"} </p>
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <Link to={"/changepassword"} className='w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center' >
                            <button>Change Password</button>
                        </Link>
                        <Link to={"/user/editprofile"} className='w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center' >
                            <button>Edit Profile</button>
                        </Link>
                    </div>
                    {userData?.subscription?.status === "active" && (
                        <button onClick={handleCancellation} className='w-full bg-rose-600 hover:bg-rose-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center' >Cancel Subscription</button>
                    )}
                </div>
            </div>
        </Layout >
    )
}
