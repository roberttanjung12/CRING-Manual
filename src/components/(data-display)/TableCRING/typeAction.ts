import type { SvgIconComponent } from '@mui/icons-material';

interface TableCRINGActionProps {
  label: string;
  icon?: SvgIconComponent;
  href?: (args: Record<string, any>) => string;
  onClick?: (args: Record<string, any>) => void | Promise<void>;
}

export type { TableCRINGActionProps };
