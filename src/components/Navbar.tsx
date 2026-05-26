import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                🔓 <span>VulnWeb</span> Workshop
            </div>
            <ul className="navbar-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/search">Search</Link></li>
                <li><Link href="/upload">Upload</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;