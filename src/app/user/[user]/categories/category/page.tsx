import { PostsByCategory } from "@/types/interfaces";
import { Params, SearchParams } from "@/types/types";
import styles from "@/styles/post.module.css";
import Link from "next/link";

export default async function Page(props: {
    params: Params
    searchParams: SearchParams
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const api = process.env.API_URI;

    const user = params.user;

    const query = Object.keys(searchParams)
        .map(key => {
            const value = searchParams[key as keyof typeof searchParams];
            if (Array.isArray(value)) {
                return value.map(v => `${key}=${encodeURIComponent(v)}`).join("&");
            } else if (value !== undefined) {
                return `${key}=${encodeURIComponent(value)}`;
            }
            return null;
        })
        .filter(Boolean)
        .join("&");

    const res = await fetch(`${api}/user/${user}/categories/category?${query}`);

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