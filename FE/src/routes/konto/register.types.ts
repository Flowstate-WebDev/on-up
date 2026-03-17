import type { Login } from "./login.types"

export interface Register extends Login {
  repeatPassword: string
  email: string
  phone: string
  firstName?: string
  lastName?: string
  city?: string
  postalCode?: string
  street?: string
  building?: string
  apartment?: string
}