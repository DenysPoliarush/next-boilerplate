export const copyText = async (value: string, cb: () => void) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }

  cb()
}
