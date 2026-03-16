/**
 * 型付きディスパッチフック
 */

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

// 型付きuseDispatchフック
export const useAppDispatch = () => useDispatch<AppDispatch>();
