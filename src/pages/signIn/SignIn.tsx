import { SignInForm } from '@features/SignInForm';

import { Link } from 'react-router-dom';

import styles from './SignIn.module.scss';

export const SignIn = () => {
  return (
    <div className={styles.signInBox}>
      <h1 className={styles.signInBox__title}>Вход</h1>
      <SignInForm />
      <div className={styles.signInBox__linkBox}>
        Ещё нет аккаунта?{' '}
        <Link to="/sign_up" className={styles.signInBox__link}>
          Зарегистрируйтесь
        </Link>
      </div>
    </div>
  );
};
