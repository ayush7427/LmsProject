import React from 'react'
import { Layout } from '../components/index'

export default function AboutPage(props) {


    return (
        <Layout>
            <div className='pl-20 pt-20 flex flex-col text-white'>
                <div className='flex items-center gap-5 mx-10'>
                    <section className='w-1/2 space-y-10 '>
                        <h1 className='text-5xl text-yellow-500 font-semibold'>
                            Afforadable and quality education
                        </h1>
                        <p className='text-xl  text-gray-200'>
                            Our goal is to provide affordable and high-quality education to the world. We offer a platform where aspiring teachers and students can share their skills, creativity, and knowledge. By fostering a collaborative learning environment, we aim to empower individuals and contribute to the growth and well-being of humanity.

                        </p>
                    </section>

                    <div className='w-1/2'>
                        <img src="https://lms-learning-management-system.vercel.app/assets/about-558422f5.png" alt="about-image" className='drop-shadow-2xl' id='test1' style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }} />
                    </div>
                </div>


                <div className="carousel w-2/3 my-16 m-auto rounded-lg">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn bg-slate-700 btn-circle">❮</a>
                            <a href="#slide2" className="btn bg-slate-700 btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn bg-slate-700 btn-circle">❮</a>
                            <a href="#slide3" className="btn bg-slate-700 btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn bg-slate-700 btn-circle">❮</a>
                            <a href="#slide4" className="btn bg-slate-700 btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn bg-slate-700 btn-circle">❮</a>
                            <a href="#slide1" className="btn bg-slate-700 btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
