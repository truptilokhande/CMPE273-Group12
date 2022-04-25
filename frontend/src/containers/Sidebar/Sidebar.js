import React from "react";
import "./Sidebar.css";

function Sidebar() {
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
        </div>
      </div>
    </>
  );
}

export default Sidebar;
