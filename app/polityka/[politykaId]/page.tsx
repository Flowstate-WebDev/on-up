import React from 'react'

type Props = {
  params: {
    politykaId: string
  }
}

export default function page({ params }: Props) {
  return (
    <div>{ params.politykaId }</div>
  )
}