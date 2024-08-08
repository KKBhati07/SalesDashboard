import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';

// App header component for navigation
export default function AppHeaderComponent() {
    const location = useLocation();

    return (
        <header className={styles.appHeader}>
            <div className={styles.headerContent}>
                <div className={styles.appName}>
                    <Link to="/" className={styles.headerLink}>
                        <h1>Sales Dashboard</h1>
                    </Link>
                </div>
                {location.pathname !== '/' && (
                    <nav className={styles.navLinks}>
                        <Link to="/today-sales" className={styles.navLink}>Today's Sales</Link>
                        <Link to="/sales-comparison" className={styles.navLink}>Sales Comparison</Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
