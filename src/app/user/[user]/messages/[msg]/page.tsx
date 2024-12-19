import { Params } from "@/types/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.css";
import ProgressBar from "@/components/partials/ProgressBar";

export default async function Page({ params }: {
    params: Params
}) {
    const msgId = (await params).msg;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    const res = await fetch(`${api}/admin/messages/${msgId}`, {
        method: 'GET',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    const data = await res.json();

    return (
        <div>
            <ProgressBar />

            <p className={styles.date}>{new Date(data.sentAt).toLocaleDateString('en-GB')}</p>

            <div className={styles.content}>
                {data.message}
            </div>
        </div>
    )
}