import type { PaginationParams } from '@shared/types/pagination';
import type { ValidationResult } from './useBaseTableEditor'; 

export type { ValidationResult }; 

import {
  useBaseTableEditor,
  type UseBaseTableEditorReturn,
} from './useBaseTableEditor';

export interface UseTableEditorOptions<T extends { id: number }> {
  data: T[];
  updateMutation: any;
  validator?: (data: Partial<T>) => ValidationResult;
  successMessage?: string;
  setPagination: (pagination: Pick<PaginationParams, 'page' | 'size'>) => void;
}

export type UseTableEditorReturn<T extends { id: number }> = UseBaseTableEditorReturn<T>;

export const useTableEditor = <T extends { id: number }>({
  successMessage = 'Изменения сохранены',
  ...rest
}: UseTableEditorOptions<T>): UseTableEditorReturn<T> => {
  return useBaseTableEditor({
    successMessage,
    useFullRecord: false,
    ...rest,
  });
};
