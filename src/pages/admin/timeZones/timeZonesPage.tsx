
import { useState } from 'react';

import { mockTimezones } from './mock';
import type { Timezone } from './mock';
import styles from './timeZonesPage.module.scss';

export const TimeZonesPage = () => {
  const [data] = useState<Timezone[]>(mockTimezones);
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Часовые пояса</h1>
        <button className={styles.button}>Добавить часовой пояс</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Страна</th>
            <th>Город</th>
            <th>Среднее время по Гринвичу (GMT)</th>
            <th>Зимнее время по Гринвичу (GMT)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tz, index) => (
            <tr key={tz.id}>
              <td>{index + 1}</td>
              <td>{tz.country}</td>
              <td>{tz.city}</td>
              <td>{tz.utc}</td>
              <td>⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
