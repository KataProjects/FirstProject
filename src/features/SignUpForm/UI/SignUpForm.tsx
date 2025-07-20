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
    <Form  layout='vertical'>
      <Form.Item label='Email'>
        <Input placeholder='Введите ваш email' />
      </Form.Item>
      <Form.Item label='Секретный вопрос'>
        <Select>
          {securityQuestions.map((q) => {
            return (
              <Select.Option key={q.value} value={q.value}>{q.label}</Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label='Ответ на секрестный вопрос'>
        <Input placeholder='Введите ответ на секретный вопрос' />
      </Form.Item>
      <Form.Item label='Пароль'>
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