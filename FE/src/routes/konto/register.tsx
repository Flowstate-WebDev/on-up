import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { formOptions, useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/Button'
import { inputStyle } from '@/components/ui/Input/Input.variants'
import { AuthLayout } from './components/Auth/AuthLayout'
import { useToast } from '@/context/ToastContext'
import type { Register } from './register.types'

const registerFormOpts = formOptions({
  defaultValues: {
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    phone: ''
  } as Register
})

export const Route = createFileRoute('/konto/register')({
  component: RegisterPage,
  beforeLoad: () => {
    document.title = 'On-Up | Rejestracja'
  }
})

function RegisterPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const mutation = useMutation({
    mutationFn: async (value: Register) => {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Coś poszło nie tak');
      }

      return data;
    },
    onSuccess: () => {
      showToast('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.', 'success');
      navigate({ to: '/konto/login' });
    }
  });

  const form = useForm({
    ...registerFormOpts,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    }
  })

  return (
    <AuthLayout 
      title="Zarejestruj się" 
      subtitle="Dołącz do nas i ciesz się pełnią możliwości."
    >
      <form onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        form.handleSubmit()
      }} className='mt-8 space-y-4'>
        
        <form.Field
          name='username'
          validators={{
            onSubmit: ({ value }) => value.length < 3 ? 'Nazwa użytkownika powinna mieć ponad 3 znaki' : undefined,
          }}
          children={(field) => (
            <div className="space-y-1">
              <input
                type='text'
                placeholder='Nazwa użytkownika'
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full ${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-50' : ''} ${inputStyle({ style: 'default' })} transition-all focus:ring-2 focus:ring-primary/20`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-xs mt-1 px-1">{field.state.meta.errors.join(', ')}</p>
              )}
            </div>
          )}
        />

        <form.Field
          name='email'
          validators={{
            onSubmit: ({ value }) => !value.includes('@') || !value.includes('.') ? 'Nieprawidłowy adres e-mail' : undefined,
          }}
          children={(field) => (
            <div className="space-y-1">
              <input
                type='email'
                placeholder='E-mail'
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full ${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-50' : ''} ${inputStyle({ style: 'default' })} transition-all focus:ring-2 focus:ring-primary/20`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-xs mt-1 px-1">{field.state.meta.errors.join(', ')}</p>
              )}
            </div>
          )}
        />

        <form.Field
          name='phone'
          validators={{
            onSubmit: ({ value }) => value.length !== 9 ? 'Nieprawidłowy numer telefonu (9 cyfr)' : undefined,
          }}
          children={(field) => (
            <div className="space-y-1">
              <input
                type='tel'
                placeholder='Telefon'
                maxLength={9}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full ${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-50' : ''} ${inputStyle({ style: 'default' })} transition-all focus:ring-2 focus:ring-primary/20`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-xs mt-1 px-1">{field.state.meta.errors.join(', ')}</p>
              )}
            </div>
          )}
        />

        <form.Field
          name='password'
          validators={{
            onSubmit: ({ value }) => value.length < 6 ? 'Hasło powinno mieć ponad 6 znaków' : undefined,
          }}
          children={(field) => (
            <div className="space-y-1">
              <input
                type='password'
                placeholder='Hasło'
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full ${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-50' : ''} ${inputStyle({ style: 'default' })} transition-all focus:ring-2 focus:ring-primary/20`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-xs mt-1 px-1">{field.state.meta.errors.join(', ')}</p>
              )}
            </div>
          )}
        />

        <form.Field
          name='repeatPassword'
          validators={{
            onSubmit: ({ value }) => value !== form.state.values.password ? 'Podane hasła się nie zgadzają' : undefined,
          }}
          children={(field) => (
            <div className="space-y-1">
              <input
                type='password'
                placeholder='Powtórz hasło'
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full ${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-50' : ''} ${inputStyle({ style: 'default' })} transition-all focus:ring-2 focus:ring-primary/20`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-xs mt-1 px-1">{field.state.meta.errors.join(', ')}</p>
              )}
            </div>
          )}
        />

        <div className="mt-8 space-y-4">
          <Button 
            className="w-full py-3 text-base font-bold shadow-lg shadow-primary/20" 
            style="default" 
            type="submit" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Tworzenie konta..." : "Zarejestruj się"}
          </Button>

          {mutation.isError && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">
              {mutation.error.message}
            </p>
          )}

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-secondary"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-bg-secondary px-2 text-text-tertiary">Masz już konto?</span>
            </div>
          </div>

          <p className='text-center text-sm text-text-secondary'>
            <Link to='/konto/login' className="font-bold text-primary hover:text-tertiary transition-colors">
              Zaloguj się
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}