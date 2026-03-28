'use client'

import { createProduct } from "./action";
import { useActionState, useState } from "react";
import { SelectCategory } from "../../components/select";

const initialState =  {
    error: "",
    message: "",
    success: false
}

export default function Form() {

    const [state, actionState] = useActionState(createProduct, initialState);

    return (
        <>
        <form action={actionState}>
            <select name="category" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => e.target.value}>
            <option>choose category</option>
            {SelectCategory.map(option => (
                <option key={option.id} value={option.value}>{option.label}</option>
            ))}
            </select>

            <label>
                <i className="fa-solid fa-circle-plus" />
                Add Product image
            <input
            type="file"
            name="image"
            accept="image/*"
            />
            </label>

            <input
            type="text"
            name="name"
            placeholder="Product Name"
            />

            <input
            type="text"
            name="description"
            placeholder="Product Description"
            />

            <input
            type="text"
            name="price"
            placeholder="Product Price"
            />

            <button type="submit">
                create
            </button>
        </form>

        {state && <p>{state?.error}</p>}
        {state && <p>{state?.message}</p>}
        </>
    )
}