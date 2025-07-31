import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { MdMenu } from "react-icons/md";

export function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  return (
    <header className="w-full border-b border-border bg-white text-black px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="">
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
  );
}
