// app/dashboard/layout.tsx
import { Navbar } from '.@/components/Navbar'; // Componente de navegación
import { Sidebar } from '.@/components/Sidebar'; // Componente de menú lateral

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          {children} {/* Aquí se renderizará el contenido de cada página */}
        </main>
      </div>
    </div>
  );
}