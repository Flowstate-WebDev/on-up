"use client";
import React from 'react'
import { tv } from 'tailwind-variants';

type Props = {
    title: string,
    type: "default" | "outline"
}

const button = tv({
    base: "rounded-lg",
    variants: {
        type: {
            default: "bg-red-500",
            outline: "bg-green-500",
        }
    }
})

export default function Button({title, type}: Props) {
  return (
    <button className={button({ type })}>{title}</button>
  )
}