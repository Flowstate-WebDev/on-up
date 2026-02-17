type PolicyType = {
  exists: boolean;
  name: string;
  content: React.JSX.Element;
}

import { Policy } from '@/data/policy'
import { PolicyContent } from '@/data/policyContent'

export const usePolicy = (policyId: string) => {
  const policyExists = Policy.some((policy) => policy.slug === policyId)
  const policyName = Policy.find((policy) => policy.slug === policyId)?.title
  const policyContent = PolicyContent[policyId]

  return { policy: { exists: policyExists, name: policyName, content: policyContent } as PolicyType }
}