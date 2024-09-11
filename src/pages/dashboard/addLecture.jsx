import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addCourseLectures } from '../../Redux/lectureSlice'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function AddLecture(props) {

    const courseDetails = useLocation().state
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserInput({
            ...userInput,
            [name]: value
        })
    }


    const handleVideo = (e) => {
        const video = e.target.files[0]
        const source = window.URL.createObjectURL(video)
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (!userInput.lecture || !userInput.title || !userInput.description) {

            toast.error("All fields are mandatory")
            return
        }

        const response = await dispatch(addCourseLectures(userInput))

        if (response?.payload?.success) {
            navigate(-1)
            setUserInput(
                {
                    id: courseDetails._id,
                    lecture: undefined,
                    title: "",
                    description: "",
                    videoSrc: ""
                }
            )
        }
    }


    useEffect(() => {
        if (!courseDetails) navigate("/courses")
    }, [])

    return (
        <Layout>
            <div className='min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16'>

                <div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg'>
                    <button
                        className='absolute left-2 text-xl text-green-500 cursor-pointer'
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineArrowLeft />
                    </button>
                    <header className='flex items-center justify-center relative'>
                        <h1 className='text-xl text-yellow-500 font-semibold'>Add new lecture</h1>
                    </header>

                    <form onSubmit={onFormSubmit} className='flex flex-col gap-3'>

                        <input
                            type="text"
                            name='title'
                            placeholder='Enter the title of the lecture'
                            onChange={handleInputChange}
                            className='bg-transparent px-3 py-1 border'
                            value={userInput.title}
                        />

                        <textarea
                            type="text"
                            name='description'
                            placeholder='Enter the description of the lecture'
                            onChange={handleInputChange}
                            className='bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36'
                            value={userInput.description}
                        />

                        {
                            userInput.videoSrc ?
                                (
                                    <video
                                        src={userInput.videoSrc}
                                        controls
                                        controlsList='nodownload'
                                        className='object-fill rounded-tl-lg rounded-tr-lg w-full'
                                    >
                                    </video>
                                )
                                :
                                (
                                    <div className='h-48 border flex items-center justify-center cursor-pointer'>
                                        <label className='font-semibold text-xl cursor-pointer' htmlFor="lecture">Choose your video</label>
                                        <input
                                            type="file"
                                            className='hidden'
                                            id='lecture'
                                            name='lecture'
                                            onChange={handleVideo}
                                            accept='video/mp4  video/x-mp4 video/*'
                                        />
                                    </div>
                                )
                        }
                        <button type='submit' className='btn btn-primary py-1 font-semibold text-lg'>
                            Add New Lecture
                        </button>
                    </form>
                </div>
            </div>
        </Layout >
    )
}
