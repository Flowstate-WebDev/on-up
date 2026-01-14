import { useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { loginFormOpts, type Login } from './-forms'
import { useForm } from '@tanstack/react-form'
import Button from '@/components/UI/Interaction/Button'
import { errorInput, inputStyle } from '@/styles'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/konto/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const { login, isAuthenticated } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: '/konto' })
        }
    }, [isAuthenticated, navigate])

    const mutation = useMutation({
        mutationFn: async (value: Login) => {
            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(value),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Błąd połączenia z serwerem');
            }

            return data;
        },
        onSuccess: (data) => {
            login(data.token, data.user)
        }
    })

    const form = useForm({
        ...loginFormOpts,
        onSubmit: async ({ value }) => {
            mutation.mutate(value)
        }
    })

    return (
        <main className='flex justify-center items-center py-10'>
            <form onSubmit={(e) => {
                e.stopPropagation()
                e.preventDefault()
                form.handleSubmit()
            }} className='flex flex-col gap-6 justify-center items-center rounded-lg border-2 border-border-primary p-6 w-fit'>
                <h1 className='text-3xl font-bold'>Zaloguj się</h1>
                <form.Field
                    name='username'
                    validators={{
                        onChange: ({ value }) => value.length < 3 ? 'Nazwa użytkownika powinna mieć ponad 3 znaki' : undefined,
                    }}
                    children={(field) => (
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
                    )}
                />

                <form.Field
                    name='password'
                    validators={{
                        onChange: ({ value }) => value.length < 6 ? 'Hasło powinno mieć ponad 6 znaków' : undefined,
                    }}
                    children={(field) => (
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
                    )}
                />
                <Button
                    style={'default'}
                    type={'submit'}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Logowanie...' : 'Zaloguj'}
                </Button>
                {mutation.isError && (
                    <p className={errorInput() + ' text-center'}>{mutation.error.message}</p>
                )}
                <hr className='border-text-tertiary w-full' />
                <p className='text-center'>Nie masz konta? <Link to='/konto/register' className='text-primary hover:text-tertiary'>Zarejestruj się</Link></p>
            </form>
        </main>
    )
}