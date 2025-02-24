import TrendingUpSVG from '@icons/trending_up.svg';
import BankCardSVG from '@icons/bank_card.svg';
import styles from '../../payment-methods.module.scss';
import clsx from 'clsx';

export const FullPaymentTab = () => {
    return (
        <>
            <section className={styles.poster} style={{ backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("/content/payment-methods/full-payment-poster.jpeg")` }}>
                <h2 className={styles.title}>100% оплата</h2>
                <p className={styles.subtitle}>Практичный способ приобрести жилье без дополнительных переплат</p>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles['icon-wrapper']}>
                            <TrendingUpSVG />
                        </div>
                        <h3 className={styles['card-title']}>Оптимальное решение</h3>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['icon-wrapper']}>
                            <BankCardSVG />
                        </div>
                        <h3 className={styles['card-title']}>Без переплат</h3>
                    </div>
                </div>
            </section>
            <div className={styles['poster-meta']}>
                <p className={styles['poster-meta__title']}>Есть вопросы? Свяжитесь с нами!</p>
                <button className={clsx([styles['tab-button']])}>Получить консультацию</button>
            </div>

        </>
    );
};