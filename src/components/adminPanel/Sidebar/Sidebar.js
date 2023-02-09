import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";


//icons =>
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";



export default function Sidebar() {
  const [activePath , setActivePath] = useState('')

  const adminInfo = useSelector(state => state.adminInfo)
  const navigate = useNavigate()

  const logOutHandler = () => {
    Swal.fire({
      title : 'خروج از پنل مدیریت' ,
      text : 'ایا میخواهید خارج شوید؟' ,
      showCancelButton : true ,
      cancelButtonText : 'خیر' ,
      confirmButtonText : 'بله'
    }).then(result => {
      if(result.isConfirmed){
        localStorage.removeItem("admin-token")
        navigate('/');
      }
    })
  }
  const showWeblogHandler = () => {
    navigate("/");
  }

  useEffect(() => {
    const currentPath = window.location.pathname.slice(9)
    setActivePath(currentPath)
  } , [])
  return (
    <>
      <div>
        <div className="text-center my-4">
          <div>
            <FaUserCircle className="personImg" />
          </div>
          <div className="mt-2">
            <div className="adminName">{adminInfo.name}</div>
            <div className="adminEmail">{adminInfo.email}</div>
          </div>
        </div>
        <ul>
          <li className={`py-1 my-2 menu_item ${activePath === '' ? 'active_menu' : ''}`} >
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <Link to="" onClick={() => setActivePath('')}>میز کار</Link>
          </li>
          <li className={`py-1 my-2 menu_item ${activePath === 'newArticle' ? 'active_menu' : ''}`} >
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <Link to="newArticle" onClick={() => setActivePath('newArticle')}>نوشته جدید</Link>
          </li>
          <li className={`py-1 my-2 menu_item ${activePath === 'articles' ? 'active_menu' : ''}`} >
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <Link to="articles"  onClick={() => setActivePath('articles')}>نوشته های پیشین</Link>
          </li>
          <li className={`py-1 my-2 menu_item ${activePath === 'comments' ? 'active_menu' : ''}`} >
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <Link onClick={() => setActivePath('comments')} to="comments">نظرات</Link>
          </li>
          <li className={`py-1 my-2 menu_item ${activePath === 'blogInfo' ? 'active_menu' : ''}`} >
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <Link onClick={() => setActivePath('blogInfo')} to="blogInfo">تنظیمات وبلاگ</Link>
          </li>
          <li className={`py-1 my-2 menu_item ${activePath === 'adminInfo' ? 'active_menu' : ''}`} >
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <Link onClick={() => setActivePath('adminInfo')} to="adminInfo">پروفایل ادمین</Link>
          </li>
          <li className="py-1 my-2 menu_item">
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <span onClick={showWeblogHandler} className="pointerCursor">مشاهده وبلاگ</span>
          </li>
          <li className="py-1 my-2 menu_item">
            <MdOutlineKeyboardArrowLeft className="text-muted" />
            <span onClick={logOutHandler} className="pointerCursor">خروج</span>
          </li>
        </ul>
      </div>
    </>
  );
}
