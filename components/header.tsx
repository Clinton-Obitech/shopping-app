'use client'

import { redirect } from "next/navigation";

export function UserHeader() {
    return (
        <header>
            <h2>shopping site</h2>
        </header>
    )
}

export function AdminHeader() {

    const goBack = () => {
        window.history.back();
    }

    const dashboard = () => redirect("/admin/dashboard");

    return (
        <header className="admin">
            <div>
                <i onClick={goBack} className="fa-solid fa-arrow-left" />
                <h2 onClick={dashboard}>shopping site</h2>
            </div>
        </header>
    )
}