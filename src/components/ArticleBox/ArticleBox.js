import React from "react";
import "./ArticleBox.css";

import { Link } from "react-router-dom";

// icons => 
import {AiOutlineClockCircle} from 'react-icons/ai'
import toJalali from "../../funcs/toJalali";
export default function ArticleBox(props) {
  return (
    <div className="articleBox rtl my-3 mx-2">
      <div className="text-center">
        <img src="./images/articleImage.jpg" className="img-fluid" />
      </div>
      <div className="ltr mt-2 d-flex justify-content-between align-items-center">
        <div className="customBadge">mim-blog</div>
        <div className="d-flex justify-content-center align-items-center">
          <AiOutlineClockCircle />
          <span className="mx-1 mt-1">{
            props.createdAt ? (
              toJalali(props.createdAt.slice(0 ,10))
            ) : ('بدون تاریخ')
          }</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="h4">
          <Link to={`article/${props.id}`}>
            {props.title}
          </Link>
        </div>
      </div>
      <div>
        <p className="text-muted">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است.{" "}
        </p>
      </div>
      <div className="mt-2">
        <button className="btn non-raduis btn-primary px-4">
        <Link className="text-white" to={`article/${props.id}`}>
            بیشتر
          </Link>
        </button>
      </div>
    </div>
  );
}
