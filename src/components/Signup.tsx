"use client";
import { Api } from '@/types/types';
import React, { useState } from 'react'
import styles from '@/styles/input.module.css';
import { useRouter } from 'next/navigation';

function Signup({ api }: Api) {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || name.trim() == '') {
            alert('Name is missing.');
            return;
        }

        if (!email || email.trim() == '') {
            alert('Email is missing.');
            return;
        }

        if (!password || password.trim() == '') {
            alert('Password is missing.');
            return;
        }

        if (password !== rePassword) {
            alert('Password fields must be the same.');
            return;
        }

        if ((password && rePassword) && (password.length < 8 || rePassword.length < 8)) {
            alert('Password must be longer than 8 characters.');
            return;
        }

        const data = {
            name,
            username,
            email,
            password
        };

        const res = await fetch(`${api}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        router.push('/');
        return;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>

                <label htmlFor="register" className={styles.label}>
                    Create An Account:
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
                    id="username"
                    placeholder="Username"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    id="repassword"
                    placeholder="Password Again"
                    className={styles.input}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                <br /><br />

                <button type="submit" className={styles.button}>
                    SUBMIT
                </button>

            </form>
        </div>
    )
}

export default Signup