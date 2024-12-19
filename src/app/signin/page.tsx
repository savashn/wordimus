import Signin from "@/components/Signin";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function Page() {
    const api = process.env.API_URI;

    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token');

    if (token) {
        redirect('/dashboard');
    }

    return (
        <>
            <Signin api={api as string} />
        </>
    );
}
