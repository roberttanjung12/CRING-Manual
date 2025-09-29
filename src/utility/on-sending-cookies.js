import moment from 'moment';

const onSendingCookies = {
  onSet: ({ module, id, limit = 15 }) => {
    const getCookies = localStorage.getItem(`CRING_SENDING`);
    const getCookiesJson = getCookies ? JSON.parse(getCookies) : [];
    const set = [];

    if (Array.isArray(getCookiesJson)) {
      getCookiesJson.forEach(item => {
        if (item.id !== id) set.push(item);
      });
    }

    set.push({ module, id, limit, createdAt: new Date() });

    localStorage.setItem(`CRING_SENDING`, JSON.stringify(set));
  },
  onCheck: ({ module, id }) => {
    const getCookies = localStorage.getItem(`CRING_SENDING`);
    const getCookiesJson = getCookies ? JSON.parse(getCookies) : [];
    let isExist = false;

    if (Array.isArray(getCookiesJson)) {
      const getCookie = getCookiesJson.find(find => find.module === module && find.id === id);

      if (getCookie?.id) {
        if (moment(new Date()).diff(getCookie.createdAt, 'minutes') <= getCookie.limit) {
          isExist = true;
        } else {
          const set = [];

          set.forEach(item => {
            if (item.id !== id) set.push(item);
          });

          localStorage.setItem(`CRING_SENDING`, JSON.stringify(set));
        }
      }
    }

    return isExist;
  },
  onGet: ({ module, id }) => {
    const getCookies = localStorage.getItem(`CRING_SENDING`);
    const getCookiesJson = getCookies ? JSON.parse(getCookies) : [];

    const data = {
      openedAt: new Date()
    };

    if (Array.isArray(getCookiesJson)) {
      const getData = getCookiesJson.find(find => find.module === module && find.id === id);

      if (getData?.id) {
        const currentDate = new Date(getData?.createdAt);
        const currentMinutes = currentDate.getMinutes();
        const newMinutes = currentMinutes + getData?.limit;

        currentDate.setMinutes(newMinutes);

        data.openedAt = currentDate;
      }
    }

    return data;
  }
};

export default onSendingCookies;
