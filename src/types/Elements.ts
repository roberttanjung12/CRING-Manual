import type { ChipProps } from '@mui/material';

interface ElementChip<L = string> {
  id: string;
  label: L;
  color: ChipProps['color'];
}

export type { ElementChip };
