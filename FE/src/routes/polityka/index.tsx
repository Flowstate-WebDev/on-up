import { createFileRoute } from '@tanstack/react-router'
import { Policy } from '@/data/policy'
import { Card } from '@/routes/polityka/-Card'

export const Route = createFileRoute('/polityka/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-10">Polityka strony</h1>
      <div className="flex gap-4 flex-wrap max-w-212.5 mx-auto justify-center mb-10">
        {Policy.map((Policy, index) => (
          <Card key={index} title={Policy.title} policyId={Policy.title} />
        ))}
      </div>
    </main>
  )
}
