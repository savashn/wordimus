"use client";
import { CategoriesProps } from '@/types/interfaces';
import React, { useEffect, useState } from 'react'
import styles from "@/styles/categories.module.css";
import btnStyles from '@/styles/input.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Categories({ userSlug, data }: CategoriesProps) {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [admin, setAdmin] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const match = document.cookie.match(/x-auth-token=([^;]+)/);

            if (match) {
                const token = match[1];
                const payload = JSON.parse(atob(token.split('.')[1]));
                setAdmin(payload.username || '');
            }
        }
    }, []);

    const handleCheckboxChange = (categoryId: number) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter(id => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const handleSubmit = () => {
        if (selectedCategories.length === 0) {
            alert("You need to select at least one category.");
            return;
        }

        const queryString = selectedCategories.map((id) => `id=${id}`).join('&');
        const targetPath = `/user/${userSlug}/categories/category?${queryString}`;

        router.push(targetPath);
    };

    return (
        <div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>CATEGORY</th>
                            <th>POSTS</th>
                            <th>SELECT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cat, idx) => (
                            <tr key={idx}>
                                <td>
                                    {admin === userSlug ? (
                                        <Link href={`/user/${userSlug}/categories/category/edit/${cat.slug}`} className={styles.link}>
                                            {cat.category}
                                        </Link>
                                    ) : (
                                        cat.category
                                    )}
                                </td>
                                <td>
                                    {cat.postsCount}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        id={`category-${cat.id}`}
                                        className={styles.checkbox}
                                        checked={selectedCategories.includes(cat.id as number)}
                                        onChange={() => handleCheckboxChange(cat.id as number)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ margin: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <button onClick={handleSubmit} className={btnStyles.button} style={{ width: '80%' }}>GET POSTS</button>
            </div>
        </div>
    )
}

export default Categories;