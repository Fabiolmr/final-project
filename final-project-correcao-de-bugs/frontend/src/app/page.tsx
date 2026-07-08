import MonsterGrid from "@/componentes/MonstersGrid/MonstersGrid";
import { getMonsters } from "@/services/monstro.services";
import Link from "next/link";
import styles from '@/app/page.module.css';

export default async function Home() {
    const monstros = await getMonsters();

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