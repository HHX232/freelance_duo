import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);

  // Проверка, если уже на странице "/planirovki-i-ceny", чтобы избежать зацикливания
  if (pathname === '/planirovki-i-ceny') {
    const selectedParams = searchParams.get('selectedParams');

    // Проверяем, есть ли selectedParams
    if (selectedParams) {
      const transformedParams = transformParams(selectedParams);

      // Редирект только для указанных параметров в switch
      if (transformedParams) {
        // Если это 'lofty', редиректим без префикса 'kvartiry-s'
        const newUrl = transformedParams === 'lofty'
          ? `/${transformedParams}`
          : `/kvartiry-s-${transformedParams}`;

        // Проверка, чтобы избежать зацикливания редиректа
        if (pathname !== newUrl) {
          return NextResponse.redirect(new URL(newUrl, request.url));
        }
      }
    }
  }

  return NextResponse.next();
}

function transformParams(params: string): string | null {
  let formatedParams: string | null = null;

  switch (params) {
    case 'терраса': {
      formatedParams = "terrasoi";
      break;
    }
    case 'раздельный су': {
      formatedParams = "razdelnym-su";
      break;
    }
    case 'с балконом': {
      formatedParams = "balkonom";
      break;
    }
    case 'кладовая': {
      formatedParams = "kladovoi";
      break;
    }
    case 'лоджия': {
      formatedParams = "lodzhiei";
      break;
    }
    case 'гардеробная в спальне': {
      formatedParams = "garderobnoi";
      break;
    }
    case 'лофт': {
      formatedParams = "lofty"; // Для лофт возвращаем без "kvartiry-s"
      break;
    }
    default: {
      formatedParams = null; // Если параметр не совпал с указанными в switch, возвращаем null
    }
  }

  // Возвращаем отформатированный параметр или null, если не нашлось совпадений
  return formatedParams ? formatedParams.replace(/\+/g, '-').toLowerCase() : null;
}
