"use client";
import React, { useEffect, useRef } from 'react';
import styles from '@/styles/post.module.css';

function ProgressBar() {
    const progressBarRef = useRef<HTMLDivElement | null>(null);

    const updateProgressBar = () => {
        const contentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;
        const scrollPercentage = (scrollY / contentHeight) * 100;
        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${scrollPercentage}%`;
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", updateProgressBar);
        return () => window.removeEventListener("scroll", updateProgressBar);
    }, []);

    return (
        <div className={styles.progressBar}>
            <div className={styles.progress} ref={progressBarRef}></div>
        </div>
    )
}

export default ProgressBar