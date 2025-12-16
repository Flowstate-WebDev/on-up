"use client";
import React from 'react'
import { tv } from 'tailwind-variants';

type Props = {
    title: string,
    cta: string
}

const button = tv({
    base: "",
    variants: {
        type: {
            cta: {
                default: "bg-blue-500",
                outline: "border-2 border-blue-500 text-blue-500"
            }
        }
    }
})

export default function Button({title, cta}: Props) {
  return (
    <button className={button({type: 'cta' })}>{title}</button>
  )
}