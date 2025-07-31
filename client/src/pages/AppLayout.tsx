import { Outlet } from '@tanstack/react-router';
import { Header } from '@/components/Header';

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}