import { Params } from "@/types/types";
import styles from "@/styles/post.module.css";
import { Messages } from "@/types/interfaces";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    const res = await fetch(`${api}/admin/messages`, {
        method: 'GET',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('Error response:', text);
        return (
            <div>
                <p>It's empty here.</p>
            </div>
        )
    }

    const data = await res.json();

    const messages: Messages[] = data.messages;
    const newOnes: number[] = data.senderIds;

    const uniqueContacts = new Map();

    messages.forEach((msg) => {
        if (msg.receiverSlug === slug && msg.senderSlug !== slug) {
            uniqueContacts.set(msg.senderSlug, {
                name: msg.sender,
                slug: msg.senderSlug,
                img: msg.senderImg,
                senderId: msg.senderId
            });
        } else if (msg.senderSlug === slug && msg.receiverSlug !== slug) {
            uniqueContacts.set(msg.receiverSlug, {
                name: msg.receiver,
                slug: msg.receiverSlug,
                img: msg.receiverImg,
                receiverId: msg.receiverId
            });
        }
    });

    const contacts = Array.from(uniqueContacts.values());

    return (
        <div>
            <h1 className={styles.h1}>{slug}'s All Messages:</h1>
            <hr /><br />

            {contacts.map((contact, index) => {
                const newMessagesCount = newOnes.filter(id => id === contact.senderId).length;

                return (
                    <div key={index}>
                        <Link href={`/user/${slug}/messages/w/${contact.slug}`} className={styles.link}>
                            <div className={styles.card}>
                                <div className={styles.flex}>

                                    <div className={styles.pictureWrapper}>
                                        <Image
                                            src={contact.image ? `${contact.image}` : '/profile.jpg'}
                                            width={500}
                                            height={500}
                                            alt={contact.name}
                                            className={styles.picture}
                                        />
                                    </div>

                                    <p style={{ marginLeft: '1rem', fontSize: '1.2rem' }}>{contact.slug}</p>

                                    {newOnes.includes(contact.senderId) && (
                                        <p style={{ textAlign: 'right', marginLeft: 'auto', color: 'red' }}>{newMessagesCount} NEW!</p>
                                    )}

                                </div>
                            </div>
                        </Link>
                    </div>

                )
            })}


        </div>
    )
}