"use client";
import React, { FormEvent, useState } from 'react';
import styles from '@/styles/signin.module.css';
import { useRouter } from 'next/navigation';
import { Api } from '@/types/types';
import Link from 'next/link';

function Enter({ api }: Api) {
    const [username, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postData = {
            username: username,
            password: password,
        };

        try {
            const res = await fetch(`${api}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (res.ok) {
                const token = await res.text();
                document.cookie = `x-auth-token=${token}; max-age=86400`;
                router.push(`/user/${username}`);

            } else {
                const data = await res.json();
                alert(data.message || "An error occured.");
                window.location.reload();
                return;
            }

        } catch (err) {
            console.log((err as Error).message)
            alert((err as Error).message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.header}>
                    WORDIMVS
                </div>

                <div className={styles.body}>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <br /><br />
                        <input
                            type="text"
                            id="username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <br />

                        <label htmlFor="password">Password:</label>
                        <br /><br />
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />

                        <button type="submit" className={styles.button}>
                            LOGIN
                        </button>
                    </form>

                    <br /><br /><br />

                    <Link href={'/signup'} className={styles.link}>I don't have an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Enter;