'use client'

import { User } from "@/app/actions/main";
import { AddUserForm } from "./AddUserForm";
import { UserList } from "./UserList";
import { useActionState, useOptimistic } from "react";
import { addUser } from "@/app/actions/main";

export function UserManager ({ initialUsers }: { initialUsers: User[] }) {
    const [state, formAction, isPending] = useActionState(addUser, null);

    const [optimisticUsers, addOptimisticUser] = useOptimistic(
        initialUsers,
        (currentState, newUser: User) => [...currentState, newUser]
    )

    const handleFormSubmit = (formData: FormData) => { 
        const user = String(formData.get('user') || '').trim();
        const role = String(formData.get('role') || '').trim();
        
        if (user && role) {
            addOptimisticUser({ user, role, password: '' });
        }
        
        formAction(formData);
    }


    return (
        <>
            <AddUserForm state={state} formAction={handleFormSubmit} isPending={isPending} />
            <UserList users={optimisticUsers} />
        </>
    )
}