import React , {useEffect, useState} from 'react'
import './DraftArticle.css' 
//ckEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";

import ImageInsert from "ckeditor5-custom-build/build/translations/pl";
// react-bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// icons
import { AiOutlineClose } from "react-icons/ai";
// uuid
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "../../../components/Loader/Loader";
import { useParams } from 'react-router-dom';
import Messages from '../../../components/Messages/Messages';
export default function DraftArticle() {
  // states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lables, setLables] = useState("");
  const [supportComments, setSupportComments] = useState(1);
  const [supportTime, setSupportTime] = useState(true);

  // dispatch
  const dispatch = useDispatch();
  // store selectors
  const messages = useSelector((state) => state.messages);
  const isLoading = useSelector((state) => state.loader);
  const articles = useSelector(state => state.articles);

  // useParams
  const params = useParams()


  // useEffect => 
  useEffect(() => {
    const index = articles.findIndex(article => article.id === params.id);
    const articleObj = articles[index];

    setTitle(articleObj.title)
    setContent(articleObj.content)
    setLables(articleObj.lables.join("+"))
    setSupportComments(articleObj.supportComments)
    setSupportTime(Boolean(articleObj.createdAt))
  } , [])


  // handlers =>
  const publishArticleHandler = (publishState) => {
    // requirement validation!
    if (!title || !content) {
      dispatch({
        type: "messages/ADD_MESSAGE",
        payload: {
          id: uuidv4(),
          title: "لطفا ورودی هارا کامل کنید!",
          type: "warning",
        },
      });
      return;
    }

    const newArticleObj = {
      id: params.id ,
      title,
      content,
      isPublish: publishState === "publish" ? 1 : 0,
      lables: lables ? lables.split("+") : [] ,
      supportComments : supportComments,
      createdAt: supportTime && new Date().toJSON(),
    };

    // SEND_REQUEST & DISPATCH
    dispatch({
      type: "API_REQUEST",
      payload: {
        url: `http://localhost:3000/articles/${params.id}`,
        method: "PUT",
        data: newArticleObj,
        onSuccessType: "articles/EDIT_ARTICLE",
        onErrorType: "messages/ADD_MESSAGE",
      },
    });
  };

  // dismisError
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
      <div className="p-3 rounded bgLayout">
        <div className="container p-3 rounded">
          <div className="row">
            <div>
              {/* // titles */}
              <div>
                <input
                  type="text"
                  placeholder="عنوان نوشته"
                  className="form-control"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              {/* // content */}
              <div className="my-3">
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  config={{
                    Plugin: [ImageInsert],
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "blockQuote",
                      "link",
                      "numberedList",
                      "bulletedList",
                      "insertImage",
                      "insertTable",
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                      "mediaEmbed",
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </div>
              {/* // buttons */}
              <div className="my-3 ltr  text-start">
                <button
                  className="btn non-raduis btn-success mx-1"
                  data-action="publish"
                  onClick={(event) =>
                    publishArticleHandler(event.target.dataset.action)
                  }
                >
                  انتشار
                </button>
                <button
                  className="btn non-raduis btn-secondary mx-1"
                  data-action="draft"
                  onClick={(event) =>
                    publishArticleHandler(event.target.dataset.action)
                  }
                >
                  پیش نویس
                </button>
              </div>
              {/* // options */}
              <div className="mt-4">
                <Tabs
                  defaultActiveKey="lables"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="lables" title="برچسب ها">
                    <input
                      type="text"
                      placeholder="برچسب های نوشته"
                      className="form-control w-lg-50"
                      value={lables}
                      onChange={(event) => setLables(event.target.value)}
                    />
                    <div className="text-muted mt-1">
                      برچسب هارا میتوانید با + از یکدیگر جدا کنید
                    </div>
                  </Tab>
                  <Tab eventKey="commentsSitu" title="وضعیت نظردهی">
                    <select
                    value={supportComments}
                      className="form-control w-lg-50"
                      onChange={(event) =>
                        setSupportComments(+event.target.value)
                      }
                    >
                      <option value={1}>
                        نظردهی برای این نوشته فعال باشد
                      </option>
                      <option value={0}>
                        نظردهی برای این نوشته غیرفعال باشد
                      </option>
                    </select>
                  </Tab>
                  <Tab eventKey="TimeSitu" title="زمان انتشار">
                    <div className="d-flex align-items-center mx-3">
                      <input
                        type="checkbox"
                        value={supportTime}
                        checked={supportTime}
                        onChange={(event) =>
                          setSupportTime(event.target.checked)
                        }
                      />
                      <span className="mx-2">نمایش زمان انتشار</span>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
