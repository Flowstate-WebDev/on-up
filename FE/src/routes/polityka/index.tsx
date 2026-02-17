import { createFileRoute } from '@tanstack/react-router'
import { Policy } from '@/data/policy'
import { PolicyButton } from '@/routes/polityka/components/PolicyButton'
import { Heading } from '@/components/ui/Heading'

export const Route = createFileRoute('/polityka/')({
  component: PoliciesPage,
  beforeLoad: () => {
    document.title = 'On-Up | Polityka strony'
  }
})

function PoliciesPage() {
  return (
    <main>
      <Heading size="xl" center>Polityka strony</Heading>
      <div className="flex gap-4 flex-wrap max-w-212.5 mx-auto justify-center mb-10">
        {Policy.map((item, index) => (
          <PolicyButton key={index} title={item.title} policyId={item.slug} />
        ))}
      </div>
    </main>
  )
}
