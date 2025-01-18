"use client";
import React, { useState } from 'react';
import styles from '@/styles/input.module.css';
import checkbox from '@/styles/categories.module.css';
import { Category } from '@/types/interfaces';
import { useRouter } from 'next/navigation';

interface Props {
    data: Category[],
    api: string,
    token: string,
    slug: string
}

function NewPost({ data, slug, api, token }: Props) {
    const [header, setHeader] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [categories, setCategories] = useState<number[]>([]);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const handleCategorySelect = (id: number) => {
        setCategories((prevCategories) => {
            if (!prevCategories.includes(id)) {
                return [...prevCategories, id]
            } else {
                return prevCategories.filter((categoryId) => categoryId !== id);
            }
        })
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            header,
            content,
            categories,
            isHidden,
            isPrivate
        };

        const res = await fetch(`${api}/new/post`, {
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
        router.push(`/user/${slug}`);
        return;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>

                <label htmlFor="header" className={styles.label}>
                    Create Post:
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

                <br />

                <div className={styles.container}>
                    {data.map((cat, idx) => (
                        <div key={idx}>

                            <label htmlFor={`opt-${cat.id}`}>

                                <button
                                    type='button'
                                    className={`${styles.selectBtn} ${categories.includes(cat.id as number) ? styles.selected : ''}`}
                                    onClick={() => handleCategorySelect(cat.id as number)}
                                >
                                    {cat.category}
                                </button>

                            </label>

                        </div>
                    ))}
                </div>

                <br /><br />

                <label htmlFor="isHidden">
                    Select this box if you want this post to be hidden:
                </label>

                <br /><br />

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

                <br /><br />

                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>

            </form>
        </div>
    )
}

export default NewPost