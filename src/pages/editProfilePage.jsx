import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getUserData, updateProfile } from '../Redux/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../components'
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function EditProfilePage(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({
        previewImage: "",
        fullname: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    const handleImageUpload = (e) => {
        e.preventDefault()
        const uploadedImage = e.target.files[0]

        if (uploadedImage) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function () {
                // console.log(this.result);
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setData({
            ...data,
            [name]: value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (!data.fullname || !data.avatar) {
            toast.error("All Fields are Mandatory ")
            return
        }

        if (data.fullname.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return
        }

        const formData = new FormData()
        formData.append("fullName", data.fullname)
        formData.append("avatar", data.avatar)

        await dispatch(updateProfile([data.userId, formData]))

        await dispatch(getUserData())
        navigate("/")
    }

    return (
        <Layout>
            <div className='flex justify-center items-center h-[100vh]'>

                <form onSubmit={onFormSubmit} className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative min-h-[26rem]'>

                    <h1 className='text-center text-2xl font-bold ' >Edit Profile</h1>
                    <label htmlFor="image_uploads" className='cursor-pointer'>
                        {data?.previewImage ? (
                            <img className='w-24 h-24 rounded-full m-auto ' src={data.previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input onChange={handleImageUpload} type="file" id='image_uploads' accept='.jpg , .jpeg , .png , .svg' className='hidden' name='image_uploads' />

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='fullname' className='font-semibold'>Name</label>
                        <input
                            type='text'
                            required
                            name='fullname'
                            id='fullname'
                            placeholder='Enter your name...'
                            className='bg-transparent px-2 py-1 border'
                            onChange={handleInputChange}
                            value={data.fullname}
                        />
                    </div>
                    <button className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-xl cursor-pointer mt-2' type='submit'>Update Profile</button>

                    <Link to={"/user/profile"}>
                        <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-2'>
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>


                </form>

            </div>
        </Layout>
    )
}
