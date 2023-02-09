import React, { useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'


// icons => 
import {AiFillHome} from 'react-icons/ai' ;
import { useSelector } from 'react-redux';

export default function Header() {


    const blogTitle = useSelector(state => state.blogInfo.blogTitle)


  return (
    <>
        <div className='header_bg '>
            <div className="container">
                <div className="row">
                    <div className="topbar d-flex justify-content-between align-items-center rtl">
                        <div className='d-flex align-items-baseline'>
                            <div>
                                <Link to="/">
                                    <AiFillHome className='homeIcon' />
                                </Link>
                            </div>
                            <div className='mx-3'>
                                <Link to="/p-admin" className='loginLink'>ورود به پنل مدیریت</Link>
                            </div>
                        </div>
                        <div className='pt-3'>
                            <span class="logo">logo</span>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 pt-5">
                    <div className='text-center'>
                        <div className="blogTitle">{blogTitle}</div>
                        <div className='text-muted blogIntro mt-2'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
