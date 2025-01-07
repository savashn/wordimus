import { Post } from "@/types/interfaces";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.css";
import Link from "next/link";
import { Params } from "@/types/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    let admin;

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);

        if (decodedToken.username === slug) {
            admin = decodedToken.username
        }
    }

    const res = await fetch(`${api}/user/${slug}/posts`, {
        method: 'GET',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    const data: Post[] = await res.json();

    const filteredData = admin ? data : data.filter(post => !post.isHidden);

    return (
        <>
            <h1 className={styles.h1}>{slug}'s All Posts:</h1>
            <hr /><br />

            {filteredData.map((post, idx) => (
                <div key={idx}>
                    <Link href={`/user/${slug}/posts/${post.slug}`} className={styles.link}>

                        <div className={styles.card}>

                            <p className={styles.date}>
                                {new Date(post.createdAt).toLocaleDateString('en-GB')}
                            </p>

                            <h2 className={styles.header}>{post.header}</h2>

                            <h3 className={styles.readingTime}>{post.readingTime} minute</h3>

                        </div>

                    </Link>
                </div>
            ))}
        </>
    )
}