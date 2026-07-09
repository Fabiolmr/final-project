import {UserProfile, UpdaterUserDTO} from "@/tipos/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUser(token?: string): Promise<UserProfile> {
    const headers: HeadersInit = {
        "Content-Type": "application/json"
    }
    if(token){
        headers['cookie'] = `token=${token}`;
    }

    const response = await fetch(`${API_URL}/user/busca`,{
        method: "GET",
        credentials: "include",
        headers: headers
    });

    if(!response.ok){
        throw new Error("Usuário não encontrado");
    }

    return response.json();
}


export async function updateUser(dados: UpdaterUserDTO): Promise<void> {
    
    const response = await fetch(`${API_URL}/user/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    })

    if (!response.ok) {
        //pega o erro gerado pelo back
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao atualizar usuário");
    }
}

export async function deleteUser(senha:string): Promise<void> {
    const response = await fetch(`${API_URL}/user/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({senha}),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao excluir usuário");
    }
}