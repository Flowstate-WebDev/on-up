import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/konto/')({
  beforeLoad: ({ context }) => {
    document.title = 'On-Up | Moje konto'
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/konto/login',
      })
    }
  },
  component: AccountPage,
})

function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate({
      to: '/konto/login',
    })
  }

  return (
    <main className='flex flex-col justify-center items-center py-10 gap-4'>
      <h1 className="text-2xl font-bold">Moje Konto</h1>
      {user && (
        <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md">
          <p><strong>Użytkownik:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
      >
        Wyloguj się
      </button>
    </main>
  )
}