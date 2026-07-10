import MonsterGrid from "@/componentes/MonstersGrid/MonstersGrid";
import { getMonsters } from "@/services/monstro.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // Importamos o redirecionador seguro do Next

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // SEGUURANÇA: Se o mestre não tiver um token (não estiver logado),
    // ele nem tenta falar com o back-end e é expulso direto para o login!
    if (!token) {
        redirect("/login");
    }

    try {
        // Se chegou aqui, ele tem um token para tentar buscar os monstros
        const monstros = await getMonsters(token);

        return (
            <main style={{ width: '100%', padding: '2rem 1rem' }}>
                <MonsterGrid monstros={monstros} />
            </main>
        );
    } catch (error) {
        // Caso o token exista mas seja inválido/expirado no back-end,
        // limpa e manda para o login também para não quebrar a tela
        console.error("Erro ao buscar monstros:", error);
        redirect("/login");
    }
}