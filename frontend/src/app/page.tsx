import MonsterGrid from "@/componentes/MonstersGrid/MonstersGrid";
import { getMonsters } from "@/services/monstro.services";
import Link from "next/link";
import styles from '@/app/page.module.css';
import { cookies } from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const monstros = await getMonsters(token);

    return (
        <main className={styles.home}>
            <header className={styles.homeHeader}>
                <div>
                    <h1>Meu Bestiário</h1>
                    <p>Gerencie seus monstros capturados</p>
                </div>

                <Link href="/monstros/criar" className={styles.btnAdd}>
                    ⚔️ Criar Manualmente
                </Link>
            </header>
            
            <MonsterGrid monstros={monstros} />
        </main>
    );
}