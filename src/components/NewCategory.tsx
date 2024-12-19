"use client";
import { Api } from '@/types/types';
import React, { useState } from 'react';
import styles from '@/styles/input.module.css';

function NewCategory({ api, token }: Api) {
    const [category, setCategory] = useState<string>('');

    const handleClick = async () => {

        const res = await fetch(`${api}/new/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token}`,
            },
            body: JSON.stringify({ category }),
        });

        if (!res.ok) {
            const errText = await res.text();
            alert(errText || 'An unknown error occurred.');
            window.location.reload();
            return;
        }

        const alertText = await res.text()

        alert(alertText);
        window.location.reload();
        return;
    };

    return (
        <div>
            <label htmlFor="category" className={styles.label}>
                Create Category:
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
            <button type="button" onClick={handleClick} className={styles.button}>
                SUBMIT
            </button>
        </div>
    );
}

export default NewCategory;
