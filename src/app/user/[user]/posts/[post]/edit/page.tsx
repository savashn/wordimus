import { cookies } from "next/headers";
import { jwtDecode } from 'jwt-decode';
import { Params } from "@/types/types";
import { notFound } from "next/navigation";
import { Category, Post } from "@/types/interfaces";
import EditPost from "@/components/EditPost";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const postSlug = (await params).post;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    if (token) {
        const decodedToken = jwtDecode<{ username: string }>(token);
        const username = decodedToken.username;

        if (username !== slug) {
            notFound();
        }
    }

    const res = await fetch(`${api}/admin/edit/post/${postSlug}`, {
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

    const data = await res.json();

    const post: Post = data.post;
    const categories: Category[] = data.categories;

    const categoryIds = data.categories.map((cat: { id: number }) => cat.id);

    return (
        <EditPost api={api as string} slug={slug} postSlug={postSlug as string} post={post} categories={categories} token={token as string} categoryIds={categoryIds} />
    )
}