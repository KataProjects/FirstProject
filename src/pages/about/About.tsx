import { RocketOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Divider, Row, Space } from 'antd';

import styles from './About.module.scss';

export const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>👽 Air Alien — Летаем как пришельцы!</h1>
        <p>
          <i>«Если наш пилот не инопланетянин — вам вернут мильоны!»</i>
        </p>
      </div>

      <Alert
        type="success"
        message="Важно!"
        description="Мы не гарантируем, что вы прилетите вовремя, но обещаем, что это будет незабываемо!"
        showIcon
        className="mb-6"
      />

      <div className={styles.section}>
        <h2>
          <RocketOutlined /> Кто мы?
        </h2>
        <p>
          Мы — Air Alien, первая межгалактическая авиакомпания, которая доставляет вас из точки А в
          точку Б, а иногда и в точку 🪐. Наши самолёты работают на антигравитации, а стюардессы
          умеют телепортировать арахис.
        </p>
        <ul>
          <li>Основаны в 3021 году (или вчера, мы сами не помним).</li>
          <li>Наш главный офис — где-то между Марсом и Юпитером.</li>
          <li>Наши клиенты — люди, котики и один очень наглый хомяк.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>
          <StarOutlined /> Наши преимущества
        </h2>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className={styles.teamCard}>
              <h3>Быстрее света</h3>
              <p>Ну почти. Если опоздаем — дадим печеньку.</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className={styles.teamCard}>
              <h3>Еда из будущего</h3>
              <p>Наши сэндвичи могут самособраться. Или исчезнуть.</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className={styles.teamCard}>
              <h3>Багаж не теряется</h3>
              <p>Он просто улетает в параллельную вселенную. Бесплатно!</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className={styles.teamCard}>
              <h3>Wi-Fi на высоте</h3>
              <p>Ловим сигнал прямиком из нейтронной звезды.</p>
            </Card>
          </Col>
        </Row>
      </div>

      <div className={styles.section}>
        <h2>
          <UserOutlined /> Наша команда
        </h2>
        <p>У нас работают только лучшие из лучших (или просто те, кто согласился). Знакомьтесь:</p>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.teamCard}>
              <h3>Главный пилот: Зорг</h3>
              <p>У него 4 руки, 3 глаза и 0 прав на вождение.</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.teamCard}>
              <h3>Бортпроводник: Глюк</h3>
              <p>Умеет исчезать, когда просят кофе.</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.teamCard}>
              <h3>Техподдержка: Робот Боб</h3>
              <p>Отвечает только фразой: «Перезагрузите вселенную».</p>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider style={{ borderColor: '#00FF00', color: 'white' }}>Готовы лететь с нами?</Divider>
      <Space direction="vertical" className="w-full text-center">
        <div className={styles.teamCard}>
          <p>
            <i>P.S. Мы не несём ответственности, если вас похитят марсиане.</i>
          </p>
          <p>© 3023 Air Alien — «Летаем туда, куда другие боятся смотреть»</p>
        </div>
      </Space>
    </div>
  );
};
