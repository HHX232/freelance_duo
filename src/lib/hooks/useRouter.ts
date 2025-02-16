import { useRouter as useNextRouter } from 'next/navigation';

const useRouterNext = () => {
  const { replace: nextReplace, ...rest } = useNextRouter();

  const customReplace = ({
                           pathname,
                           query,
                         }: {
    pathname: string;
    query: Record<string, any>;
  }) => {
    let url = pathname;

    if (Object.keys(query).length > 0) {
      const generateQuery = new URLSearchParams(query).toString();
      url = `${pathname}?${generateQuery}`;
    }

    console.log(`Navigating to: ${url}`); // Отладочное сообщение

    nextReplace(url);
  };


  return { ...rest, replace: customReplace };
};

export default useRouterNext;
