import { Category } from "@/types/interfaces";
import Categories from "@/components/Categories";
import { Params } from "@/types/types";
import { cookies } from "next/headers";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    const res = await fetch(`${api}/user/${slug}/categories`, {
        method: 'GET',
        headers: {
            'x-auth-token': `${token}`
        }
    });

    if (!res.ok) {
        return (
            <div>
                <p>It's empty here.</p>
            </div>
        )
    }

    const data: Category[] = await res.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div>
                <p>It's empty here.</p>
            </div>
        );
    }

    return (
        <div>
            <Categories userSlug={slug} data={data} />
        </div>
    )
}