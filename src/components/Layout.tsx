import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">{children}</main>
            <footer className="footer">
                <p>&copy; 2024 Vulnerable Web Workshop — For Educational Purposes Only</p>
            </footer>
        </div>
    );
};

export default Layout;