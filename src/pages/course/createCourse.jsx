import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { createNewCourse } from '../../Redux/courseSlice'
import { Layout } from '../../components'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function CreateCourse(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    })

    const handleImageUpload = (e) => {

        e.preventDefault()

        // getting the image
        const uploadedImage = e.target.files[0]

        if (uploadedImage) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function () {
                // console.log(this.result);
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                })
            })
        }
    }

    const handleuserInput = (e) => {
        const { name, value } = e.target

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.previewImage || !userInput.thumbnail) {
            toast.error("All Fields are Mandatory ")
            return
        }
        const response = await dispatch(createNewCourse(userInput))

        if (response?.payload?.success) {

            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            })

            navigate("/courses")
        }
    }
    return (
        <Layout>
            <div className='flex justify-center items-center h-[100vh]'>
                <form onSubmit={onFormSubmit} className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative'>

                    <Link className='absolute top-8 text-2xl link text-accent cursor-pointer'>
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className='text-center text-2xl font-bold ' >Create New Course</h1>

                    <main className='grid grid-cols-2 gap-x-10 '>

                        <div className='gap-y-6'>
                            <div >
                                <label htmlFor="image_uploads" className='cursor-pointer'>
                                    {userInput.previewImage ? (
                                        <img
                                            src={userInput.previewImage}
                                            alt="image"
                                            className='w-full h-44 m-auto border'
                                        />
                                    ) : (
                                        <div className='w-full h-44 m-auto flex items-center justify-center border '>
                                            <h1 className='font-bold text-lg '>upload your course thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id='image_uploads'
                                    name='image_uploads'
                                    className='hidden'
                                    accept='.jpg , .jpeg , .svg , .png'
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="title" className='text-lg font-semibold'>Course Title</label>
                                <input
                                    type="text"
                                    required
                                    name='title'
                                    id='title'
                                    placeholder='Enter course title'
                                    className='bg-transparent px-2 py-1 border'
                                    value={userInput.title}
                                    onChange={handleuserInput}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1'>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="createdBy" className='text-lg font-semibold'>Course Instructor</label>
                                <input
                                    type="text"
                                    required
                                    name='createdBy'
                                    id='createdBy'
                                    placeholder='Enter course Instructor'
                                    className='bg-transparent px-2 py-1 border'
                                    value={userInput.createdBy}
                                    onChange={handleuserInput}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="category" className='text-lg font-semibold'>Course Category</label>
                                <input
                                    type="text"
                                    required
                                    name='category'
                                    id='category'
                                    placeholder='Enter course category'
                                    className='bg-transparent px-2 py-1 border'
                                    value={userInput.category}
                                    onChange={handleuserInput}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="description" className='text-lg font-semibold'>Course Description</label>
                                <input
                                    type="text"
                                    required
                                    name='description'
                                    id='description'
                                    placeholder='Enter course description'
                                    className='bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border'
                                    value={userInput.description}
                                    onChange={handleuserInput}
                                />
                            </div>

                        </div>
                    </main>
                    <button type='submit' className='w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 py-2 rounded-sm font-semibold text-lg cursor-pointer' >Create Course</button>
                </form>
            </div>
        </Layout>
    )
}
