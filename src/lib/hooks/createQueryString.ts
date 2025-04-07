import {useSearchParams} from 'next/navigation'
import {useCallback} from 'react'


export const useCreateQueryString = () => {
  const searchParams = useSearchParams()

  return useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, String(value))

      return params.toString()
    },
    [searchParams]
  )
}
