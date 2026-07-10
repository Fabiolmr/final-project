import PerfilForm, {} from "@/componentes/PerfilForm/PerfilForm"
import { getUser } from "@/services/user.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }

    const userProfile = await getUser(token);

    return (
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Configurações da Conta</h1>
            <p>Gerencie suas informações pessoais e credenciais.</p>
            
            <PerfilForm usuario={userProfile} />
        </main>
    );
}