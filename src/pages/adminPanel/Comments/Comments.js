import React from "react";
import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
// toJalali
import toJalali from "../../../funcs/toJalali";
// icons
import { TiTick } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";
import store from "../../../store/store";
import Messages from "../../../components/Messages/Messages";
export default function Comments() {
  // selector
  const comments = useSelector((state) => state.comments);
  const isLoading = useSelector((state) => state.loader);
  const messages = useSelector((state) => state.messages);
  // dispatch
  const dispatch = useDispatch();

  // handlers =>
  const showCommentBodyHandler = (text) => {
    Swal.fire({
      title: "محتوای نظر",
      html: `<p>${text}</p>`,
      icon: "info",
    });
  };
  const changeConfirmStateHandler = (id, mood) => {
    switch (mood) {
      case "confirm": {
        dispatch({
          type: "API_REQUEST",
          payload: {
            url: `http://localhost:3000/comments/${id}`,
            method: "PATCH",
            uniqId: id,
            data: { isConfirm: 1 },
            onSuccessType: "comments/CONFIRM_COMMENT",
            onErrorType: "messages/ADD_MESSAGE",
          },
        });
        break;
      }
      case "reject": {
        dispatch({
          type: "API_REQUEST",
          payload: {
            url: `http://localhost:3000/comments/${id}`,
            method: "PATCH",
            uniqId: id,
            data: { isConfirm: 0 },
            onSuccessType: "comments/REJECT_COMMENT",
            onErrorType: "messages/ADD_MESSAGE",
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  };
  const deleteCommentHandler = (id) => {
    Swal.fire({
      title: "حذف نظر",
      text: "ایا از حذف این نظر اطمینان دارید؟",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "API_REQUEST",
          payload: {
            url: `http://localhost:3000/comments/${id}`,
            method: "DELETE",
            uniqId: id,
            onSuccessType: "comments/DELETE_COMMENT",
            onErrorType: "messages/ADD_MESSAGE",
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
  return (
    <>
      {isLoading && <Loader />}
      <Messages />

      <div className="bgLayout p-3 rounded">
        <div className="container">
        <div class="text-center p-1 headerIntro">تنظیمات کلی وبلاگ</div>
          <div className="commentsSection">
            <div className="d-flex justify-content-between align-items-center mt-4 p-2 ">
              <div>
                <select className="form-control commentStateSelectbox">
                  <option value="">همه نظرات</option>
                  <option value="">نظرات تایید شده</option>
                  <option value="">نظرات رد شده</option>
                </select>
              </div>
            </div>
            <div className="mt-5 table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>تاریخ</th>
                    <th>نویسنده</th>
                    <th>بلاگ</th>
                    <th>وضعیت انتشار</th>
                    <th>مشاهده</th>
                    <th>تایید</th>
                    <th>رد</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{toJalali(comment.createdAt)}</td>
                      <td>{comment.author}</td>
                      <td>{comment.article?.title}</td>
                      <td>
                        {comment.isConfirm ? (
                          <TiTick className="bigIcon greenFill" />
                        ) : (
                          <TiCancel className="bigIcon redFill" />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn non-raduis btn-secondary"
                          onClick={() => showCommentBodyHandler(comment.body)}
                        >
                          مشاهده
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn non-raduis btn-success"
                          onClick={() =>
                            changeConfirmStateHandler(comment.id, "confirm")
                          }
                        >
                          تایید
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn non-raduis btn-warning"
                          onClick={() =>
                            changeConfirmStateHandler(comment.id, "reject")
                          }
                        >
                          رد
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn non-raduis btn-danger"
                          onClick={() => deleteCommentHandler(comment.id)}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
