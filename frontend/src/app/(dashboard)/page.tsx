import MonsterGrid from "@/componentes/MonstersGrid/MonstersGrid";
import { getMonsters } from "@/services/monstro.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect("/login");
    }

    try {
        const monstros = await getMonsters(token);

        return (
            <main style={{ width: '100%', padding: '2rem 1rem' }}>
                <MonsterGrid monstros={monstros} />
            </main>
        );
    } catch (error) {
        console.error("Erro ao buscar monstros:", error);
        redirect("/login");
    }
}