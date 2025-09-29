import type { ChipProps } from '@mui/material';

interface VarUserStatus {
  id: string;
  status: boolean;
  statusVerif: number;
  can: Array<'delete' | 'edit' | 'activation' | 'reset'>;
  transTo: boolean;
  label: string;
  labelActive: string;
  labelInactive: string;
  color: ChipProps['color'];
}

const varUserStatus: VarUserStatus[] = [
  {
    id: 'belum verifikasi',
    status: false,
    statusVerif: 1,
    can: ['delete', 'activation'],
    transTo: true,
    label: 'Belum Verifikasi',
    labelActive: 'Belum Aktivasi',
    labelInactive: 'Tidak Aktif',
    color: 'primary'
  },
  {
    id: 'aktif',
    status: true,
    statusVerif: 2,
    can: ['delete', 'edit', 'reset'],
    transTo: true,
    label: 'Aktif',
    labelActive: 'Aktif',
    labelInactive: 'Tidak Aktif',
    color: 'success'
  },
  {
    id: 'aktivasi kadaluarsa',
    status: false,
    statusVerif: 3,
    can: ['delete', 'activation'],
    transTo: true,
    label: 'Aktivasi Kadaluwarsa',
    labelActive: 'Aktivasi Kadaluwarsa',
    labelInactive: 'Tidak Aktif',
    color: 'secondary'
  },
  {
    id: 'tidak aktif',
    status: true,
    statusVerif: 0,
    can: ['delete', 'edit'],
    transTo: false,
    label: 'Tidak Aktif',
    labelActive: 'Aktif',
    labelInactive: 'Tidak Aktif',
    color: 'default'
  },
  {
    id: 'dorman',
    status: true,
    statusVerif: 3,
    can: ['delete'],
    transTo: true,
    label: 'Dorman',
    labelActive: 'Dorman',
    labelInactive: 'Tidak Aktif',
    color: 'warning'
  }
];

export type { VarUserStatus };

export default varUserStatus;
