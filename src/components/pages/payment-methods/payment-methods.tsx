'use client';
import { Title } from "@shared/title/title";
import styles from './payment-methods.module.scss';
import clsx from "clsx";

import MakeTicket from "./components/MakeTicket/MakeTicket";
import { useState } from "react";
import { ZeroPercentTab } from "./components/zero-percent/zero-percent";
import { FullPaymentTab } from "./components/full-payment/full-payment";
import { IpotekaTab } from "./components/ipoteka/ipoteka";

const PaymentMethodsPage = () => {
    const [active, setActive] = useState(0);
    const breadcrumbItems = [
        { title: 'Главная', href: '/map' },
        {
            title: 'Способы покупки',
            href: '/payment-methods'
        }
    ]

    return (
        <main className={styles['payment-methods']}>
            <Title breadcrumbs={breadcrumbItems} style={{ position: 'relative', margin: 0 }} />

            <h1 className={styles.title}>Способы покупки</h1>
            <div className={styles.tabs}>
                <button className={clsx([styles['tab-button']], { [styles.active]: active === 0 })} onClick={() => setActive(0)}>Рассрочка</button>
                <button className={clsx([styles['tab-button']], { [styles.active]: active === 1 })} onClick={() => setActive(1)}>Ипотека</button>
                <button className={clsx([styles['tab-button']], { [styles.active]: active === 2 })} onClick={() => setActive(2)}>100% оплата</button>
            </div>

            {active === 0 && <ZeroPercentTab />}
            {active === 1 && <IpotekaTab />}
            {active === 2 && <FullPaymentTab />}
            <MakeTicket />
        </main>
    );
};

export default PaymentMethodsPage;