"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/header.module.css";
import Link from "next/link";
import MenuItems from "./MenuItems";

function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const match = document.cookie.match(/x-auth-token=([^;]+)/);
            if (match) {
                const token = match[1];
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    setUsername(payload.username || '');
                } catch (e) {
                    console.error('Incorrect JWT Format:', e);
                }
            }
        }
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);

            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const isDesktop = windowWidth > 768;

    return (
        <header>
            <div className={styles.header}>

                <Link href="/" className={styles.appName}>
                    WORDIMVS
                </Link>

                <div className={styles.emptyContainer}></div>

                {!isDesktop ? (
                    <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
                        <span className={`${styles.menuLine} ${isOpen ? styles.openLine1 : ""}`}></span>
                        <span className={`${styles.menuLine} ${isOpen ? styles.openLine2 : ""}`}></span>
                        <span className={`${styles.menuLine} ${isOpen ? styles.openLine3 : ""}`}></span>
                    </button>
                ) : (
                    <MenuItems username={username} />
                )}
            </div>

            {windowWidth === 0 ? null : isDesktop ? (
                <div></div>
            ) : (
                <nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
                    <MenuItems username={username} />
                </nav>
            )}

        </header>
    );
}

export default Header;
