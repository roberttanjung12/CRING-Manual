import { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { string } from 'prop-types';
import { getValidAccessToken } from '@/utility/local-storage';

const useUser = ({ token = '' }) => {
  // group: data
  const [user, setUser] = useState({
    clientId: '',
    clientName: '',
    clientParentId: '',
    email: '',
    exp: 0,
    roleId: '',
    roleName: '',
    userId: '',
    username: ''
  });

  // group: action
  const onGetUser = useCallback(() => {
    const getToken = token || getValidAccessToken();
    const decodeToken = jwtDecode(getToken);

    if (decodeToken) {
      setUser(prevValue => {
        const copyValue = { ...prevValue };

        Object.keys(decodeToken).forEach(key => {
          copyValue[key] = decodeToken[key];
        });

        return copyValue;
      });
    }
  }, [token]);

  // group: watch
  useEffect(() => {
    onGetUser();
  }, [onGetUser]);

  return { user };
};

useUser.propTypes = {
  token: string
};

export default useUser;
