import MonsterForm from "@/componentes/MonsterForm/MonsterForm";
import { getMonster } from "@/services/monstro.services";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarMonstroPage({
  params,
}: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const monstro = await getMonster(id, token);

  return (
    <>
      <MonsterForm monstro={monstro} />
    </>
  );
}