import type { Metadata } from 'next'
import { Main } from './main'
import { RootStyleRegistry } from '@src/components/RootStyleRegistry/RootStyleRegistry'
import Widget from '@shared/page/widget/Widget'
import { Jivo } from '@shared/jivo/jivo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kronfort.labab.ru'

export const metadata: Metadata = {
  title: 'Кронфорт',
  description: 'Кронфорт',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover'></meta>
        <meta name='yandex-verification' content='999c936ac92f008e' />
        <link rel='shortcut icon' href='/favicon.svg' />
        {/* Preconnect to GTM domains */}
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://www.google-analytics.com' />

        {/* Предзагрузка изображения для оптимизации LCP */}
        <link rel='preload' href='/map/compass-loader.svg' as='image' type='image/svg+xml' />
        <script type='text/javascript' async src='//smartcallback.ru/api/SmartCallBack.js?t=zc2ZQ6WuzUWcsEZCNMpY' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _tmr = window._tmr || (window._tmr = []);
              _tmr.push({id: "3523372", type: "pageView", start: (new Date()).getTime()});
              (function(d, w, id) {
                if (d.getElementById(id)) return;
                var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                ts.src = "https://top-fwz1.mail.ru/js/code.js";
                var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
              })(document, window, "tmr-code");
            `
          }}
        />
      </head>
      <body>
        {/* Ваш основной контент */}
        <RootStyleRegistry>
          <Main>{children}</Main>
          <Widget color='korichneviy' style={{zIndex: 3}} />
          {/* <Jivo /> */}
        </RootStyleRegistry>

        {/* Вставка скриптов здесь */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.onload = function() {
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.defer=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-K4XQSDX');

        (function(w, d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};
        if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;
        if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}
        function p(cId){var a=d.getElementsByTagName("script")[0],
        s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)};
        s.type="text/javascript";s.async=true;s.src="https://mod.calltouch.ru/init.js?id="+cId;
        if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}
        })(window,document,"ct","bh8by9g8");
      }
    `
          }}
        />
      </body>
    </html>
  )
}
