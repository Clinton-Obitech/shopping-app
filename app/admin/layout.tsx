import Footer from "@/components/footer";
import { AdminHeader } from "@/components/header";

export default function AdminLayout({children} : {children: React.ReactNode}) {
  return (
      <body>
        <AdminHeader />
        {children}
        <Footer />
      </body>
  );
}