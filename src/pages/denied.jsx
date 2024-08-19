import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Denied(props) {

    const navigate = useNavigate()

    return (
        <main className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
            <h1 className='text-9xl font-extrabold text-white tracking-widest'>
                403
            </h1>
            <div className='bg-black text-white px-2 text-sm rounded rotate-12 absolute'>
                Access Denied
            </div>
            <button onClick={() => navigate("/")} className='mt-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300'>
                Go to Home
            </button>
        </main >
    )
}
