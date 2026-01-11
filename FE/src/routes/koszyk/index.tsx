import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/koszyk/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/koszyk/"!</div>
}