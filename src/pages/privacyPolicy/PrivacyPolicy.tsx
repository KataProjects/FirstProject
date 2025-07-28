import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Alert, Button, Divider } from 'antd';

import styles from './PrivacyPolicy.module.scss';

export const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🐱‍👤 Супер-Серьёзная Политика Конфиденциальности 🐾</h1>
        <p>
          <i>«Мы знаем, что вы всё равно не читаете такие тексты, но нам надо их написать»</i>
        </p>
      </div>

      <Alert
        type="warning"
        message="Внимание!"
        description="Если вы прочитаете этот документ до конца, вам полагается виртуальное печенье 🍪"
        showIcon
        className="mb-6"
      />

      <div className={styles.section}>
        <h2>1. Какие данные мы собираем?</h2>
        <p>Всё. Абсолютно всё.</p>
        <ul>
          <li>Ваше имя, фамилия, девичья фамилия бабушки и кличка первой собаки.</li>
          <li>Ваши фотографии из детсада (да, даже те, где вы в костюме зайчика).</li>
          <li>Сколько раз в день вы проверяете соцсети (мы знаем, что это 237 раз).</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>2. Как мы используем ваши данные?</h2>
        <p>Никак. Ну ладно, иногда:</p>
        <ul>
          <li>Продаём рекламодателям (шутка!.. или нет?).</li>
          <li>Показываем котиков, которые вам точно понравятся.</li>
          <li>
            Подбираем мемы по вашему настроению <SmileOutlined /> <MehOutlined /> <FrownOutlined />.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>3. Куки (не те, что вкусные)</h2>
        <p>Мы используем куки, но не для выпечки, а чтобы:</p>
        <ul>
          <li>Запомнить, что вы любите ананасы на пицце (мы вас осуждаем).</li>
          <li>Не показывать вам рекламу зубных щёток, если у вас их уже 15.</li>
        </ul>
      </div>

      <Divider>Важная кнопка</Divider>
      <div className="text-center">
        <Button type="primary" size="large" icon={<SmileOutlined />}>
          Я согласен(на), но всё равно не читал(а)
        </Button>
      </div>

      <div className={styles.footer}>
        <p>© 2023 «Компания, которая точно не шпионит за вами» (шутка)</p>
      </div>
    </div>
  );
};
