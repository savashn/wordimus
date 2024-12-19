import styles from "@/styles/header.module.css";
import Link from 'next/link';
import { Auth } from '@/types/types';
import { useRouter } from 'next/navigation';

function MenuItems({ username }: Auth) {
    const router = useRouter();

    const handleSignout = () => {
        document.cookie = 'x-auth-token=; Max-Age=0; path=/; secure; SameSite=Strict';
        router.push('/signin');
    }

    return (
        <ul className={styles.ul}>
            {username ? (
                <>
                    <li className={styles.li}>
                        <Link href={`/user/${username}`} className={styles.link}>My Profile</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={`/user/${username}/edit`} className={styles.link}>Edit Profile</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={`/user/${username}/posts/new`} className={styles.link}>New Post</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={`/user/${username}/categories/new`} className={styles.link}>New Category</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={`/user/${username}/messages`} className={styles.link}>Messages</Link>
                    </li>
                    <li className={styles.li}>
                        <a className={styles.link} style={{ cursor: 'pointer' }} onClick={handleSignout}>Signout</a>
                    </li>
                </>
            ) : (
                <>
                    <li className={styles.li}>
                        <Link href={'/signin'} className={styles.link}>Signin</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href={'/signup'} className={styles.link}>Signup</Link>
                    </li>
                </>
            )}
        </ul>
    )
}

export default MenuItems