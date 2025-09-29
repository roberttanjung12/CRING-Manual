import type { ReactElement, CSSProperties, MouseEvent } from 'react';
import { Button, type SxProps, type ButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InfoIcon from '@mui/icons-material/Info';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

interface ButtonSubmitProps extends Omit<ButtonProps, 'startIcon'> {
  id?: string;
  isHideIcon?: boolean;
  isIconPlane?: boolean;
  isFail?: boolean;
  isSend?: boolean;
  disabled?: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: CSSProperties;
  sx?: SxProps;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  label?: string;
  icon?: ReactElement;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

const ButtonSubmit = ({
  id = 'form-button',
  isHideIcon = true,
  isIconPlane = false,
  isFail = false,
  isSend = false,
  disabled = false,
  color = 'secondary',
  fullWidth = false,
  size = 'medium',
  style = {},
  sx = {},
  type = 'submit',
  variant = 'contained',
  label,
  icon,
  onClick,
  startIcon,
  endIcon,
  ...rest
}: ButtonSubmitProps) => {
  return (
    <Button
      color={!isFail ? color : 'secondary'}
      disabled={isSend || disabled}
      fullWidth={fullWidth}
      id={id || 'form-button'}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      style={style}
      sx={sx}
      type={type || 'submit'}
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {isFail && !isHideIcon ? <InfoIcon fontSize="small" style={{ marginRight: '10px' }} /> : null}
      {isIconPlane && <SendOutlinedIcon fontSize="small" style={{ marginRight: '10px' }} />}
      {icon && <span>{icon}</span>}
      {isSend ? <CircularProgress size="20px" /> : <span>{label}</span>}
    </Button>
  );
};

export default ButtonSubmit;
