import { Link } from "@tanstack/react-router"
import type { PolicyButtonProps } from "./PolicyButton.types"

export const PolicyButton = ({ title, policyId }: PolicyButtonProps) => {
  return (
    <Link to="/polityka/$policyId" params={{ policyId }} className="flex items-center justify-center border-border-primary border rounded-lg w-64 h-24 hover:bg-slate-50 transition-colors shadow-sm">
      <h1 className="font-medium text-lg text-center">{title}</h1>
    </Link>
  )
}