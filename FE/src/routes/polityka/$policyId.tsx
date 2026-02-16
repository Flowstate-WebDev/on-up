import { Policy } from '@/data/policy'
import { PolicyContent } from '@/data/policyContent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/polityka/$policyId')({
  component: PolicyPage,
})

function PolicyPage() {
  const { policyId } = Route.useParams()
  const policyItem = Policy.find((p) => p.slug === policyId)
  const content = PolicyContent[policyId]

  if (!content || !policyItem) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-bold">Polityka nie została znaleziona</h1>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-12">{policyItem.title}</h1>
      <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed">
        {content}
      </div>
    </section>
  )
}

