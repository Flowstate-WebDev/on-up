type Props = {
  children: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  center?: boolean
}

export const Heading = ({ children, size = 'md', center = false }: Props) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  return (
    <h1 className={`font-bold ${sizeClasses[size]} ${center && 'text-center'} mb-4`}>{children}</h1>
  )
}