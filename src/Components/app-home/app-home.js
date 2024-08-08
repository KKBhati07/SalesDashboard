import React from 'react';
import { Link } from 'react-router-dom';
import styles from './app-home.module.css'

// App Home Component
export default function AppHomeComponent() {
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.welcomeMessage}>Welcome to the Sales Dashboard</h1>
            <div className={styles.navOptions}>
                <Link to="/today-sales" className={styles.navButton}>Today's Sales</Link>
                <Link to="/sales-comparison" className={styles.navButton}>Sales Comparison</Link>
            </div>
        </div>
    );
}
