import { Post, User } from "@/types/interfaces";
import { notFound } from "next/navigation";
import styles from "@/styles/profile.module.css";
import Image from "next/image";
import Link from "next/link";
import { Params } from "@/types/types";
import ContentProcessor from "@/utils/ContentProcessor";
import { cookies } from "next/headers";
import { jwtDecode } from 'jwt-decode';

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    let usersHimself;

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);
        usersHimself = decodedToken.username;
    }

    const res = await fetch(`${api}/user/${slug}`);

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    const data = await res.json();

    if (data.length === 0) {
        return (
            <div>
                <p>It's empty here.</p>
            </div>
        );
    }

    const posts: Post[] = data.posts;
    const user: User = data.user[0];

    const processedData: Post[] = ContentProcessor.processPosts(posts);

    return (
        <div>
            <div className={styles.profileContainer}>

                <div className={styles.pictureWrapper}>

                    <Image
                        src={user.image ? `${user.image}` : '/profile.jpg'}
                        width={500}
                        height={500}
                        alt={user.name}
                        className={styles.picture}
                        priority
                    />

                </div>

                <p className={styles.name}>{user.name}</p>
                <p className={styles.username}>@{user.username}</p>

                {user.about && (
                    <p className={styles.about}>
                        {user.about}
                    </p>
                )}

            </div>

            <div className={styles.btnContainer}>
                <Link href={`/user/${slug}/posts`} className={styles.btn}>SEE ALL POSTS</Link>
                <Link href={`/user/${slug}/categories`} className={styles.btn}>SEE ALL CATEGORIES</Link>
                {/* <Link href={`/user/${slug}/stars`} className={styles.btn}>STARRED POSTS</Link> */}
                {token && usersHimself !== user.username && (
                    <Link href={`/user/${slug}/messages/new`} className={styles.btn}>SEND A MESSAGE</Link>
                )}
            </div>

            <br /><br />
            <hr />

            <h1 className={styles.lastPublishes}>Last Published:</h1>

            <div className={styles.cardContainer}>

                {processedData.map((post, idx) => (
                    <div key={idx}>
                        <Link href={`/user/${slug}/posts/${post.slug}`} className={styles.link}>
                            <div className={styles.card}>

                                <p className={styles.date}>
                                    {new Date(post.createdAt).toLocaleDateString('en-GB')}
                                </p>
                                <h2 className={styles.header}>{post.header}</h2>

                                <p className={styles.readingTime}>{post.readingTime} minute</p>
                                <p className={styles.abstract}>{post.content}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}