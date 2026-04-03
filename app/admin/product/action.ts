'use server'

import supabase from "@/lib/supabaseServer";


export async function fetchProducts(category: string) {
    try {

        const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false })

        if (error) throw error;

        const productsWithImage = products.map((product) => {
        const { data } = supabase.storage
        .from("products")
        .getPublicUrl(product.image);

        return {
         ...product,
         imageUrl: data.publicUrl,
         };
        });

        return productsWithImage;

    } catch (err) {
        console.error(err)
    }
}

export async function addStock(productId : number) {
    try {

        const { data: product, error: fetchError } = await supabase
       .from("products")
       .select("stock")
       .eq("id", productId)
       .single();

       if (fetchError) throw fetchError;

       const { data, error } = await supabase
       .from("products")
       .update({ stock: product.stock + 1 })
       .eq("id", productId);

        return;

    } catch (err) {
        console.error(err)
    }
}

export async function RemoveStock(productId : number) {
    try {

        const { data: product, error: fetchError } = await supabase
       .from("products")
       .select("stock")
       .eq("id", productId)
       .single();

       if (fetchError) throw fetchError;

       const { data, error } = await supabase
       .from("products")
       .update({ stock: product.stock - 1 })
       .eq("id", productId);

        return;

    } catch (err) {
        console.error(err)
    }
}

export async function deleteProduct(productId : number) {
    try {

        const { data } = await supabase
        .from("products")
        .select("image")
        .eq("id", productId)
        .single();

        await supabase.storage.from("products").remove([data?.image]);

        const { error: deleteProductError } = await supabase
        .from("products")
        .delete()
        .eq("id", productId)

        if (deleteProductError) throw new Error("failed to delete product");

        return { success: true }
        
    } catch (err) {
        console.error(err)
    }
}