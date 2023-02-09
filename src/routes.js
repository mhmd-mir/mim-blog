// admin panel
import AdminIndex from "./pages/adminPanel/AdminIndex/AdminIndex";
import Dashboard from './pages/adminPanel/Dashboard/Dashboard';
import Comments from './pages/adminPanel/Comments/Comments';
import NewArticle from "./pages/adminPanel/NewArticle/NewArticle";
import Articles from "./pages/adminPanel/Articles/Articles";
import DraftArticle from './pages/adminPanel/DraftArticle/DraftArticle';
import BlogInfo from './pages/adminPanel/BlogInfo/BlogInfo'
import AdminInfo from './pages/adminPanel/AdminInfo/AdminInfo' 

// site
import Login from './pages/Login/Login' ;
import Index from "./pages/Index/Index" ;
import ArticlePage from './pages/ArticlePage/ArticlePage'
const routes = [
    { 
        path: "/p-admin", 
        element: <AdminIndex /> ,
        children : [
            {path : '' , element : <Dashboard></Dashboard>} ,
            {path : 'comments' , element : <Comments></Comments>} ,
            {path : 'newArticle' , element : <NewArticle></NewArticle>} ,
            {path : 'draft/:id' , element : <DraftArticle></DraftArticle>} ,
            {path : 'articles' , element : <Articles></Articles>} ,
            {path : 'comments' , element : <Comments></Comments>} ,
            {path : 'blogInfo' , element : <BlogInfo></BlogInfo>} ,
            {path : 'adminInfo' , element : <AdminInfo></AdminInfo>} ,

        ]
    } , 
    {
        path : "/login" ,
        element : <Login/> 
    },
    {
        path : "/" ,
        element : <Index /> ,
    },
    {
        path : "article/:id", 
        element : <ArticlePage />
    }
];

export default routes;
