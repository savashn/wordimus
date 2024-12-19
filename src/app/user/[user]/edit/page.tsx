import EditProfile from "@/components/EditProfile";
import { User } from "@/types/interfaces";
import { Params } from "@/types/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    const res = await fetch(`${api}/admin/user`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        console.error('API response:', res.status, await res.text());
        notFound();
    }

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);
        const username = decodedToken.username;

        if (username !== slug) {
            notFound();
        }
    }

    const data: User = await res.json();

    if (!data) {
        return (
            <div>
                <p>It's empty here.</p>
            </div>
        );
    }

    return (
        <EditProfile api={api as string} data={data} token={token as string} slug={slug} />
    )
}