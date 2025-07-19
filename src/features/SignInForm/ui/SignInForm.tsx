import { Input } from 'antd';

import { Controller, useForm } from 'react-hook-form';

import { type FormValues } from '../model/types';

import styles from './SignInForm.module.scss';


const SignInForm: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  return (
    <form className={styles.signInForm}>
      <label className={styles.signInForm__inputLabel}>
        Email
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email обязателен для заполнения',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email адрес',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className={styles.signInForm__input}
              placeholder="Введите email"
              status={errors.email ? 'error' : ''}
            />
          )}
        />
        {errors.email && <span className={styles.signInForm__error}>{errors.email.message}</span>}
      </label>

      <label className={styles.signInForm__inputLabel}>
        Пароль
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Пароль обязателен для заполнения',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              className={styles.signInForm__input}
              placeholder="Введите пароль"
              status={errors.password ? 'error' : ''}
            />
          )}
        />
        {errors.password && (
          <span className={styles.signInForm__error}>{errors.password.message}</span>
        )}
      </label>
      <button className={styles.signInForm__button}>Войти</button>
    </form>
  );
};

export { SignInForm };
