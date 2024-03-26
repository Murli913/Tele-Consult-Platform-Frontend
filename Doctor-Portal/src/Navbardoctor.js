import "./navbarstyle.css";
import React from "react";

const Navbar = () => {

    return ( 
        <section id="header">
            <img src="/images/logoprofile.JPG" width="100px" height="80px" alt=""/>
            <div id="logo">
            <p>Aziz</p>
            <p>Doctor ID</p>
            </div>
            <div>
                <ul id="navbar">
                    <li><a href="/home"> Home</a></li>
                    <li><a href="/home"> profile</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </div>
        </section>
        
     );
}

export default Navbar;