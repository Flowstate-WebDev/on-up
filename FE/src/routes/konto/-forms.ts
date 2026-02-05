import { formOptions } from "@tanstack/react-form"

//Login
export interface Login {
  username: string
  password: string
}

const defaultLogin: Login = { username: '', password: '' }

export const loginFormOpts = formOptions({
  defaultValues: defaultLogin
})

//Register
export interface Register {
  username: string
  password: string
  repeatPassword: string
  email: string
  phone: string
}

const defaultRegister: Register = {
  username: '',
  password: '',
  repeatPassword: '',
  email: '',
  phone: ''
}

export const registerFormOpts = formOptions({
  defaultValues: defaultRegister
}) 
