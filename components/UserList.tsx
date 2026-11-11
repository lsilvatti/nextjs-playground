import { PartialUser, User } from "@/app/actions/main";

export function UserList ({ users }: { users: PartialUser[]}) {
  
    return (
        <div className="mt-4">
          {users.map((user) => (
            <div className="border p-2 mb-2" key={user.user}>
              <p>User: {user.user}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
    )
}