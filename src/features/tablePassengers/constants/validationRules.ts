import { type RegisterOptions } from 'react-hook-form';

export interface IValidationRules {
  required: RegisterOptions['required'];
  minLength?: RegisterOptions['minLength'];
  pattern?: RegisterOptions['pattern'];
}

export const nameValidationRules: IValidationRules = {
  required: 'Обязательное поле',
  minLength: {
    value: 2,
    message: 'Минимум 2 буквы',
  },
  pattern: {
    value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
    message: 'Только буквы',
  },
};

export const phoneValidationRules: IValidationRules = {
  required: 'Обязательное поле',
  minLength: {
    value: 6,
    message: 'Минимум 6 цифр',
  },
  pattern: {
    value: /^[0-9]+$/,
    message: 'Только цифры',
  },
};

export const serialNumberValidationRules: IValidationRules = {
  required: 'Обязательное поле',
  pattern: {
    value: /^\d{4}\s\d{6}$/,
    message: 'Введите данные в формате: 1234 567890',
  },
};
