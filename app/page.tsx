import Footer from "@/components/footer"
import { UserHeader } from "@/components/header"
import supabase from "@/lib/supabaseClient"
import styles from "./page.module.css"

export default async function Home() {

  const { data: products, error } = await supabase
  .from('products')
  .select('id, name, image, price, stock')
  .gt("stock", 0)
  .eq("available", true)
  .order("created_at", { ascending: false });

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

  return (
    <>
    <UserHeader />
    
    <main className={styles.home}>
    {productsWithImage?.map(product => (
      <ul key={product.id}>
        <img src={product.imageUrl} width="100%" height="170px" />
        <li
        style={{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
        >{product.name}</li>
        <li>${product.price}</li>
        <li>{product.stock} only left</li>
      </ul>
    ))}
    </main>

    <Footer />
    </>
  )
}