import React from 'react';
import styles from './app-loading.module.css';

//Component for indicate loading
export default function AppLoadingComponent() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
}
