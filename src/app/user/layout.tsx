import styles from "@/app/page.module.css";
import Header from "@/components/partials/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>
                <p className={styles.footerContent}>
                    Wordimus &copy; 2024 All rights reserved.
                </p>
            </footer>
        </>
    )
}