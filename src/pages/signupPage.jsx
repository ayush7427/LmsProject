import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import { Layout } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { createAccount } from '../Redux/AuthSlice';

export default function SignupPage(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const = useSelector(())

    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
        avatar: ""
    })
    // console.log(signupData);


    const handleuserInput = (e) => {
        const { name, value } = e.target

        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const [previewImage, setPreviewImage] = useState("")


    const getImage = (e) => {
        e.preventDefault()

        // getting the image
        const uploadedImage = e.target.files[0]

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            })

            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function () {
                // console.log(this.result);
                setPreviewImage(this.result)
            })
        }
    }

    const createNewAccount = async (e) => {
        e.preventDefault()
        if (!signupData.fullname || !signupData.email || !signupData.password || !signupData.avatar) {
            toast.error("Please fill all the details ")
            return
        }

        // checking name feld length
        if (signupData.fullname.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return
        }

        // email validation 
        if (!signupData.email.match(/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid email ")
            return
        }

        // password validation
        if (!signupData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character")
            return
        }

        const formdata = new FormData()

        formdata.append("fullname", signupData.fullname)
        formdata.append("email", signupData.email)
        formdata.append("password", signupData.password)
        formdata.append("avatar", signupData.avatar)

        //  dispatch create account action
        const response = await dispatch(createAccount(formdata))

        if (response?.payload?.success) {

            navigate("/")
        }

        setSignupData({
            fullname: "",
            email: "",
            password: "",
            avatar: ""
        })

        setPreviewImage("")
    }


    return (
        <Layout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className='text-center text-2xl font-bold'>Registration Page</h1>

                    <label htmlFor="image_uploads" className='cursor-pointer'>

                        {previewImage ? (
                            <img className='w-24 h-24 rounded-full m-auto ' src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>

                    <input onChange={getImage} type="file" id='image_uploads' accept='.jpg , .jpeg , .png , .svg' className='hidden' name='image_uploads' />

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='fullname' className='font-semibold'>Name</label>
                        <input
                            type='text'
                            required
                            name='fullname'
                            id='fullname'
                            placeholder='Enter your name...'
                            className='bg-transparent px-2 py-1 border'
                            onChange={handleuserInput}
                            value={signupData.fullname}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email' className='font-semibold'>Email</label>
                        <input
                            type='email'
                            required
                            name='email'
                            id='email'
                            placeholder='Enter your email...'
                            className='bg-transparent px-2 py-1 border'
                            onChange={handleuserInput}
                            value={signupData.email}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='password' className='font-semibold'>Password</label>
                        <input
                            type='password'
                            required
                            name='password'
                            id='password'
                            placeholder='Enter your password...'
                            className='bg-transparent px-2 py-1 border'
                            onChange={handleuserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button onClick={createNewAccount} className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-xl cursor-pointer mt-2' type='submit'>Create account</button>

                    <p className='text-center'>
                        Already have an account? <Link to={"/login"} className='link text-accent cursor-pointer'>Login</Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}
