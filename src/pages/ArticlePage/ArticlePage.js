import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Topbar from "../../components/adminPanel/Topbar/Topbar";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

import { v4 as uuidv4 } from "uuid";

import "./ArticlePage.css";
import toJalali from "../../funcs/toJalali";
import Messages from "../../components/Messages/Messages";
import Loader from "../../components/Loader/Loader";

export default function ArticlePage() {
  const params = useParams();

  // states => 
  const [author , setAuthor] = useState('')
  const [body , setBody] = useState('')
  const [email , setEmail] = useState('')
  // selectors =>
  const articleInfo = useSelector((state) =>
    state.articles.find((article) => article.id === params.id)
  );
    const isLoading = useSelector(state => state.loader)
    
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(articleInfo);
  }, []);


  const addNewCommentHandler = () => {
    window.scrollTo(0, 0)
    const newCommentInfo = {
        id : uuidv4() ,
        createdAt: new Date().toJSON(),
        author ,
        body , 
        email ,
        articleId : params.id ,
        isConfirm : 0 
    }
    dispatch({
        type : 'API_REQUEST' , 
        payload : {
            url : 'http://localhost:3000/comments' ,
            method : 'POST' , 
            data : newCommentInfo ,
            onSuccessType : 'comments/ADD_COMMENT' ,
            onErrorType : 'messages/ADD_MESSAGE'
        }
    })
  }
  return (
    <>
    {isLoading &&  <Loader />}
      <Messages />

      <div className="container">
        <div className="row">
          <div className="topbar d-flex justify-content-between align-items-center rtl">
            <div className="d-flex align-items-baseline">
              <div>
                <Link to="/">
                  <AiFillHome className="homeIcon" />
                </Link>
              </div>
              <div className="mx-3">
                <Link to="/p-admin" className="loginLink">
                  ورود به پنل مدیریت
                </Link>
              </div>
            </div>
            <div className="pt-3">
              <span class="logo">logo</span>
            </div>
          </div>
        </div>
        <div className="row mt-5 pt-5 text-center">
          {articleInfo.createdAt && (
            <div className="text-muted">
              منتشر شده در {toJalali(articleInfo.createdAt.slice(0, 10))}
            </div>
          )}
          <div className="h2 my-1">{articleInfo.title}</div>
          <div className="lables d-flex justify-content-center mt-2">
            {articleInfo.lables.map((lable) => (
              <div className="lableBdg mx-1">{lable}</div>
            ))}
          </div>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: articleInfo.content }}
          ></div>
        </div>
      </div>
      {/* // comment section */}
      <div className="container mt-5 pt-5 rtl">
        <div className="h3">نظرات</div>
        <div className="allCommentsSection">
          {articleInfo.comments.length ? (
            articleInfo.comments.map((comment) => {
              if (comment.isConfirm) {
                return (
                  <div className="comment">
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">{comment.author}</div>
                      <div className="text-muted">
                        {toJalali(comment.createdAt?.slice(0, 10))}
                      </div>
                    </div>
                    <div className="mt-2">{comment.body}</div>
                  </div>
                );
              }
            })
          ) : (
            <div className="alert alert-warning">هیچ نظری موجود نیست</div>
          )}
        </div>
      </div>
      {/* // add comment section */}
      <div className="container rtl mt-5 pt-5 pb-5">
        <div className="h3">افزودن نظر</div>
        <div className="addCommentSection">
          <div className="row">
            <div className="col-md-6 mt-3">
              <input
                type="text"
                placeholder="نام خود را وارد کنید"
                className="form-control"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
            <div className="col-md-6 mt-3">
              <input
                type="text"
                placeholder="ایمیل خود را وارد کنید"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <textarea
                placeholder="نظر خود را وارد کنید"
                className="form-control commentEntry"
                value={body}
                onChange={(event) => setBody(event.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="row mt-2">
            <div className="text-start">
                <button className="btn non-raduis btn-primary" onClick={addNewCommentHandler}>افزودن نظر</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
