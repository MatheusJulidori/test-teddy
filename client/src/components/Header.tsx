import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { MdMenu, MdClose } from "react-icons/md";
import { SideNavbar } from './SideNavbar';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  return (
    <>
      <header className="w-full border-b border-border bg-white text-black px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="sr-only">Toggle menu</span>
            <MdMenu size={20} />
          </button>

          <div className="text-xl font-bold flex items-center gap-1">
            <img src="/logo.png" alt="Teddy Logo" className="h-8" />
          </div>
        </div>

        <nav className="hidden lg:flex gap-6 text-sm p-2">
          <Link
            to="/clients"
            className="cursor-pointer hover:underline hover:text-primary [&.active]:text-primary"
          >
            Clientes
          </Link>
          <Link
            to="/selected"
            className="cursor-pointer hover:underline hover:text-primary [&.active]:text-primary"
          >
            Clientes Selecionados
          </Link>
          <Link
            to="/login"
            onClick={() => {
              localStorage.removeItem('username');
            }}
            className="cursor-pointer hover:underline hover:text-primary"
          >
            Sair
          </Link>
        </nav>

        <div className="text-sm">
          Olá, <span className="font-semibold">{username ?? 'Usuário'}</span>!
        </div>
      </header>
      <AnimatePresence>
        {sidebarOpen && (
          <>
           
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

          
            <motion.aside
              className="fixed z-50 left-0 top-0 w-64 h-full bg-[--sidebar] text-[--sidebar-foreground] shadow-lg"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-xl hover:text-[--sidebar-primary]"
              >
              <MdClose className="text-primary cursor-pointer" />
              </button>
              <SideNavbar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
