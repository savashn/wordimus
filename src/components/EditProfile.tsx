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
    const [modalOpen, setModalOpen] = useState<boolean>(false);

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

    const handleDelete = async () => {
        try {
            const res = await fetch(`${api}/delete/user`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': `${token}`
                }
            });

            const text = await res.text();

            if (!res.ok) {
                alert(text || 'An unknown error occurred.');
                window.location.reload();
                return;
            }

            alert(text);
            router.push(`/user/${slug}`);
            return;

        } catch (err) {
            console.log(err);
            alert('An unknown error occurred.');
            return;
        }
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

                <br />
            </form>

            <div className={styles.container}>
                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>
                <button type='button' className={styles.button} onClick={() => setModalOpen(true)} style={{ marginLeft: 'auto' }}>
                    DELETE
                </button>
            </div>

            {modalOpen && (
                <div
                    className={styles.modal}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setModalOpen(false);
                    }}
                >
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={() => setModalOpen(false)}>
                            &times;
                        </button>
                        <h2 className={styles.title}>Delete Account</h2>
                        <br />
                        <p className={styles.text}>Are you sure you want to delete your account? All of your posts is also going to be deleted.</p>
                        <br />
                        <button className={styles.confirmButton} onClick={() => { handleDelete(); setModalOpen(false); }}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditProfile