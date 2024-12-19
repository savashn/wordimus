import NewPost from "@/components/NewPost";
import { Category } from "@/types/interfaces";
import { Params } from "@/types/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    const res = await fetch(`${api}/admin/categories`, {
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

    const data: Category[] = await res.json();

    return (
        <div>
            <NewPost api={api as string} slug={slug} data={data} token={token as string} />
        </div>
    )
}