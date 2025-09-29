import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

interface Returns {
  onPage: (arg?: () => void) => void;
}

/**
 * A hook custom that's used for managin page.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {Returns}
 */
const useHelper = (): Readonly<Returns> => {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { push } = useRouter();

  const onPage = useCallback(
    (cb?: () => void) => {
      const getParamHelper = searchParams.get('helper');

      if (getParamHelper) {
        const getParams = qs.parse(searchParams.toString());

        localStorage.setItem('HELPER', getParamHelper);

        delete getParams.helper;

        push(`${pathname}?${qs.stringify(getParams)}`);
      } else if (typeof cb === 'function') cb();
    },
    [pathname, push, searchParams]
  );

  return { onPage };
};

export default useHelper;
