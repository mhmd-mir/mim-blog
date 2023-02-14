import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import Messages from "../../../components/Messages/Messages";
import "./AdminInfo.css";
export default function AdminInfo() {
  const [id , setId] = useState('')
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");

  // selectors =>
  const adminInfo = useSelector((state) => state.adminInfo);


  useEffect(() => {
    setId(adminInfo.id)
    setName(adminInfo.name);
    setUsername(adminInfo.username);
    setEmail(adminInfo.email);
    setPassword(adminInfo.password);
    setAbout(adminInfo.about);
  }, [adminInfo]);

  //dispatch => 
  const dispatch = useDispatch()
  // handlers =>
  const changeAdminInfoHandler = () => {
    const newAdminInfo = {
      id: 1,
      name,
      username,
      password,
      email,
      about
    };

    dispatch({
        type : 'API_REQUEST' ,
        payload : {
            url : 'http://localhost:3000/adminInfo' ,
            method : 'PUT' ,
            data : newAdminInfo ,
            onSuccessType : 'admin/CHANGE_ADMIN_INFO' ,
            onErrorType : 'messages/ADD_MESSAGE'
        }
    })
  };
  const changeAdminPasswordHandler = () => {
    Swal.fire({
      icon : 'info' ,
      title : '<strong>تغییر رمز ورود</strong>' ,
      showCancelButton: true,
      text : 'رمز عبور جدید را وارد کنید' ,
      input : 'text',
      cancelButtonText : 'لغو' ,
      confirmButtonText : 'تغییر رمز'
    }).then(res => {
      if(res.value){
        dispatch({
          type : 'API_REQUEST' , 
          payload : {
            url : 'http://localhost:3000/adminInfo' ,
            method : 'PATCH' , 
            data : {password : res.value} ,
            uniqId : id,
            onSuccessType : 'admin/CHANGE_PASSWORD' ,
            onErrorType : 'messages/ADD_MESSAGE'
          }
        })
      }
    })
  }
  return (
    <>
        <Loading />
        <Messages />

      <div className="bgLayout p-3 rounded">
        <div className="container">
          <div class="text-center p-1 headerIntro">پروفایل مدیر وبلاگ</div>
          <div className="mt-4">
            <div className="row">
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">نام</span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="نام را اینجا وارد کنید"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">نام کاربری</span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="نام کاربری را اینجا وارد کنید"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">ایمیل</span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder=" ایمیل را اینجا وارد کنید"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">رمز ورود</span>
                  <button class="form-control bg-primary text-end text-white" onClick={changeAdminPasswordHandler}>
                    تغییر رمز ورود
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div>
                <span className="lableInput">درباره من</span>
                <textarea
                  className="form-control aboutMeInput"
                  placeholder="چند خط درباره من"
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row mt-4">
              <div className="text-start">
                <button
                  className="btn non-raduis bg-danger text-white"
                  onClick={() => changeAdminInfoHandler()}
                >
                  ثبت تغییرات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
