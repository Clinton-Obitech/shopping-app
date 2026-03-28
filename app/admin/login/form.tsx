'use client'

import { SubmitForm } from "./action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
    message: "",
    error: "",
    success: false
}

export default function Form() {

    const [state, stateAction] = useActionState(SubmitForm, initialState);

    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push("/admin/dashboard")
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
            type="password"
            name="password"
            placeholder="password"
            />

            <button type="submit">
                login
            </button>
        </form>

        {state && <p>{state?.error}</p>}
        {state && <p>{state?.message}</p>}
        </div>
    )
}