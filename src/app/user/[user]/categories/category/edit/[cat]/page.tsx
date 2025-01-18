import { cookies } from "next/headers";
import { jwtDecode } from 'jwt-decode';
import { Params } from "@/types/types";
import { notFound } from "next/navigation";
import EditCategory from "@/components/EditCategory";
import { Category } from "@/types/interfaces";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const cat = (await params).cat;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);
        const username = decodedToken.username;

        if (username !== slug) {
            console.log('username and slug is not compatible')
            notFound();
        }
    }

    const res = await fetch(`${api}/admin/edit/category/${cat}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        const msg = await res.text()
        console.log('API response:', res.status);
        console.log(msg);
        notFound();
    }

    const data: Category = await res.json();

    return (
        <div>
            <EditCategory data={data} api={api as string} slug={slug} token={token as string} cat={cat as string} />
        </div>
    )
}