import Header from "@/componentes/Header/Header";
import Footer from "@/componentes/Footer/Footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {children}
      </div>
      
      <Footer />
    </div>
  );
}