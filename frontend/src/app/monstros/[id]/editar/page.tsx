import MonsterForm from "@/componentes/MonsterForm/MonsterForm";
import { getMonster, getMonsters } from "@/services/monstro.services";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarFilmePage({
  params,
}: Props) {
  const { id } = await params;

  const monstro = await getMonster(id);

  return (
    <>
      <MonsterForm monstro={monstro} />
    </>
  );
}