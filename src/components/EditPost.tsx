"use client";
import React, { useState } from 'react'
import styles from '@/styles/input.module.css';
import checkbox from '@/styles/categories.module.css';
import { Category, Post } from '@/types/interfaces';
import { useRouter } from 'next/navigation';

interface EditPost {
    slug: string;
    api: string;
    post: Post;
    categories: Category[];
    postCategories: number[];
    token: string;
    postSlug: string;
}

function EditPost({ api, post, categories, postCategories, slug, postSlug, token }: EditPost) {
    const [header, setHeader] = useState<string>(post.header);
    const [content, setContent] = useState<string>(post.content);
    const [newCategories, setNewCategories] = useState<number[]>(postCategories);
    const [isHidden, setIsHidden] = useState<boolean>(post.isHidden as boolean);
    const [isPrivate, setIsPrivate] = useState<boolean>(post.isPrivate as boolean);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const router = useRouter();

    const handleCategorySelect = (categoryId: number) => {
        if (newCategories.includes(categoryId)) {
            setNewCategories(newCategories.filter(id => id !== categoryId));
        } else {
            setNewCategories([...newCategories, categoryId]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            header,
            content,
            isHidden,
            isPrivate,
            categories: newCategories
        };

        const res = await fetch(`${api}/edit/${slug}/post/${postSlug}`, {
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
            const res = await fetch(`${api}/delete/posts/${postSlug}`, {
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
                    Edit Post:
                </label>

                <br />

                <input
                    type="text"
                    id="header"
                    placeholder="Title"
                    className={styles.input}
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                />

                <textarea
                    id="content"
                    placeholder="Content"
                    className={`${styles.input} ${styles.textarea}`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <br /><br />

                <label htmlFor="category">
                    Select categories:
                </label>
                <br />
                <br />

                <div className={styles.container}>
                    {categories.map((cat, idx) => (
                        <div key={idx}>

                            <label htmlFor={`opt-${cat.id}`}>

                                <button
                                    type="button"
                                    className={`${styles.selectBtn} ${newCategories.includes(cat.id as number) ? styles.selected : ''}`}
                                    onClick={() => handleCategorySelect(cat.id as number)}
                                >
                                    {cat.category}
                                </button>

                            </label>

                        </div>
                    ))}
                </div>
                <br />
                <br /><br />

                <label htmlFor="isHidden">
                    Select this box if you want this post to be hidden:
                </label>

                <br />
                <br />

                <input
                    type="checkbox"
                    id='post'
                    className={checkbox.checkbox}
                    checked={isHidden}
                    onChange={() => setIsHidden(!isHidden)}
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
                        <h2 className={styles.title}>Delete Post</h2>
                        <br />
                        <p className={styles.text}>Are you sure you want to delete this post?</p>
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

export default EditPost