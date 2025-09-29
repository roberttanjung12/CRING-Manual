interface Props {
  status: boolean;
  category: string;
}

interface Returns {
  isSuspect: boolean;
  category: string;
  title: string;
}

/**
 * A util that's used for set monitoring.
 *
 * @returns {Returns[]}
 */
const setMonitoring = (suspects: Props[]): Returns[] => {
  const titles = [
    { category: 'DTTOT', title: 'Daftar Terduga Teroris dan Organisasi Teroris' },
    { category: 'PPSPM', title: 'Pendanaan Proliferasi Senjata Pemusnah Massal' }
  ];
  const getMonitorings = suspects.filter(item => item.status);
  const set: Returns[] = [];

  if (getMonitorings.length) {
    getMonitorings.forEach(monitoring => {
      const getTitle = titles.find(item => item.category === monitoring.category)?.title ?? '';

      set.push({
        isSuspect: monitoring.status,
        category: monitoring.category,
        title: getTitle
      });
    });
  }

  return set;
};

export type { Props as SetMonitoringProps, Returns as SetMonitoringReturns };

export default setMonitoring;
