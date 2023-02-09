import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import successMessage from "../../funcs/successMessage";
// loading actions
import { START_LOADING, FINISH_LOADING } from "./../slices/loader";

const API = (store) => (next) => (action) => {
  if (action.type != "API_REQUEST") {
    next(action);
    return;
  }
  // an API_REQUEST type
  const { url, method, data, onSuccessType, onErrorType, uniqId } =
    action.payload;

  switch (method) {
    case "INIT_STORE": {
      fetch(url , {
        headers : {
          Authorization : `Basic ${btoa('admin:mim-blogApi')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          store.dispatch({
            type: onSuccessType,
            payload: data,
          });
        })
        .catch((err) => {
          store.dispatch({
            type: onErrorType,
            payload: err,
          });
        });
      break;
    }
    case "POST": {
      store.dispatch(START_LOADING());
      fetch(url, {
        method,
        headers: {
          "Content-type": "Application/json",
          Authorization : `Basic ${btoa('admin:mim-blogApi')}`
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          store.dispatch({
            type: onSuccessType,
            payload: data,
          });
          successMessage(store , uuidv4())
          // off loader
          store.dispatch(FINISH_LOADING());
        })
        .catch((err) => {
          store.dispatch({
            type: onErrorType,
            payload: {
              id: uuidv4(),
              title: "عملیات با خطا مواجه شد",
              err,
              type: "danger",
            },
          });
          // off loader
          store.dispatch(FINISH_LOADING());
        });
      break;
    }
    case "DELETE": {
      store.dispatch(START_LOADING());
      fetch(url, {
        method,
        headers: {
          "Content-Type": "Application/json",
          Authorization : `Basic ${btoa('admin:mim-blogApi')}`
        },
      })
        .then((res) => {
          if (res.ok) {
            store.dispatch({
              type: onSuccessType,
              payload: {
                id: uniqId,
              },
            });
            successMessage(store , uuidv4())
            // off loader
            store.dispatch(FINISH_LOADING());
          }
        })
        .catch((err) => {
          store.dispatch({
            type: onErrorType,
            payload: {
              id: uuidv4(),
              title: "عملیات با خطا مواجه شد",
              err,
              type: "danger",
            },
          });
          // off loader
          store.dispatch(FINISH_LOADING());
        });

      break;
    }
    case "PUT": {
      store.dispatch(START_LOADING());
      fetch(url, {
        method,
        headers: {
          "Content-Type": "Application/json",
          Authorization : `Basic ${btoa('admin:mim-blogApi')}`
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((responseData) => {
          // ok
          store.dispatch({
            type: onSuccessType,
            payload: responseData,
          });
          successMessage(store , uuidv4())
          // off loader
          store.dispatch(FINISH_LOADING());
        })
        .catch((err) => {
          // err
          store.dispatch({
            type: onErrorType,
            payload: {
              id: uuidv4(),
              title: "عملیات با خطا مواجه شد",
              err,
              type: "danger",
            },
          });
          // off loader
          store.dispatch(FINISH_LOADING());
        });

      break;
    }
    case "PATCH": {
      store.dispatch(START_LOADING());
      fetch(url, {
        method,
        headers: {
          "Content-type": "Application/json",
          Authorization : `Basic ${btoa('admin:mim-blogApi')}`
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((responseData) => {
          // ok
          store.dispatch({
            type: onSuccessType,
            payload: responseData,
          });
          successMessage(store , uuidv4())
          store.dispatch(FINISH_LOADING());
        })
        .catch((err) => {
          // err
          store.dispatch({
            type: onErrorType,
            payload: {
              id: uuidv4(),
              title: "عملیات با خطا مواجه شد",
              err,
              type: "danger",
            },
          });
          store.dispatch(FINISH_LOADING());
        });
    }
    default: {
      return;
    }
  }
};

export default API;
