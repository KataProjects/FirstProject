import { useState, useCallback } from 'react';
import { message, type TablePaginationConfig } from 'antd';
import type { PaginationParams } from '@shared/types/pagination';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface UseTableEditorOptions<T extends { id: number }> {
  data: T[];
  updateMutation: any;
  validator?: (data: Partial<T>) => ValidationResult;
  successMessage?: string;
  pagination?: Pick<PaginationParams, 'page' | 'size'>;
  setPagination: (pagination: Pick<PaginationParams, 'page' | 'size'>) => void;
}

export interface UseTableEditorReturn<T extends { id: number }> {
  editingKey: number | null;
  editingData: Partial<T>;
  validationErrors: Record<string, string>;
  isEditing: (record: T) => boolean;
  edit: (record: T) => void;
  cancel: () => void;
  save: (id: number) => Promise<void>;
  handleInputChange: (field: keyof T, value: string | number) => void;
  handleTableChange: (pagination: TablePaginationConfig) => void;
  getInputStatus: (field: keyof T) => 'error' | undefined;
}

export const useTableEditor = <T extends { id: number }>({
  data,
  updateMutation,
  validator,
  successMessage = 'Изменения сохранены',
  setPagination,
}: Omit<UseTableEditorOptions<T>, 'pagination'>): UseTableEditorReturn<T> => {
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<T>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const isEditing = useCallback((record: T) => record.id === editingKey, [editingKey]);

  const edit = useCallback((record: T) => {
    setEditingKey(record.id);
    setEditingData({ ...record });
    setValidationErrors({});
  }, []);

  const cancel = useCallback(() => {
    setEditingKey(null);
    setEditingData({});
    setValidationErrors({});
  }, []);

  const save = useCallback(
    async (id: number) => {
      try {
        const originalRecord = data.find(item => item.id === id);
        if (!originalRecord) {
          message.error('Запись не найдена');
          return;
        }

        const changedFields: Partial<T> = {};
        let hasChanges = false;

        Object.keys(editingData).forEach(key => {
          const field = key as keyof T;
          const newValue = editingData[field];
          if (newValue !== undefined && newValue !== originalRecord[field]) {
            changedFields[field] = newValue;
            hasChanges = true;
          }
        });

        if (!hasChanges) {
          message.info('Нет изменений для сохранения');
          return;
        }

        if (validator) {
          const validation = validator(changedFields as Partial<T>);
          if (!validation.isValid) {
            message.error('Ошибка валидации: ' + validation.errors.join(', '));
            return;
          }
        }

        await updateMutation({ id, ...changedFields }).unwrap();
        setEditingKey(null);
        setEditingData({});
        setValidationErrors({});
        message.success(successMessage);
      } catch (errInfo) {
        message.error('Ошибка при сохранении');
      }
    },
    [data, editingData, updateMutation, validator, successMessage]
  );

  const handleInputChange = useCallback(
    (field: keyof T, value: string | number) => {
      setEditingData(prev => ({ ...prev, [field]: value }));

      if (validationErrors[field as string]) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [validationErrors]
  );

  const handleTableChange = useCallback(
    (pagination: TablePaginationConfig) => {
      if (pagination.current !== undefined && pagination.pageSize !== undefined) {
        setPagination({
          page: pagination.current - 1,
          size: pagination.pageSize,
        });
        setEditingKey(null);
        setEditingData({});
        setValidationErrors({});
      }
    },
    [setPagination]
  );

  const getInputStatus = useCallback(
    (field: keyof T) => {
      return validationErrors[field as string] ? 'error' : undefined;
    },
    [validationErrors]
  );

  return {
    editingKey,
    editingData,
    validationErrors,
    isEditing,
    edit,
    cancel,
    save,
    handleInputChange,
    handleTableChange,
    getInputStatus,
  };
};