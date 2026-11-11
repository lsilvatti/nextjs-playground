import { useFormStatus } from "react-dom";
import { AddUserReturn } from "../app/actions/main";

function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="ml-2 border border-gray-300 rounded px-2 py-1">
      {pending ? 'Enviando...' : 'Submit'}
    </button>
  )
}

export function AddUserForm({ state, formAction, isPending } : { state: AddUserReturn, formAction: (payload: FormData) => void, isPending: boolean }) {

  return (
    <>
      <form className="flex flex-col gap-4" action={(payload) => formAction(payload)}>
        <div>
          <label htmlFor="textInput" className="mr-2">
            User name:
          </label>
          <input defaultValue={state?.fields?.user} id="textInput" type="text" disabled={isPending} name="user" placeholder="Enter text" className="border border-gray-300 rounded px-2 py-1" />
        </div>
        <div>
          <label htmlFor="textInput" className="mr-2">
            Age:
          </label>
          <input id="ageInput" type="number" disabled={isPending} name="age" placeholder="Enter Age" className="border border-gray-300 rounded px-2 py-1" />
        </div>
        <div>
          <label htmlFor="passwordInput" className="mr-2">
            Password:
          </label>
          <input id="passwordInput" type="password" disabled={isPending} name="password" placeholder="Enter password" className="border border-gray-300 rounded px-2 py-1" />
        </div>
        <div>
          <label htmlFor="roleInput" className="mr-2">
            Role:
          </label>
          <div>
            <input id="roleInputAdmin" defaultChecked={state?.fields?.role === 'admin'} type="checkbox" disabled={isPending} name="role" value="admin" className="mr-2" />
            <label htmlFor="roleInputAdmin" className="mr-2">
              Admin
            </label>
          </div>
        </div>
        <SubmitButton />
      </form>
      <p>
        {state?.error}
        {state?.success}
      </p>
    </>
  )
}