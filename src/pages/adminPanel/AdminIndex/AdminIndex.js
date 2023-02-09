import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/adminPanel/Sidebar/Sidebar";
import Topbar from "../../../components/adminPanel/Topbar/Topbar";
import "./AdminIndex.css";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
export default function AdminIndex() {
  const [showMenu, setShowMenu] = useState(true);


  const navigator = useNavigate();


  const adminInfo = useSelector(state => state.adminInfo)

  useEffect(() => {
    const adminToken = localStorage.getItem('admin-token');
    if(adminToken !== adminInfo.token){
      navigator('/login');
    }
  } , [])
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Topbar />
          </div>
          <div className="d-flex justify-content-center align-items-center p-2 pt-3 mt-1">
            <GiHamburgerMenu className="hambergerMenu" onClick={() => setShowMenu(prev => !prev)}/>
          </div>
        </div>
      </div>
      <hr />
      <div className="container-fluid rtl">
        <div className="row">
          {showMenu && (
            <div className="col-lg-2">
              <Sidebar />
            </div>
          )}
          <div className={`border-end ${showMenu ? 'col-lg-10' : 'col-lg-12'}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
