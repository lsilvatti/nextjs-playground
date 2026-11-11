"use server"

import { cookies } from "next/headers";
import { unstable_cache, updateTag } from "next/cache";

export interface User {
    user: string,
    role: string,
    password: string
}

let users = [
    {
        user: 'lsilvatti',
        role: 'admin',
        password: 'superuser'
    }
];

export type AddUserReturn = { error?: string, success?: string, fields?: Partial<User> } | null;

export async function addUser (prevState: AddUserReturn, formData: FormData):Promise<AddUserReturn> {

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('auth-token');

    if(!sessionToken || sessionToken.value !== 'valid-cookie') {
        return { error: "Não autorizado" }
    }

    const userDataFromForm: User = {
        user: String(formData.get('user') || ''),
        role: String(formData.get('role') || 'user'),
        password: String(formData.get('password') || '')
    }

    if(userDataFromForm.user === '' || userDataFromForm.password === '') {
        return { error: "Campos não podem ser vazios", fields: { user: userDataFromForm.user, role: userDataFromForm.role }}
    }
    users = [...users, userDataFromForm];

    updateTag('get-users');

    return { success: `Usuário ${userDataFromForm.user} adicionado com sucesso!`}
}

export interface PartialUser {
    user: string,
    role: string
}

function fetchUsersFromDb(): Promise<PartialUser[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users.map(user =>( { user: user.user, role: user.role})));
        }, 1000);
    });
}

export const getUsers = unstable_cache(fetchUsersFromDb, ['user-query-key'], {
    tags: ['get-users']
})