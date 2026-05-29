import { useState } from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            {/* Left side: Logo + Name */}
            <div className="navbar-brand">
                <img src={logo} alt="Green Valley Cabin" className="logo" />
                <span className="brand-text">Green Valley Cabin</span>
            </div>

            {/* Hamburger Toggle Button for Mobile */}
            <button className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            {/* Middle: Navigation Links */}
            <div className={`navbar-links ${isOpen ? "active" : ""}`}>
                <a href="#home" className="nav-link" onClick={closeMenu}>Home</a>
                <a href="#about" className="nav-link" onClick={closeMenu}>About</a>
                <a href="#gallery" className="nav-link" onClick={closeMenu}>Gallery</a>
                <a href="#explore" className="nav-link" onClick={closeMenu}>Explore</a>
                <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
            </div>
        </nav>
    );
}
