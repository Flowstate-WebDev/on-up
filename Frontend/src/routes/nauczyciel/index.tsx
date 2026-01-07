import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nauczyciel/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nauczyciel/"!</div>
}