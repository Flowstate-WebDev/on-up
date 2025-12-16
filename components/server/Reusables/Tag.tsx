import React from 'react'

type Props = {
  children: string
}

export default function Tag({ children }: Props) {
  return (
    <span className='text-white text-sm bg-blue-500 rounded-full px-2 border-blue-600 border-2'>{ children }</span>
  )
}