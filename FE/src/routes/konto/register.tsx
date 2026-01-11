import Button from '@/components/UI/Interaction/Button';
import Input from '@/components/UI/Interaction/Input';
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/konto/register')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className='flex justify-center items-center py-10'>
            <div className='flex flex-col gap-6 justify-center items-center rounded-lg border-2 border-border-primary p-6 w-fit'>
                <h1>Rejestracja</h1>
                <Input type={'text'} style={'default'} placeholder={'Nazwa użytkownika'} />
                <Input type={'email'} style={'default'} placeholder={'Email'} />
                <Input type={'password'} style={'default'} placeholder={'Hasło'} />
                <Input type={'password'} style={'default'} placeholder={'Powtórz hasło'} />
                <Input type={'tel'} style={'default'} placeholder={'Numer telefonu'} />
                <Button type={'submit'} style={'default'}>Zarejestruj się</Button>
                <p className='text-center'>Masz już konto? <Link to='/konto/login' className='text-primary hover:text-tertiary'>Zaloguj się</Link></p>
            </div>
        </main>
    );
}
