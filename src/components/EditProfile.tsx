"use client";
import React, { useState } from 'react';
import styles from '@/styles/input.module.css';
import { User } from '@/types/interfaces';
import { useRouter } from 'next/navigation';

interface EditProfileProps {
    api: string;
    data: User;
    token: string;
    slug: string;
}

function EditProfile({ api, data, token, slug }: EditProfileProps) {
    const [name, setName] = useState<string>(data.name);
    const [email, setEmail] = useState<string>(data.email as string);
    const [image, setImage] = useState<File | null>(null);
    const [about, setAbout] = useState<string>(data.about ?? '');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('about', about);

        if (image) {
            formData.append('image', image);
        }

        const res = await fetch(`${api}/edit/user`, {
            method: 'PUT',
            headers: {
                'x-auth-token': `${token}`,
            },
            credentials: 'include',
            body: formData
        });

        const text = await res.text();

        if (!res.ok) {
            alert(text || 'An unknown error occurred.');
            window.location.reload();
            return;
        }

        alert('Success!');
        router.push(`/user/${slug}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="header" className={styles.label}>
                    Edit Profile:
                </label>

                <br />

                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                    id="about"
                    placeholder="About"
                    className={`${styles.input} ${styles.textarea}`}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="file"
                    id='image'
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                            setImage(file);
                        }
                    }}
                />
                {image && <p>Seçilen dosya: {image.name}</p>}

                <br /><br /><br />

                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>
            </form>
        </div>
    )
}

export default EditProfile