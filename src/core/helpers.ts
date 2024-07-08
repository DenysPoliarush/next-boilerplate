import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyText = async (value: string, cb: () => void) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }

  cb()
}
