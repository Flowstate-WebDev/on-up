import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'
import { Heading } from '@/components/ui/Heading'
import { UserDataBlock } from './components/UserDataBlock/UserDataBlock'

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

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    navigate({
      to: '/konto/login',
    })
  }

  const userData = [
    { label: 'Nazwa użytkownika', value: user.username },
    { label: 'Adres E-mail', value: user.email },
    { label: 'Numer Telefonu', value: user.phone || 'Nie podano' },
    { label: 'Typ konta', value: user.role === 'admin' ? 'Administrator' : 'Użytkownik' },
  ]

  return (
    <section className='w-full xl:w-2/3 grid grid-cols-2'>
      <div className="">
        <Heading size="xl">Dzień dobry, {user.username}!</Heading>
        <p className="text-text-tertiary -mt-4 mb-8">Zarządzaj swoim kontem i danymi</p>

        {userData.map((data) => (
          <UserDataBlock key={data.label} label={data.label} value={data.value} />
        ))}

        {user.role === 'admin' && (
          <button
            onClick={() => navigate({ to: '/konto/admin' })}
            className="mt-4 w-full bg-primary-500/10 hover:bg-primary-500/20 text-primary-500 font-semibold py-3 rounded-xl border border-primary-500/20 transition-all duration-200 cursor-pointer text-center"
          >
            Panel administracyjny
          </button>
        )}

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3 rounded-xl border border-red-500/20 transition-all duration-200 cursor-pointer text-center"
        >
          Wyloguj się
        </button>
      </div>
      <div>
        <p>tutaj będzie historia zamówień</p>
      </div>
    </section>
  )
}
