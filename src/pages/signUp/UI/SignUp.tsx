import { SignUpForm } from '@features/SignUpForm';

export const SignUp = () => {
  return (
    <div className="box-border bg-[rgb(220,235,235)] px-[50px] py-[26px] w-[600px] rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <h1 className="font-bold text-[36px] leading-[56px] mb-3">Регистрация</h1>
      <SignUpForm />
    </div>
  );
};
