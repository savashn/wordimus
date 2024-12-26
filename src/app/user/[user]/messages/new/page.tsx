import NewMessage from "@/components/NewMessage";
import { Params } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }: {
    params: Params
}) {
    const slug = (await params).user;
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    if (!token) {
        notFound();
    }

    const decodedToken = jwtDecode<{ username: string }>(token);
    const usersHimself: string = decodedToken.username;

    return (
        <NewMessage slug={slug as string} userHimself={usersHimself as string} api={api as string} token={token as string} />
    )
}