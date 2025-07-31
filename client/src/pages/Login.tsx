import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    localStorage.setItem('username', trimmed)
    navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-xl font-semibold text-foreground">Olá, seja bem vindo!</h1>
        <Input
          type="text"
          placeholder="Digite seu nome:"
          className="w-full border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          className="w-full font-semibold py-2 rounded-md hover:opacity-90 transition cursor-pointer"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </div>
    </div>
  )
}
