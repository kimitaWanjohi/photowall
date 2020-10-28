import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import '../App.css';


function Dashboard(props) {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
         <div className="navbar-side">
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars  onClick ={showSidebar} className="text-white"/>
            </Link>
         </div>
         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
             <ul className='nav-menu-items' onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {
                    props.children
                }
             </ul>
         </nav>
        </>
    )
}

export default Dashboard;