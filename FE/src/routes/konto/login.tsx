import Button from '@/components/UI/Interaction/Button'
import Input from '@/components/UI/Interaction/Input'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/konto/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className='flex justify-center items-center py-10'>
            <div className='flex flex-col gap-6 justify-center items-center rounded-lg border-2 border-border-primary p-6 w-fit'>
                <h1 className='text-3xl font-bold'>Zaloguj się</h1>
                <Input type={'text'} style={'default'} placeholder={'Nazwa użytkownika'} />
                <Input type={'password'} style={'default'} placeholder={'Hasło'} />
                <Button type={'submit'} style={'default'}>Zaloguj się</Button>
                <p className='text-center'>Nie masz konta? <Link to='/konto/register' className='text-primary hover:text-tertiary'>Zarejestruj się</Link></p>
            </div>
        </main>
    )
}