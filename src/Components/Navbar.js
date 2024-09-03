import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className='logoContainer'>
                    <h3 className="logo">Tech Library</h3>
                </div>
                <ul className="navigation-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/addStory">Add New Story</Link></li>
                    <li><Link to="/aboutUs">About Us</Link></li>
                    <li><Link to="/contactUs">Contact Us</Link></li>
                    <li><Link to="/pagination"> | pagination</Link></li>
                    <li><Link to="/materialUI"> | Material-UI</Link></li>
                    <li><Link to="/scopedSearch"> | Scoped Search</Link></li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
