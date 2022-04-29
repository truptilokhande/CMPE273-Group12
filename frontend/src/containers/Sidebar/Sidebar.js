import React from "react";
import "./Sidebar.css";
import { signinsuccess } from "../../store/actions/actions";
import { useSelector } from "react-redux";
function Sidebar() {
  const data=useSelector(signinsuccess)
  const isAdmin=data?.payload?.user?.isAdmin

  return (
    <>
      <div className="sidebar-wrapper">
        <div className="sidebar-container">
          <ul className="sidebar-navigation pt-4">
            <li>
              <a href="/" className="side-bar-menu-item">
                Home
              </a>
            </li>
          </ul>

          <ul className="sidebar-navigation pt-4">
            <li className="side-bar-menu-item sidebar-heading">PUBLIC</li>
            <li>
              <a href="/tags" className="side-bar-menu-item">
                Tags
              </a>
            </li>
            <li>
              <a href="/users" className="side-bar-menu-item">
                Users
              </a>
            </li>
         </ul>
          {isAdmin?(
          <div>
          <ul className="sidebar-navigation pt-4">
           <li>
              <a href="/Addtag" className="side-bar-menu-item">
                Add tag
              </a>
            </li>
            <li>
              <a href="/Aproove" className="side-bar-menu-item">
                Review questions
              </a>
            </li>
         </ul>
           </div> 
            
          ):(<span></span>)}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
