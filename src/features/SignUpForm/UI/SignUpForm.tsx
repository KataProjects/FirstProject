import { Button, Checkbox, Form, Input, Select } from 'antd';

import { securityQuestions } from '../model/constants';
import styles from './SignUpForm.module.scss';

export const SignUpForm: React.FC = () => {
  return (
    <Form
      layout="vertical"
      initialValues={{ securityQuestion: securityQuestions[0].label }}
      className={styles['signup-form']}
    >
      <Form.Item
        label="Email"
        name="email"
        required={false}
        rules={[
          { required: true, message: 'Введите email' },
          { type: 'email', message: 'Введите корректный email' },
        ]}
        className={styles['signup-form__input-label']}
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
        name="password"
        required={false}
        rules={[
          { required: true, message: 'Введите пароль' },
          { min: 6, message: 'Пароль должен состоять минимум из 6 символов' },
        ]}
      >
        <Input placeholder="Введите ответ на секретный вопрос" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        required={false}
        rules={[{ required: true, message: 'Повторите пароль' }]}
      >
        <Input.Password placeholder="Придумайте пароль" />
      </Form.Item>
      <Form.Item label="Повторите пароль">
        <Input.Password placeholder="Повторите пароль" />
      </Form.Item>
      <Form.Item>
        <Checkbox>
          Я прочитал(-а) все условия <a href="#">пользовательского соглашения</a> и согласен(-на) с
          ними
        </Checkbox>
      </Form.Item>
      <Form.Item label={null} className={styles['signup-form__submit']}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
