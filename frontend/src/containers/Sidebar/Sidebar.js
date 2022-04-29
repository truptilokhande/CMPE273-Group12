import React from "react";
import "./Sidebar.css";
import { signinsuccess } from "../../store/actions/actions";
import { useSelector } from "react-redux";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from "react-router";
function Sidebar() {
  const data=useSelector(signinsuccess)
  const isAdmin=data?.payload?.user?.isAdmin
 const navigate=useNavigate();
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
         <DropdownButton 
        alignRight
      title="Analytics"
      className="dropdown-menu-align-down"
      style={{borderStyle:"none",backgroundColor:"transparent",color:"hsl(210, 8%, 35%)",marginLeft:"50px"}}  
        >
              <Dropdown.Item eventKey="Question analytics" href="/questionAnalytics">Question analytics</Dropdown.Item>
              <Dropdown.Item eventKey="option-2" href="/topViewedQuestions">Top Questions</Dropdown.Item>
              <Dropdown.Item eventKey="option-3" href="/topTags">Top tags</Dropdown.Item>
              <Dropdown.Item eventKey="option-3" href="/highReputedUsers">High reputed users</Dropdown.Item>
              <Dropdown.Item eventKey="option-3" href="/lowReputedUsers">Low reputed users</Dropdown.Item>
      </DropdownButton>
           </div> 
            
          ):(<span></span>)}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
