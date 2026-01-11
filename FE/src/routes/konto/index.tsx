import Button from '@/components/UI/Interaction/Button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/konto/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='flex justify-center items-center py-10'>

    </main>
  )
}