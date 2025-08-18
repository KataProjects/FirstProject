import { Input, DatePicker, InputNumber, Radio, Checkbox, Button } from 'antd';
import styles from './TicketSearchForm.module.scss';
import HomePageSearch from '../../../assets/HomePageSearch.svg';

export const TicketSearchForm = () => {
  return (
    <section className="py-8">
      {/* Голубой бокс с закругленными углами */}
      
       <img src={HomePageSearch} alt="iconHomePage" className="mx-auto"/>
      <div className={styles.wrapper}>
        {/* Центрированная белая карточка */}
        <div className={styles.card}>
          <header className="flex items-center gap-3 mb-6">
            <h2 className="text-[#445EBD] font-semibold" style={{ fontSize: 32 }}>
              Найти билеты
            </h2>
          </header>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {/* Левая часть */}
            <div className={styles.left}>
              <div className={styles.row3}>
                <div className={styles.col}>
                  <label className={styles.label}>Откуда</label>
                  <Input className="w-[275px] h-[48px]" placeholder="Город откуда" />
                  <button type="button" aria-label="Поменять местами">⇄</button>
                </div>

                <div className={styles.col}>
                  <label className={styles.label}>Количество пассажиров</label>
                  <InputNumber className="w-[275px] h-[48px]" min={1} max={9} placeholder="Количество пассажиров" />
                </div>

                <div className={styles.col}>
                  <label className={styles.label}>Дата</label>
                  <DatePicker className="w-[275px] h-[48px]" placeholder="Дата поездки" />
                </div>
              </div>
              <div className={styles.col}>
                  <label className={styles.label}>Куда</label>
                  <Input className="w-[275px] h-[48px]" placeholder="Город куда" />
                </div>
              <div className={styles.row1}>
                <Checkbox style={{fontSize: '16px'}}>Искать билеты без пересадок</Checkbox>
              </div>
            </div>

            {/* Правая колонка: радио + кнопка */}
            <div className={styles.right}>
              <Radio.Group style={{fontSize: '16px'}} defaultValue="round">
                <div className="flex flex-col">
                  <Radio value="round" style={{fontSize: '16px', marginTop: '20px'}}>Туда и обратно</Radio>
                  <Radio value="oneway" style={{fontSize: '16px', marginTop: '20px'}}>В одну сторону</Radio>
                </div>
              </Radio.Group>

              <Button type="primary" size="large" htmlType="submit" className="mt-4 h-[48px] w-[127px]">
                Найти
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
