'use client'

import { logoutAdmin } from "./action";

export function LogoutButton() {
    return (
        <button
        onClick={logoutAdmin}
        type="button"
        >
        logout
        </button>
    )
}