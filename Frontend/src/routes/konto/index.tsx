import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/konto/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/konto/"!</div>
}