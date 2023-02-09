import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import toJalali from "../../../funcs/toJalali";
// icons =>
import {TiTick} from 'react-icons/ti';
import {TiCancel} from 'react-icons/ti'
import { RiArticleLine } from "react-icons/ri";
import { BiCommentAdd } from "react-icons/bi";
import {RiDraftLine} from 'react-icons/ri' ;
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [articlesCount, setArticlesCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);
  const [draftsCount, setDraftsCount] = useState(null);
  const [adminInfoObj, setAdminInfoObj] = useState({});
  const [filteredArticles  ,setFilteredArticles] = useState([])

  const articles = useSelector((state) => state.articles);
  const comments = useSelector((state) => state.comments);
  const adminInfo = useSelector((state) => state.adminInfo);

  useEffect(() => {
    let publishedArticleCounter = 0;
    let draftArticleCounter = 0;

    articles.forEach((article) => {
      if (article.isPublish) {
        publishedArticleCounter++;
      } else {
        draftArticleCounter++;
      }
    });

    setArticlesCount(publishedArticleCounter);
    setCommentsCount(comments.length);
    setDraftsCount(draftArticleCounter);
    setAdminInfoObj(adminInfo);
    setFilteredArticles(articles.slice(0 ,5))
  }, [articles, comments, adminInfo]);
  return (
    <div className="rounded bgLayout p-3">
      <div className="row">
        <div className="col-md-4 mt-2">
          <div className="box d-flex justify-content-between align-items-center bg-danger">
            <RiArticleLine className="boxIcon" />
            <div className="boxTxt">{articlesCount} نوشته</div>
          </div>
        </div>
        <div className="col-md-4 mt-2">
          <div className="box d-flex justify-content-between align-items-center bg-success">
            <BiCommentAdd className="boxIcon" />
            <div className="boxTxt">{commentsCount} نظر</div>
          </div>
        </div>
        <div className="col-md-4 mt-2">
          <div className="box d-flex justify-content-between align-items-center bg-primary">
            <RiDraftLine className="boxIcon" />
            <div className="boxTxt">{draftsCount} پیش نویس</div>
          </div>
        </div>
      </div>
      <div className="row mt-100">
        <div className="adminName mx-3 my-4">5 نوشته اخیر</div>
        <div className="py-3 table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>تاریخ</th>
                <th>عنوان</th>
                <th>وضعیت انتشار</th>
                <th>نظرخواهی</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr>
                  <td>{toJalali(article?.createdAt)}</td>
                  <td className="articleTitle">{article.title}</td>
                  <td>
                    {article.isPublish ? (
                      <TiTick className="bigIcon greenFill" />
                    ) : (
                      <TiCancel className="bigIcon redFill" />
                    )}
                  </td>
                  <td>
                    {article.supportComments ? (
                      <TiTick className="bigIcon greenFill" />
                    ) : (
                      <TiCancel className="bigIcon redFill" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
