import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const adminInfo = useSelector(state => state.adminInfo)
    const navigate = useNavigate()

  const loginHandler = () => {
    if(email === adminInfo.email && password === adminInfo.password){
        localStorage.setItem('admin-token' , adminInfo.token);
        navigate('/p-admin')
    }else{
        Swal.fire({
            title : 'ایمیل یا رمز عبور نادرست میباشد!' ,
            icon : 'error' ,
            confirmButtonText : 'تایید'
        })
    }
  }
  return (
    <>
      <div className="loginSection">
        <div className="loginBox">
          <div className="loginHeader">
            <div className="text-center h3 bold">خوش امدید</div>
            <div className="text-center">
              برای دسترسی به پنل مدیریت فرم را تکمیل کنید
            </div>
          </div>
          <div className="mt-4 rtl">
            <div className="mt-2">
              <input
                type="text"
                placeholder="ایمیل خود را وارد کنید"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mt-2">
              <input
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mt-3">
              <button className="w-100 btn non-raduis btn-primary" onClick={loginHandler}>ورود</button>
            </div>
          </div>
          <div className="mt-3 pt-3">
            <div className="text-center">
              <Link to="/" className="text-primary">
                بازگشت به خانه
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
