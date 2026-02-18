import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/konto/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/konto/admin"!</div>
}