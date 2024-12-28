import { Category, Post } from "@/types/interfaces";
import { Params } from "@/types/types";
import { notFound } from "next/navigation";
import styles from "@/styles/post.module.css";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/partials/ProgressBar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import ScrollToTop from "@/components/partials/ScrollToTop";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = await params;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    let admin;

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);

        if (decodedToken.username === slug.user) {
            admin = decodedToken.username
        }
    }

    const res = await fetch(`${api}/user/${slug.user}/posts/${slug.post}`);

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    const data = await res.json();

    const post: Post = data.post;
    const categories: Category[] = data.categories;

    return (
        <div>
            <ProgressBar />

            {admin && (
                <Link href={`/user/${slug.user}/posts/${slug.post}/edit`} className={styles.link}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button}>EDIT THIS POST</button>
                    </div>
                </Link>
            )}

            <div className={styles.profileContainer}>
                <Link href={`/user/${slug.user}`} className={`${styles.pictureWrapper} ${styles.link}`}>
                    <Image
                        src={post.authorImg ? `${post.authorImg}` : '/profile.jpg'}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className={styles.picture}
                    />
                </Link>
                <Link href={`/user/${slug.user}`} className={`${styles.author} ${styles.link}`}>{post.author}</Link>
            </div>

            <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString('en-GB')}</p>

            <h1 className={styles.h1}>{post.header}</h1>
            <p className={styles.readingTime}>Reading Time: {post.readingTime} minute</p>

            {categories && categories.length > 0 && (
                <div>
                    {categories.map((cat, idx) => (
                        <span key={idx}>
                            <Link href={`user/${slug.user}/categories/${cat.slug}`} className={styles.link}>
                                {cat.category}
                            </Link>
                            {idx < categories.length - 1 && ", "}
                        </span>
                    ))}
                </div>
            )}

            <hr /><br />

            <div className={styles.content}>
                {post.content}
            </div>

            <br />

            <ScrollToTop />
        </div>
    )
}