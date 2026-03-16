/**
 * 型付きセレクターフック
 */

import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';

// 型付きuseSelectorフック
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
