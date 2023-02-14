import React, { useEffect, useState } from "react";
import "./articles.css";
import Loader from "./../../../components/Loader/Loader";

// toJalali
import toJalali from "./../../../funcs/toJalali";

//swal
import Swal from "sweetalert2";
// icons
import { AiOutlineClose } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// components
import { Link } from "react-router-dom";
import Messages from "../../../components/Messages/Messages";
export default function Articles() {
  const articles = useSelector((state) => state.articles);
  const isLoading = useSelector((state) => state.loader);
  const messages = useSelector((state) => state.messages);

  //states =>
  const [filterState , setFilterState] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const dispatch = useDispatch();

  // handlers =>
  const deleteArticleHandler = (id) => {
    Swal.fire({
      title: "مطمعن هستید؟",
      icon: "error",
      confirmButtonText: "بله",
      showCancelButton: true,
      cancelButtonText: "خیر",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch({
          type: "API_REQUEST",
          payload: {
            method: "DELETE",
            uniqId: id,
            url: `http://localhost:3000/articles/${id}`,
            onErrorType: "messages/ADD_MESSAGE",
            onSuccessType: "articles/REMOVE_ARTICLE",
          },
        });
      }
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

  const filterArticleHandler = (filterMood) => {
    // switch (filterMood) {
    //   case "all": {
    //     setFilterState(filterMood);
    //     break;
    //   }
    //   case "drafts": {
    //     const draftArticles = articles.filter(
    //       (article) => article.isPublish === 0
    //     );
    //     setFilterState("");
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }
    setFilterState(filterMood)
  };

  return (
    <>
      {isLoading && <Loader />}
      <Messages />

      <div className="bgLayout p-3 rounded">
        <div className="container">
          <div className="text-center p-1 headerIntro">
            نوشته های پیشین وبلاگ
          </div>
          <div className="articlesSection">
            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="w-sm-40 w-50 mx-2">
                <select
                  className="form-control"
                  onChange={(event) => filterArticleHandler(event.target.value)}
                >
                  <option value="all">اخرین نوشته ها</option>
                  <option value="drafts">نوشته های پیش نویس</option>
                </select>
              </div>
              <div className="position-relative w-sm-40 w-50  d-flex justify-content-end">
                <input
                  type="text"
                  placeholder="جست و جو در عناوین نوشته ها"
                  className="searchInput form-control w-50"
                />
                <button className="btn btn-primary non-raduis searchBtn">
                  جست جو
                </button>
              </div>
            </div>
            {/* // data-table */}
            <div className="mt-4 py-3 table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>تاریخ</th>
                    <th>عنوان</th>
                    <th>وضعیت انتشار</th>
                    <th>نظرخواهی</th>
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterState === 'all' ? (
                      articles.map((article) => (
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
                          <td>
                            <Link
                              to={`/p-admin/draft/${article.id}`}
                              className="btn non-raduis btn-secondary"
                            >
                              <AiFillEdit />
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn non-raduis btn-danger"
                              onClick={() => deleteArticleHandler(article.id)}
                            >
                              <RiDeleteBin2Line />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      articles.filter(article => !article.isPublish).map((article) => (
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
                          <td>
                            <Link
                              to={`/p-admin/draft/${article.id}`}
                              className="btn non-raduis btn-secondary"
                            >
                              <AiFillEdit />
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn non-raduis btn-danger"
                              onClick={() => deleteArticleHandler(article.id)}
                            >
                              <RiDeleteBin2Line />
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
