import { HomeOutlined, MailOutlined, PhoneOutlined, SkypeOutlined } from '@ant-design/icons';
import { Alert, Card } from 'antd';

import styles from './Contact.module.scss';

export const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📞 Контакты (или как нас достать)</h1>
        <p>
          <i>«Если не ответим — мы просто в танчики играем, перезвоните позже»</i>
        </p>
      </div>

      <Alert
        type="info"
        message="Важно!"
        description="Перед звонком приготовьте: 1) терпение, 2) печеньки, 3) список вопросов (но мы всё равно ответим не на все)"
        showIcon
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={styles.contactCard}>
          <h2>
            <PhoneOutlined /> Телефон
          </h2>
          <p>+7 (800) ДО-НАС-НЕ-ДОЗВОНИШЬСЯ</p>
          <p>
            <i>Горячая линия: работает только в холодные дни</i>
          </p>
        </Card>

        <Card className={styles.contactCard}>
          <h2>
            <MailOutlined /> Почта
          </h2>
          <p>support@super-serious-company.fake</p>
          <p>
            <i>Отвечаем в течение 3-5 рабочих веков</i>
          </p>
        </Card>

        <Card className={styles.contactCard}>
          <h2>
            <SkypeOutlined /> Онлайн-чат
          </h2>
          <p>Лучший способ связаться, если вы любите:</p>
          <ul>
            <li>Ждать ответа 5 часов</li>
            <li>Получать шаблонные сообщения</li>
            <li>Общаться с ботом по имени «Анатолий»</li>
          </ul>
        </Card>

        <Card className={styles.contactCard}>
          <h2>
            <HomeOutlined /> Офис
          </h2>
          <p>Адрес: г. Москва, ул. Пушкина, д. Колотушкина</p>
          <p>
            <i>Вход только с паролем: «Мне нужен кофе»</i>
          </p>
          <div className={styles.mapPlaceholder}>
            🗺️ Карта загружается... или нет. <br />
            (Просто представьте, что тут карта)
          </div>
        </Card>
      </div>
    </div>
  );
};
