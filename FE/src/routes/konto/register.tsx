
import { createFileRoute, Link } from '@tanstack/react-router'
import { formOptions, useForm } from '@tanstack/react-form'

import { Button } from '@/components/ui/Button'

import { errorInput, inputStyle } from '@/components/ui/Input/Input.variants'
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
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    ...registerFormOpts,
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
          // Tu można dodać przekierowanie, np. router.navigate({ to: '/konto/login' })
        } else {
          alert('Błąd: ' + (data.error || 'Coś poszło nie tak'));
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Błąd połączenia z serwerem');
      }
    }
  })

  return (
    <main className='flex justify-center items-center py-10'>
      <form onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        form.handleSubmit()
      }} className='flex flex-col gap-6 justify-center items-center rounded-lg border-2 border-border-primary p-6 w-fit'>
        <h1 className='text-3xl font-bold'>Zarejestruj się</h1>
        <form.Field
          name='username'
          validators={{
            onChange: ({ value }) => value.length < 3 ? 'Nazwa użytkownika powinna mieć ponad 3 znaki' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <input
                  type='text'
                  placeholder='Nazwa użytkownika'
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-200' : ''} ${inputStyle({ style: 'default' })}`}
                />
                {!field.state.meta.isValid && (
                  <p className={errorInput()}>{field.state.meta.errors.join(', ')}</p>
                )}
              </>
            )
          }}
        />

        <form.Field
          name='password'
          validators={{
            onChange: ({ value }) => value.length < 6 ? 'Hasło powinno mieć ponad 6 znaków' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <input
                  type='password'
                  placeholder='Hasło'
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-200' : ''} ${inputStyle({ style: 'default' })}`}
                />
                {!field.state.meta.isValid && (
                  <p className={errorInput()}>{field.state.meta.errors.join(', ')}</p>
                )}
              </>
            )
          }}
        />
        <form.Field
          name='repeatPassword'
          validators={{
            onChange: ({ value }) => value !== form.state.values.password ? 'Podane hasła się nie zgadzają' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <input
                  type='password'
                  placeholder='Powtórz hasło'
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-200' : ''} ${inputStyle({ style: 'default' })}`}
                />
                {!field.state.meta.isValid && (
                  <p className={errorInput()}>{field.state.meta.errors.join(', ')}</p>
                )}
              </>
            )
          }}
        />
        <form.Field
          name='email'
          validators={{
            onChange: ({ value }) => !value.includes('@') || !value.includes('.') ? 'Nieprawidłowy adres e-mail' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <input
                  type='email'
                  placeholder='E-mail'
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-200' : ''} ${inputStyle({ style: 'default' })}`}
                />
                {!field.state.meta.isValid && (
                  <p className={errorInput()}>{field.state.meta.errors.join(', ')}</p>
                )}
              </>
            )
          }}
        />
        <form.Field
          name='phone'
          validators={{
            onChange: ({ value }) => value.length != 9 ? 'Nieprawidłowy numer telefonu' : undefined,
          }}
          children={(field) => {
            return (
              <>
                <input
                  type='tel'
                  placeholder='Telefon'
                  maxLength={16}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`${field.state.meta.errors.length > 0 ? 'border-red-500 bg-red-200' : ''} ${inputStyle({ style: 'default' })}`}
                />
                {!field.state.meta.isValid && (
                  <p className={errorInput()}>{field.state.meta.errors.join(', ')}</p>
                )}
              </>
            )
          }}
        />
        <Button style={'default'} type={'submit'}>Zarejestruj się</Button>
        <hr className='border-text-tertiary w-full' />
        <p className='text-center'>Masz już konto? <Link to='/konto/login' className='text-primary hover:text-tertiary'>Zaloguj się</Link></p>
      </form>
    </main>
  )
}