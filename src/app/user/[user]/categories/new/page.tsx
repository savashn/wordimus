import NewCategory from "@/components/NewCategory";
import { cookies } from "next/headers";

export default async function Page() {
    const api = process.env.API_URI;
    const cookieStore = await cookies();
    const token = cookieStore.get('x-auth-token')?.value;

    return (
        <div>
            <NewCategory api={api as string} token={token as string} />
        </div>
    )
}