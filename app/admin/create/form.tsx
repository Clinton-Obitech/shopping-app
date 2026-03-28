'use client'

import { useActionState, useEffect } from "react"
import { SubmitForm } from "./action"
import { useRouter } from "next/navigation"

type FormState = {
  message: string;
  success: boolean;
};

const initialState:FormState = {
    message: "",
    success: false
}

export default function Form() {

    const [state, stateAction] = useActionState(SubmitForm, initialState);

    const router = useRouter();

    useEffect(() => {
        if(state?.success) {
            router.push("/admin/login")
        }
    }, [state?.success])


    return (
        <div>
        <form action={stateAction}>
            <input
            type="text"
            name="username"
            placeholder="username"
            />

            <input
            type="email"
            name="email"
            placeholder="email"
            />

            <input 
            type="password"
            name="password"
            placeholder="password"
            />

            <button type="submit">
                submit
            </button>
        </form>

        {state && <p>{state?.message}</p>}
        </div>
    )
}