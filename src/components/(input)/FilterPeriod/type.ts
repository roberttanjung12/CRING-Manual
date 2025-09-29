import type { UseFilterOnFilterGo } from '@/hooks/useFilter';

interface FilterPeriodProps extends UseFilterOnFilterGo {
  label?: string;
  params?: { [key: string]: any };
  defaultStart?: Date;
  defaultEnd?: Date;
}

export type { FilterPeriodProps };
