import { Outlet } from '@tanstack/react-router';
import { SideNavbar } from '@/components/SideNavbar';

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <SideNavbar />
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}