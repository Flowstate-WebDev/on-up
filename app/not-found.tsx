import Button from '@/components/client/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
        <h1 className='text-5xl text-primary'>Nie znaleziono strony</h1>
        <p className='text-xl text-text-tertiary'>Sprawdź czy adres URL jest poprawny.</p>
        <Button style='default' type='button'><Link href={'/'}>Powrot do strony glownej</Link></Button>
    </div>
  )
}