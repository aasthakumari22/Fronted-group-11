import React from 'react'
import {
    FaBars,
    FaBuilding,
    FaTh, FaThList, FaUserAlt
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({children}) {
    
  const menuItem=[
    {
        path:"/dashboard",
        name:"Dashboard",
        icon:<FaTh/>
    },
    {
        path:"/users",
        name:"Users",
        icon:<FaUserAlt/>
    },
    {
        path:"/restaurant",
        name:"Restaurant",
        icon:<FaBuilding/>
    },
    {
        path:"/orders",
        name:"Orders",
        icon:<FaThList/>
    },
  ]
  return (
    <div className="container">
        <div className="sidebar">
            <div className="top_section">
               <h1 className="logo">Admin Page</h1>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className="icon">{item.icon}</div>
                        <div className="link-text">{item.name}</div>

                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
        
    </div>
  )
}

export default Sidebar
