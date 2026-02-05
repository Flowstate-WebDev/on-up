import type { Login } from "./login.types"

export interface Register extends Login {
  repeatPassword: string
  email: string
  phone: string
}