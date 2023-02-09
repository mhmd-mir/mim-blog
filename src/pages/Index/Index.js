import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Articles from "../../components/Articles/Articles";
import { useSelector } from "react-redux";

export default function Index() {
  const blogCopyRight = useSelector(state => state.blogInfo.blogCopyRight)
  return (
    <>
      <Header />
      <Articles />

      {/* // copyRight section */}
      <div>
        <div className="mt-5 pt-5">
          <div className="text-center copyRight">
            {blogCopyRight}
          </div>
        </div>
      </div>
    </>
  );
}
