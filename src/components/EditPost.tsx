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
    token: string;
    postSlug: string;
    categoryIds: number[];
}

function EditPost({ api, post, categories, slug, postSlug, token, categoryIds }: EditPost) {
    const [header, setHeader] = useState<string>(post.header);
    const [content, setContent] = useState<string>(post.content);
    const [newCategories, setNewCategories] = useState<number[]>(categoryIds);
    const [isHidden, setIsHidden] = useState<boolean>(post.isHidden as boolean)

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

        console.log('data:', data);
        console.log('res: ', res)

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
                    Select this box if you want this category to be hidden:
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

                <br />

                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>

            </form>
        </div>
    )
}

export default EditPost