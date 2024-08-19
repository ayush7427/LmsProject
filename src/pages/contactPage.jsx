import React, { useState } from 'react'
import { Layout } from '../components/index.js'
import { toast } from 'react-toastify'
import axiosInstance from '../Helpers/axiosInstance.js'

export default function ContactPage(props) {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleInputChange = (e) => {

        // console.log(e.target.value);

        const { name, value } = e.target

        setUserInput({
            ...userInput,
            [name]: value
        })

        // console.log(userInput);

    }

    const onFormSubmit = async (e) => {
        e.preventDefault()

        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory ")
            return
        }

        if (!userInput.email.match(/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid email")
            return
        }

        try {
            const response = axiosInstance.post("/contact", userInput)
            toast.promise(response, {
                pending: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            })
            const contactResponse = await response

            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }

        } catch (error) {
            toast.error("Something went wrong")

        }
    }



    return (
        <Layout>

            <div className='flex items-center justify-center  h-[100vh]'>
                <form className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'
                    onSubmit={onFormSubmit} noValidate >

                    <h1 className='text-3xl font-semibold '>
                        Contact Form
                    </h1>

                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="name" className='text-xl font-semibold'>Name</label>
                        <input
                            required
                            type="text"
                            className='bg-transparent border px-2 py-1 rounded-sm'
                            id="name"
                            name='name'
                            placeholder='Enter your name'
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="email" className='text-xl font-semibold'>Email</label>
                        <input
                            required
                            type="email"
                            className='bg-transparent border px-2 py-1 rounded-sm'
                            id="email"
                            name='email'
                            placeholder='Enter your email'
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="message" className='text-xl font-semibold'>Message</label>
                        <textarea
                            required
                            className='bg-transparent border px-2 py-1 rounded-sm resize-none h-40'
                            id="message"
                            name='message'
                            placeholder='Enter your message'
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>
                    <button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-md py-2 font-semibold text-lg cursor-pointer' >Submit</button>
                </form>
            </div>

        </Layout>

    )
}
