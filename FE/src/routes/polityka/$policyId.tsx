import { Heading } from '@/components/ui/Heading'
import { usePolicy } from '@/hooks/policies/usePolicy';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/polityka/$policyId')({
  component: PolicyPage,
  beforeLoad: () => {
    document.title = 'On-Up | Polityka strony'
  }
})

function PolicyPage() {
  const { policyId } = Route.useParams();
  const { policy } = usePolicy(policyId);

  if (!policy.exists || !policy.content) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-10 text-center">
        <Heading size="lg">Polityka nie została znaleziona</Heading>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <Heading size="xl">{policy.name}</Heading>
      <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed">
        {policy.content}
      </div>
    </section>
  )
}

