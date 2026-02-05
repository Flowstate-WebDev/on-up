import { PolicyContent } from '@/data/policyContent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/polityka/$policyId')({
  component: RouteComponent,
  loader: ({ params }) => {
    return {
      policyId: params.policyId
    }
  },
  pendingComponent: () => <div className="flex items-center justify-center text-4xl">Ładowanie...</div>,
  errorComponent: () => <div className="flex items-center justify-center text-4xl">Ups! coś poszło nie tak</div>
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const content = PolicyContent[data.policyId]

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-12">{data.policyId}</h1>
      <div
        className="prose prose-slate max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content || '<p class="text-center">Treść w przygotowaniu...</p>' }}
      />
    </main>
  )
}

