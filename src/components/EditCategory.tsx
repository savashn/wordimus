"use client";
import React, { useState } from 'react';
import styles from '@/styles/input.module.css';
import checkbox from '@/styles/categories.module.css';
import { Category } from '@/types/interfaces';
import { useRouter } from 'next/navigation';

interface EditCategory {
    slug: string;
    api: string;
    data: Category;
    token: string;
    cat: string;
}

function EditCategory({ slug, api, data, token, cat }: EditCategory) {
    const [category, setCategory] = useState<string>(data.category);
    const [isPrivate, setIsPrivate] = useState<boolean>(data.isPrivate as boolean);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            category,
            isPrivate
        };

        const res = await fetch(`${api}/edit/${slug}/category/${cat}`, {
            method: 'PUT',
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
        router.push(`/user/${slug}`);
        return;
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`${api}/delete/categories/${cat}`, {
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
                <label htmlFor="category" className={styles.label}>
                    Edit Category:
                </label>
                <br />
                <input
                    type="text"
                    id="category"
                    placeholder="Category Name"
                    className={styles.input}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <br /><br />

                <label htmlFor="isPrivate">
                    Select this box if you want this post to be able to reach with URL only:
                </label>

                <br />
                <br />

                <input
                    type="checkbox"
                    id='post'
                    className={checkbox.checkbox}
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)}
                />

                <br />

                <div className={styles.container}>
                    <button type="submit" className={styles.button}>
                        SUBMIT
                    </button>
                    <button type='button' className={styles.button} onClick={() => setModalOpen(true)} style={{ marginLeft: 'auto' }}>
                        DELETE
                    </button>
                </div>

            </form>

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
                        <h2 className={styles.title}>Delete Category</h2>
                        <br />
                        <p className={styles.text}>Are you sure you want to delete this category? All the posts under this category is also going to be deleted.</p>
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

export default EditCategory