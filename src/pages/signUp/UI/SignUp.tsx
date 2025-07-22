import { SignUpForm } from "@features/SignUpForm";


export const SignUp = () => {
  return (
    <div className="box-border px-[50px] py-[26px] w-[600px] rounded-2xl shadow-md">
      <h1 className="font-bold text-[36px] leading-[56px] mb-3">Регистрация</h1>
      <SignUpForm/>
    </div>
  )
};
