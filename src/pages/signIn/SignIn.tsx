import { SignInForm } from '@features';
import styles from "./SignIn.module.scss"

export const SignIn = () => {
   return (
    <div className={styles.signInBox}>
      <h1>Вход</h1>
      <SignInForm />
    </div>
   )

};
