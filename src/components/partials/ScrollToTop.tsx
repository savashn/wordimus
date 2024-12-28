"use client";
import React, { useEffect, useState } from 'react'
import { GoMoveToTop } from "react-icons/go";
import styles from "@/styles/post.module.css";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);

                if (timer) {
                    clearTimeout(timer);
                }

                const newTimer = setTimeout(() => {
                    setIsVisible(false);
                }, 1000);
                setTimer(newTimer);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className={styles.takeToTop}
                >
                    <GoMoveToTop />
                </button>
            )}
        </div>
    )
}

export default ScrollToTop