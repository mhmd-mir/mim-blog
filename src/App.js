import { useRoutes } from "react-router-dom";
import allRoutes from "./routes";
import store from "./store/store";
import { Provider, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./App.css";

// icons =>
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import Loader from "./components/Loader/Loader";

function App() {
  const routes = useRoutes(allRoutes);

  const [theme, setTheme] = useState("light");
  const [supportSwitchTheme , setSupportSwitchTheme] = useState(false);


  const [storeLoaded , setStoreLoaded] = useState(false)

  // load handler => 
  const loadHandler = () => {
    // setStoreLoaded(true)
    console.log('now')
  }
  // useEffects
  useEffect(() => {
    store.dispatch({
      type: "API_REQUEST",
      payload: {
        url: "https://ill-rose-salmon-hem.cyclic.app/articles?_embed=comments",
        method: "INIT_STORE",
        onSuccessType: "articles/INIT_ARTICLES",
      },
    });
    store.dispatch({
      type: "API_REQUEST",
      payload: {
        url: "https://ill-rose-salmon-hem.cyclic.app/comments?_expand=article",
        method: "INIT_STORE",
        onSuccessType: "comments/INIT_COMMENTS",
      },
    });
    store.dispatch({
      type: "API_REQUEST",
      payload: {
        url: "https://ill-rose-salmon-hem.cyclic.app/blogInfo",
        method: "INIT_STORE",
        onSuccessType: "blog/INIT_BLOG_INFO",
      },
    });
    store.dispatch({
      type: "API_REQUEST",
      payload: {
        url: "https://ill-rose-salmon-hem.cyclic.app/adminInfo",
        method: "INIT_STORE",
        onSuccessType: "admin/INIT_ADMIN_INFO",
      },
    });
  }, []);
  useEffect(() => {
    const pathName = window.location.pathname.slice(1)
    if(pathName.includes('p-admin')){
      setSupportSwitchTheme(true)
    }else{
      setSupportSwitchTheme(false)
      setTheme('light')
    }
  } , [window.location.pathname])


  useEffect(() => {
    window.addEventListener('DOMContentLoaded' , loadHandler)
      return () => {
        window.removeEventListener('DOMContentLoaded' , loadHandler)
      }
    } , [])
  // handler =>
  const switchThemeHandler = () => {
    setTheme((prev) => {
      if (prev === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };
  return (
    <>
    {/* {<Loader/>} */}
      <div data-theme={theme === "dark" ? "dark" : "light"} id="topLevel">
        {supportSwitchTheme && (
          <div className="themeHandler" onClick={() => switchThemeHandler()}>
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </div>
        )}
        <Provider store={store}>{routes}</Provider>
      </div>
    </>
  );
}

export default App;
