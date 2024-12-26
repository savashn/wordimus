"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from '@/styles/input.module.css';

interface Props {
    api: string,
    token: string,
    slug: string,
    userHimself: string
}

function NewMessage({ slug, api, token, userHimself }: Props) {
    const [message, setMessage] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            message,
            slug
        };

        const res = await fetch(`${api}/new/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token}`,
            },
            body: JSON.stringify(data)
        });

        const text = await res.text();

        if (!res.ok) {
            alert(text || 'An unknown error occurred.');
            window.location.reload();
            return;
        }

        alert(text);
        router.push(`/user/${userHimself}/messages/w/${slug}`);
        return;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>

                <label htmlFor="message" className={styles.label}>
                    Send A Message:
                </label>

                <br />

                <textarea
                    id="message"
                    placeholder="Your message..."
                    className={`${styles.input} ${styles.textarea}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <br /><br />

                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>

            </form>
        </div>
    )
}

export default NewMessage