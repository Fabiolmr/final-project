import { notFound } from "next/navigation";
import MonsterForm from "@/componentes/MonsterForm/MonsterForm";
import { getMonster } from "@/services/monstro.services";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarMonstroPage({ params }: Props) {
  const { id } = await params;

  const monstro = await getMonster(id);

  if (!monstro) {
    notFound();
  }

  return (
    <>
      <MonsterForm monstro={monstro} />
    </>
  );
}