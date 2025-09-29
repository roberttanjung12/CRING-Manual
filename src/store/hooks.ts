import { useDispatch as useAppDispatch, useSelector as useAppSelector, type TypedUseSelectorHook } from 'react-redux';
import type { ApplicationState, ApplicationDispatch } from './store';

export const useDispatch = () => useAppDispatch<ApplicationDispatch>();

export const useSelector: TypedUseSelectorHook<ApplicationState> = useAppSelector;
