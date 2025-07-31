import { Link } from '@tanstack/react-router'

export function SideNavbar() {
  return (
    <aside className="p-4 border-r min-w-[200px]">
      <div className="mb-6 font-bold text-xl">Teddy</div>
      <nav className="flex flex-col gap-4">
        <Link to="/">Home</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/selected">Selected Clients</Link>
      </nav>
    </aside>
  )
}