import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
    return (
        <nav className="top-navbar">
            <ul>
                <li>
                <NavLink 
                    to="/UserHomePage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Αρχική Σελίδα
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to="/NetworkPage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Δίκτυο
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to="/JobListingsPage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Αγγελίες
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to="/ConversationsPage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Συζητήσεις
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to="/NotificationsPage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Ειδοποιήσεις
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to="/PersonalDetailsPage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Προσωπικά Στοιχεία
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to="/SettingsPage" 
                    className={({ isActive }) => isActive ? "active-link" : ""}
                >
                    Ρυθμίσεις
                </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
