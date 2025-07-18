import { Input } from 'antd';

import styles from './SignInForm.module.scss';

const SignInForm: React.FC = () => {
  return (
    <form className={styles.signInForm}>
      <label className={styles.signInForm__inputLabel}>
        Email
        <Input className={styles.signInForm__input} placeholder="Введите email" />
      </label>
      <label className={styles.signInForm__inputLabel}>
        Пароль
        <Input.Password className={styles.signInForm__input} placeholder="Введите пароль" />
      </label>
      <button className={styles.signInForm__button}>Войти</button>
    </form>
  );
};

export { SignInForm };
