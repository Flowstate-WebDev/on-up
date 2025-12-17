import React from 'react'
import Link from 'next/link'

type Props = {}

export default function Polityka({}: Props) {
  return (
    <div>
        <div>Warunki i zasady</div>
        <ul>
            <li><Link href={'/polityka/1'}></Link></li>
            <li><Link href={'/polityka/2'}></Link></li>
            <li><Link href={'/polityka/3'}></Link></li>
            <li><Link href={'/polityka/4'}></Link></li>
            <li><Link href={'/polityka/5'}></Link></li>
        </ul>
    </div>
  )
}