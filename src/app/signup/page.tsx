import Header from "@/components/partials/Header";
import Signup from "@/components/Signup";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import styles from "../page.module.css";

export default async function Page() {
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    if (token) {
        notFound();
    }

    return (
        <>
            <Header />

            <div className={styles.main}>
                <Signup api={api as string} />
            </div>
        </>
    )
}