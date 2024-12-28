import { Params } from "@/types/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.css";
import ProgressBar from "@/components/partials/ProgressBar";
import Link from "next/link";
import Image from "next/image";
import ScrollToTop from "@/components/partials/ScrollToTop";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
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

            <div className={styles.profileContainer}>
                <Link href={`/user/${slug}`} className={`${styles.pictureWrapper} ${styles.link}`}>
                    <Image
                        src={data.senderImg ? `${data.senderImg}` : '/profile.jpg'}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className={styles.picture}
                    />
                </Link>
                <Link href={`/user/${slug}`} className={`${styles.author} ${styles.link}`}>{data.sender}</Link>
            </div>

            <p className={styles.date}>{new Date(data.sentAt).toLocaleDateString('en-GB')}</p>

            <p className={styles.readingTime}>Reading Time: {data.readingTime} minute</p>

            <div className={styles.content}>
                {data.message}
            </div>

            <ScrollToTop />
        </div>
    )
}