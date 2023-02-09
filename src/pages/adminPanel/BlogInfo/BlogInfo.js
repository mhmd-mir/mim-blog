import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BlogInfo.css";

import Loader from "../../../components/Loader/Loader";


// icons => 
import {AiOutlineClose} from 'react-icons/ai'
import Messages from "../../../components/Messages/Messages";




export default function BlogInfo() {
  // states =>
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [copyRight, setCopyRight] = useState("");
  const [creator, setCreator] = useState("");
  // dispatch =>
  const dispatch = useDispatch();
  // use selector =>
  const blogInfo = useSelector((state) => state.blogInfo);
  const isLoading = useSelector((state) => state.loader);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    const blogInfoInit = { ...blogInfo };
    setTitle(blogInfoInit.blogTitle);
    setCopyRight(blogInfoInit.blogCopyRight);
    setCreator(blogInfoInit.creator);
  }, [blogInfo]);

  // handler =>
  const changeBlogInfoHandler = () => {
    const newBlogInfo = {
      id: 1,
      blogTitle: title,
      blogImg: img,
      blogCopyRight: copyRight,
      creator: creator,
    };
    dispatch({
      type: "API_REQUEST",
      payload: {
        url: "https://ill-rose-salmon-hem.cyclic.app/blogInfo",
        method: "PUT",
        data: newBlogInfo,
        onSuccessType: "blog/CHANGE_BLOG_INFO",
        onErrorType: "messages/ADD_MESSAGE",
      },
    });
  };



  const dismisError = (id) => {
    dispatch({
      type: "messages/REMOVE_MESSAGE",
      payload: {
        id,
      },
    });
  };
  return (
    <>
      {isLoading && <Loader />}
      <Messages />

      <div className="bgLayout p-3 rounded">
        <div className="container">
        <div class="text-center p-1 headerIntro">تنظیمات کلی وبلاگ</div>
          <div className="mt-4">
            <div className="row">
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">عنوان وبلاگ</span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="عنوان را اینجا وارد کنید"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">تصویر وبلاگ</span>
                  <input
                    type="file"
                    className="form-control "
                    placeholder="تصویر را اینجا وارد کنید"
                    onChange={(event) => setImg(event.target.files[0].name)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">متن کپی رایت</span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="کپی رایت را اینجا وارد کنید"
                    value={copyRight}
                    onChange={(event) => setCopyRight(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div>
                  <span className="lableInput">سازنده وبلاگ</span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="نام را اینجا وارد کنید"
                    value={creator}
                    onChange={(event) => setCreator(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="text-start">
                <button
                  className="btn non-raduis bg-danger text-white"
                  onClick={() => changeBlogInfoHandler()}
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
