'use client'

import { useEffect, useState } from "react";
import { addStock } from "./action";
import { deleteProduct } from "./action";
import { fetchProducts } from "./action";
import { SelectCategory } from "../components/select";
import styles from "../admin.module.css";

export default function ManageProducts() {

    const [products, setProducts] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const getProducts = async (category: string) => {
        setLoading(true);
        try {
            const data = await fetchProducts(category);
            setProducts(data ?? []);
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const removeProduct = async (productsId: number) => {
            if(confirm("are you sure you want to delete this?")) {
            const data = await deleteProduct(productsId);
            const success = data ?? null;
            getProducts(select);

        if (success) {
            alert("product deleted success")
        }
        }
    }

    const HandleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value)
    }

    return (
        <>
        <section className={styles.query}>
        <select name="category" onChange={HandleChange}>
            <option>choose category</option>
            {SelectCategory.map(option => (
                <option key={option.id} value={option.value}>{option.label}</option>
            ))}
        </select>
        <button onClick={() => getProducts(select)}>see products</button>
        </section>

        <section className={styles.products}>
        {products.length > 0 ? (
        
            products.map(p => (
            <ul key={p.id}>
                <img src={p.image} />
                <div>
                <li>{p.name}</li>
                <li>price: ${p.price}</li>
                <li>stock: {p.stock}</li>
                </div>
                <button 
                style={{backgroundColor: "navy"}}
                type="button"
                onClick={() => { 
                    addStock(p.id as number);
                    getProducts(select);
                }
                }
                >
                    add stock
                </button>

                <button
                style={{backgroundColor: "red"}}
                onClick={() => {
                    removeProduct(p.id);
                }}
                type="button">
                    delete
                </button>
            </ul>
        ))

        ) : (

           <div className={styles.noProducts}>{loading ? "loading..." : "no products"}</div>

        )}
        </section>
        </>
    )
}