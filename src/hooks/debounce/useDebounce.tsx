"use client"
import { useEffect, useState } from "react"

function useDebounce(value: any, delay: any) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(handler)
  }, [value])

  return debounceValue
}

export default useDebounce
