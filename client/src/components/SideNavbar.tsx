import { Link } from '@tanstack/react-router';
import { MdHome, MdPeople, MdLogout } from 'react-icons/md';

export function SideNavbar() {

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="flex items-center justify-center h-30 border-b border-accent bg-secondary-foreground">
        <img src="/logo.png" alt="Teddy Logo" className="h-12" />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4 text-sm bg-background">
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-sidebar-primary [&.active]:text-sidebar-primary cursor-pointer"
        >
          <MdHome size={18} /> Home
        </Link>
        <Link
          to="/clients"
          className="flex items-center gap-2 hover:text-sidebar-primary [&.active]:text-sidebar-primary cursor-pointer"
        >
          <MdPeople size={18} /> Clients
        </Link>
        <Link
          to="/selected"
          className="flex items-center gap-2 hover:text-sidebar-primary [&.active]:text-sidebar-primary cursor-pointer"
        >
          <MdPeople size={18} /> Selected Clients
        </Link>
      </nav>

      <div className="px-4 py-6 border-t border-sidebar-border">
        <button
          onClick={() => {
            localStorage.removeItem('username');
            window.location.href = '/login';
          }}
          className="flex items-center gap-2 text-sm text-sidebar-accent-foreground hover:text-sidebar-primary cursor-pointer"
        >
          <MdLogout size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
