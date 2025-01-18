import { PostsByCategory } from "@/types/interfaces";
import { Params } from "@/types/types";
import styles from "@/styles/post.module.css";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = await params;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    const user = slug.user;

    const res = await fetch(`${api}/user/${slug.user}/categories/private/${slug.category}`, {
        method: 'GET',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        return (
            <div>
                <p>It's empty here.</p>
            </div>
        )
    }

    const data: PostsByCategory[] = await res.json();

    return (
        <>
            <h1 className={styles.h1}>{user}'s Posts By Filter:</h1>
            <hr /><br />

            {data.map((post, idx) => (
                <div key={idx}>
                    <Link href={`/user/${user}/posts/${post.slug}`} className={styles.link}>

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