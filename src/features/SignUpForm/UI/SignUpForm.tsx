import { Button, Checkbox, Form, Input, Select } from 'antd';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { securityQuestions } from '../model/constants';
import { useRegisterMutation } from '../model/registerApi';
import { type FormValues } from '../model/types'
import styles from './SignUpForm.module.scss';

export const SignUpForm: React.FC = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [message, setEMessage] = useState('');

  const showMessage = (message: string, isSuccess: boolean) => {
  setEMessage(message);
  const timer = setTimeout(() => {
    setEMessage('');
    if (isSuccess) {
      navigate('/');
    }
  }, 2000);
  return () => clearTimeout(timer);
};

const onSubmit = async (values: FormValues) => {
  try {
    const { confirmPassword, ...registerData } = values;
    await register(registerData).unwrap();
    form.resetFields();
    showMessage('Регистрация прошла успешно', true);
  } catch (error) {
    showMessage('Ошибка регистрации', false);
  }
};

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      initialValues={{
        securityQuestion: securityQuestions[0].value,
        agreement: false,
      }}
      className={styles['signup-form']}
    >
      {message && (
        <div
          className={
            message === 'Ошибка регистрации'
              ? styles['signup-form__error']
              : styles['signup-form__success']
          }
        >
          {message}
        </div>
      )}
      <Form.Item
        label="Email"
        name="email"
        required={false}
        rules={[
          { required: true, message: 'Введите email' },
          { type: 'email', message: 'Введите корректный email' },
        ]}
        className={styles['signup-form__input-label']}
        getValueFromEvent={(e) => e.target.value.trim()} 
        normalize={(value) => value.trim()}
      >
        <Input placeholder="Введите ваш email" className={styles['signup-form__input']} />
      </Form.Item>
      <Form.Item label="Секретный вопрос" name="securityQuestion">
        <Select>
          {securityQuestions.map((q) => {
            return (
              <Select.Option key={q.value} value={q.value}>
                {q.label}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Ответ на секрестный вопрос"
        name="answerQuestion"
        required={false}
        rules={[
          { required: true, message: 'Введите ответ на секретный вопрос' },
          { min: 3, message: 'Ответ должен состоять минимум из 3 символов' },
        ]}
          getValueFromEvent={(e) => e.target.value.trim().toLowerCase()}
          normalize={(value) => value.trim().toLowerCase()}
      >
        <Input placeholder="Введите ответ на секретный вопрос" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        required={false}
        rules={[
          { required: true, message: 'Введите пароль' },
          { min: 5, message: 'Ответ должен состоять минимум из 5 символов' },
        ]}
      >
        <Input.Password placeholder="Придумайте пароль" />
      </Form.Item>
      <Form.Item
        label="Повторите пароль"
        name="confirmPassword"
        required={false}
        dependencies={['password']}
        rules={[
          { required: true, message: 'Повторите пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Повторите пароль" />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Необходимо принять условия соглашения')),
          },
        ]}
      >
        <Checkbox>
          Я прочитал(-а) все условия <a href="#">пользовательского соглашения</a> и согласен(-на) с
          ними
        </Checkbox>
      </Form.Item>
      <Form.Item label={null} className={styles['signup-form__submit']}>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
      </Form.Item>
    </Form>
  );
};
