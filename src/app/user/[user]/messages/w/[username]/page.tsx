import { Params } from "@/types/types";
import styles from "@/styles/post.module.css";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Messages } from "@/types/interfaces";
import Link from "next/link";
import Image from "next/image";
import messageGrouper from "@/utils/MessageGrouper";
import { jwtDecode } from 'jwt-decode';

interface User {
    name: string;
    id: number;
    image: string;
}

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).username;
    const usersHimself = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    let usersHimselfId: number;

    if (token) {
        const decodedToken = jwtDecode<{ id: number }>(token);
        usersHimselfId = decodedToken.id;
    }

    const res = await fetch(`${api}/admin/messages/w/${slug}`, {
        method: 'GET',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    const data = await res.json();

    const messages: Messages[] = data.messages;
    const user: User = data.user;

    const groupedMessages = messageGrouper(messages);

    return (
        <div>
            <h1 className={styles.h1}>All Messages With {user.name}:</h1>
            <hr /><br />

            {Object.keys(groupedMessages).map((date) => (
                <div key={date}>
                    <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>{date}</h2>

                    <br />

                    {groupedMessages[date].map((msg) => (
                        <div key={msg.id}>

                            <Link href={`/user/${usersHimself}/messages/${msg.id}`} className={styles.link}>

                                <div className={styles.card}>
                                    <div className={styles.flex}>

                                        <div className={styles.pictureWrapper}>
                                            <Image
                                                src={user.image ? `${user.image}` : '/profile.jpg'}
                                                width={500}
                                                height={500}
                                                alt={user.name}
                                                className={styles.picture}
                                            />
                                        </div>

                                        <p style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>{slug}</p>

                                        {!msg.isSeen && msg.receiverId === usersHimselfId && (
                                            <p style={{ textAlign: 'right', marginLeft: 'auto', color: 'red' }}>NEW!</p>
                                        )}

                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}