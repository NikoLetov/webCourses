import { useEffect, useState } from 'react'

export const useDebounce = <T,>(arg: T, time: number = 500): T => {
	const [debounceValue, setDebounceValue] = useState<T>(arg)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceValue(arg)
		}, time)
		return () => clearTimeout(timer)
	}, [arg, time])

	return debounceValue
}
