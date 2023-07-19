import type { AppDispatch, RootState } from '@/services/store'
// eslint-disable-next-line no-restricted-imports
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

type DispatchFunction = () => AppDispatch
export const useAppDispatch: DispatchFunction = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
