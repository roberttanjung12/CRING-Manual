import type { ChipProps } from '@mui/material';

interface TrackingRow {
  date: string;
  desc: string;
  time: string;
  title: string;
}

interface TrackingRowUnique extends TrackingRow {
  unique: string;
}

interface TrackingProps {
  statusLabel: string;
  statusColor: ChipProps['color'];
  list: TrackingRowUnique[];
}

export type { TrackingRow, TrackingRowUnique, TrackingProps };
