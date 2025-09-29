'use client';

import { useCallback, useState } from 'react';
import isEmpty from 'is-empty';
import moment from 'moment';
import { onMaskDetailData } from '@/services/manage-merchant';
import { getLocalStorage, getValidAccessToken, removeLocalStorage, setAuthUserData } from '@/utility/local-storage';

const useBlockerProviderData = () => {
  const [isLocked, setIsLocked] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [next, setNext] = useState(() => () => {});

  const onOpen = useCallback(
    cb => {
      if (isLocked) {
        setIsOpen(true);

        if (typeof cb === 'function') setNext(() => cb);
      } else if (typeof cb === 'function') cb();
    },
    [isLocked]
  );

  const onClose = cb => {
    setIsOpen(false);
    setNext(() => () => {});

    if (typeof cb === 'function') cb();
  };

  const onCloseMask = useCallback(async cb => {
    const getBlocker = getLocalStorage('CRING_BLOCKER');
    const accessToken = getValidAccessToken();

    if (!isEmpty(getBlocker) && !isEmpty(accessToken)) {
      const { data } = await onMaskDetailData(true, { accessToken }, { isHidePopupError: true });

      if (data?.data) {
        const authData = {
          authUserAccessToken: data.data.accessToken,
          authUserRefreshToken: '',
          authUserLoginAt: moment().format(),
          authUserExpiresIn: moment()
            .add(data.data.expiresIn || 3600, 'seconds')
            .format()
        };

        setAuthUserData(authData);

        removeLocalStorage('CRING_BLOCKER');
        setIsLocked(true);
        if (typeof cb === 'function') cb();
      }
    }
  }, []);

  const onCheck = useCallback(() => {
    const getBlocker = getLocalStorage('CRING_BLOCKER');

    if (!isEmpty(getBlocker)) {
      const dateCurrent = moment(new Date()).format();
      const dateExp = moment(getBlocker).format();
      const cooldown = moment(dateExp).diff(dateCurrent, 'milliseconds');

      if (cooldown > 0) {
        setIsLocked(false);

        setTimeout(() => {
          onCloseMask();
        }, cooldown);
      } else onCloseMask();
    }
  }, [onCloseMask]);

  const onSuccess = () => {
    onCheck();

    onClose();

    setIsLocked(false);

    next();
  };

  return {
    isLocked,
    isOpen,
    onOpen,
    onClose,
    onCloseMask,
    onSuccess,
    onCheck
  };
};

export default useBlockerProviderData;
