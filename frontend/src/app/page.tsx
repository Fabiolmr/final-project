import MonsterGrid from "@/componentes/MonsterGrid/MonsterGrid";
import { getMonsters } from "@/services/monstro.services";
import Link from "next/link";
import styles from '@/app/page.module.css';

export default async function Home() {
  const monstros = await getMonsters();

  return (
    <main className={styles.home}>
      <header className={styles.homeHeader}>
          <div>
              <h1> Monstros </h1>
              <p>Gerencie seu inventário</p>
          </div>

          <Link href="/monstros/criar" className={styles.btnAdd}>
           Caçar Monstro
          </Link>
      </header>
      <MonsterGrid monstros={monstros} />
    </main>
  );
}