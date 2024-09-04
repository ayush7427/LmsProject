import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/razorPaySlice'
import { toast } from 'react-toastify'
import { BiRupee } from "react-icons/bi";

export default function Checkout(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const razorpayKey = useSelector((state) => state?.razorpay?.key)
    const subscriptionId = useSelector((state) => state?.razorpay?.subscription_id)
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified)
    const userData = useSelector((state) => state?.auth?.data)

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    const handleSubscription = async (e) => {
        e.preventDefault()

        if (!razorpayKey || !subscriptionId) {
            toast.error("Something went wrong")
            return
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscriptionId,
            name: "coursify Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: "#F37254"
            },
            prefill: {
                email: userData?.email,
                name: userData?.fullName
            },
            handler: async (response) => {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id
                paymentDetails.razorpay_signature = response.razorpay_signature
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id

                toast.success("Payment successfull")

                const res = await dispatch(verifyUserPayment(paymentDetails))
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail")
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    const load = async () => {
        await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())
    }

    useEffect(() => {
        load()
    }, [])
    return (
        <Layout>
            <form
                onSubmit={handleSubscription}
                className='min-h-[90vh] flex items-center justify-center text-white'
            >

                <div className='w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
                    <h1 className='bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tr-lg rounded-tl-lg'>Subscription bundle</h1>

                    <div className='px-4 space-y-5 text-center '>
                        <p className='text-[17px]'>
                            This purchase will allow you to access all available course
                            of our platform for{" "}
                            <span className='text-yellow-500 font-bold'>
                                <br />
                                1 year duration
                            </span>{" "}
                            All the existing and new launched courses will be also available
                        </p>

                        <p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500'>
                            <BiRupee /><span>3999</span>only
                        </p>

                        <div className='text-gray-400'>
                            <p>100% refund  on cancellation</p>
                            <p>*Terms and conditions applied*</p>
                        </div>

                        <button type='submit' className=' bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2 '>
                            Buy Now
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
