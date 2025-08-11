import type { PaginationParams } from '@shared/types/pagination';
import { useBaseTableEditor, type ValidationResult, type UseBaseTableEditorReturn } from '@entities/table';

export interface UseTableEditorFullRecordOptions<T extends { id: number }> {
  data: T[];
  updateMutation: any;
  validator?: (data: Partial<T>) => ValidationResult;
  successMessage?: string;
  setPagination: (pagination: Pick<PaginationParams, 'page' | 'size'>) => void;
}

export type UseTableEditorFullRecordReturn<T extends { id: number }> = UseBaseTableEditorReturn<T>;

export const useTableEditorFullRecord = <T extends { id: number }>({
  data,
  updateMutation,
  validator,
  successMessage = 'Изменения сохранены',
  setPagination,
}: UseTableEditorFullRecordOptions<T>): UseTableEditorFullRecordReturn<T> => {
  return useBaseTableEditor({
    data,
    updateMutation,
    validator,
    successMessage,
    setPagination,
    useFullRecord: true,
  });
};