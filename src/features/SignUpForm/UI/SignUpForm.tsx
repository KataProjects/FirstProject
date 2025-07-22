import {  Form, Input, Select, Checkbox, Button } from 'antd'

type SecurityQuestions = {
  value: string,
  label: string
}
const securityQuestions: SecurityQuestions[] = [
  {
    value: 'name_first_pet',
    label: 'Как звали вашего первого питомца?'
  },
  {
    value: 'favorite_teacher_name',
    label: 'Имя вашего любимого преподавателя?'
  },
  {
    value: 'first_vacation_place',
    label: 'Где вы провели свой первый отпуск?'
  },
  {
    value: 'favorite_movie',
    label: 'Ваш любимый фильм?'
  }
]
export const SignUpForm: React.FC = () => {

  return (
    <Form  layout='vertical' initialValues={{securityQuestion: securityQuestions[0].label}}>
      <Form.Item label='Email' name='email' required={false} rules={[{required: true, message: 'Введите email'}, {type: 'email', message: 'Введите корректный email'}]}>
        <Input placeholder='Введите ваш email' />
      </Form.Item>
      <Form.Item label='Секретный вопрос' name='securityQuestion'>
        <Select>
          {securityQuestions.map((q) => {
            return (
              <Select.Option key={q.value} value={q.value}>{q.label}</Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label='Ответ на секрестный вопрос' name='password' required={false} rules={[{required: true, message: 'Введите пароль'}, {min: 6, message: 'Пароль должен состоять минимум из 6 символов'}]}>
        <Input placeholder='Введите ответ на секретный вопрос' />
      </Form.Item>
      <Form.Item label='Пароль' name='password' required={false} rules={[{required: true, message: 'Повторите пароль'}]}>
        <Input.Password placeholder='Придумайте пароль' />
      </Form.Item>
      <Form.Item label='Повторите пароль'>
        <Input.Password  placeholder='Повторите пароль'/>
      </Form.Item>
      <Form.Item>
        <Checkbox>Я прочитал(-а) все условия <a href='#'>пользовательского соглашения</a> и согласен(-на) с ними</Checkbox>
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
    </Form.Item>
    </Form>
  )
}