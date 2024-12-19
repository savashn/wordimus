import Header from "@/components/partials/Header";
import styles from "./page.module.css";
import { Post } from "@/types/interfaces";
import Link from "next/link";
import Image from "next/image";
import ContentProcessor from "@/utils/ContentProcessor";
import { notFound } from "next/navigation";

export default async function Home() {
  const api = process.env.API_URI;

  const res = await fetch(`${api}/user`);

  if (!res.ok) {
    console.error('API response:', res.status, await res.text());
    notFound();
  }

  const data = await res.json();

  const posts: Post[] = ContentProcessor.processPosts(data);

  return (
    <>
      <Header />

      {data && (
        <div className={styles.home}>

          <div className={styles.h1}>
            JOIN TO TURN YOUR THOUGHTS INTO WORDS
          </div>

          <hr />

          <div className={styles.posts}>

            {posts.map((post, idx) => (
              <div key={idx} className={styles.card}>

                <div className={styles.cardHeader}>

                  <Link href={`/user/${post.username}`} className={styles.link}>

                    <div className={styles.pictureWrapper}>
                      <Image
                        src="/profile.jpg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className={styles.picture}
                      />
                    </div>

                  </Link>

                  <Link href={`/user/${post.username}`} className={styles.author}>

                    {post.author}

                  </Link>

                  <p className={styles.date}>
                    {new Date(post.createdAt).toLocaleDateString('en-GB')}
                  </p>

                </div>

                <hr />

                <div className={styles.cardBody}>

                  <Link href={`/user/${post.username}/posts/${post.slug}`} className={styles.link}>

                    <h2 className={styles.postHeader}>{post.header}</h2>
                    <h3 style={{ textDecoration: 'underline', fontStyle: 'italic' }}>Reading time: {post.readingTime} minute</h3>

                  </Link>

                  <br />

                  <p style={{ marginBottom: '1rem' }}>{post.content}</p>

                </div>

              </div>
            ))}

          </div>

        </div >
      )}

      <footer className={styles.footer}>
        <p className={styles.footerContent}>
          Wordimus &copy; 2024 All rights reserved.
        </p>
      </footer>
    </>
  );
}
