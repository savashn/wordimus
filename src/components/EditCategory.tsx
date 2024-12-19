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
    const [isHidden, setIsHidden] = useState<boolean>(data.isHidden);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            category,
            isHidden,
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
                <br />
                <br /><br />

                <label htmlFor="isHidden">
                    Select this box if you want this category to be hidden:
                </label>

                <br />
                <br />

                <input
                    type="checkbox"
                    id='category'
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

export default EditCategory