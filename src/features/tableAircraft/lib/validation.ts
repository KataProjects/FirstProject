import type { IContentAircraftTable } from '@shared/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateAircraftData = (data: Partial<IContentAircraftTable>): ValidationResult => {
  const errors: string[] = [];

  if (data.model !== undefined) {
    if (!data.model || data.model.trim().length === 0) {
      errors.push('Модель не может быть пустой');
    } else if (data.model.trim().length < 2) {
      errors.push('Модель должна содержать минимум 2 символа');
    }
  }

  if (data.aircraftNumber !== undefined) {
    if (!data.aircraftNumber || data.aircraftNumber.trim().length === 0) {
      errors.push('Номер самолета не может быть пустым');
    } else if (data.aircraftNumber.trim().length < 3) {
      errors.push('Номер самолета должен содержать минимум 3 символа');
    }
  }

  if (data.modelYear !== undefined) {
    const currentYear = new Date().getFullYear();
    if (!data.modelYear || isNaN(Number(data.modelYear))) {
      errors.push('Год выпуска должен быть числом');
    } else if (data.modelYear < 1900 || data.modelYear > currentYear + 5) {
      errors.push(`Год выпуска должен быть между 1900 и ${currentYear + 5}`);
    }
  }

  if (data.flightRange !== undefined) {
    if (!data.flightRange || isNaN(Number(data.flightRange))) {
      errors.push('Дальность полета должна быть числом');
    } else if (data.flightRange <= 0) {
      errors.push('Дальность полета должна быть больше 0');
    } else if (data.flightRange > 50000) {
      errors.push('Дальность полета не может превышать 50,000 км');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};