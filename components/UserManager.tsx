'use client'

import { PartialUser, User } from "@/app/actions/main";
import { AddUserForm } from "./AddUserForm";
import { UserList } from "./UserList";
import { startTransition, useActionState, useOptimistic } from "react";
import { addUser } from "@/app/actions/main";

export function UserManager ({ initialUsers }: { initialUsers: PartialUser[] }) {
    const [state, formAction, isPending] = useActionState(addUser, null);

    const [optimisticUsers, addOptimisticUser] = useOptimistic(
        initialUsers,
        (currentState, newUser: PartialUser) => [...currentState, newUser]
    )

const handleFormSubmit = (formData: FormData) => { 
        const user = String(formData.get('user') || '').trim();
        const role = String(formData.get('role') || 'user').trim();
        const password = String(formData.get('password') || '').trim();
        
        startTransition(() => {
            if (user && password) { 
                addOptimisticUser({ user, role });
            }
            formAction(formData);
        });
    }


    return (
        <>
            <AddUserForm state={state} formAction={handleFormSubmit} isPending={isPending} />
            <UserList users={optimisticUsers} />
        </>
    )
}