import { SignUpForm } from "@features/SignUpForm";
// import styles from './signUp.module.scss'

export const SignUp = () => {
  return (
    <div className="box-border px-[50px] py-[26px] w-[600px] shadow-[0_2px_8px_rgba(128,128,128,0.1),0_6px_20px_rgba(128,128,128,0.2)] rounded-[16px]">
      <SignUpForm/>
    </div>
  )
};
