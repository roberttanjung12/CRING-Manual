import { useState } from 'react';
import { Box, Button, CircularProgress, Typography, ClickAwayListener } from '@mui/material';
import { bool, func, node, object, shape, string } from 'prop-types';

const ModalReminderTooltip = ({
  id = '',
  children,
  isShow = false,
  title = 'Apakah anda yakin?',
  text = 'Data yang terhapus tidak bisa dikembalikan lagi.',
  buttonCancel = {},
  buttonSave = {},
  onClose = () => null,
  onSave = () => null
}) => {
  // group: data
  const [isSend, setIsSend] = useState(false);

  const [styleButtonCancel] = useState({
    label: 'Batal',
    color: 'secondary',
    variant: 'outlined',
    sx: { minWidth: '0' },
    ...buttonCancel
  });

  const [styleButtonSave] = useState({
    label: 'Ya, Hapus',
    color: 'primary',
    variant: 'contained',
    sx: { minWidth: '0' },
    ...buttonSave
  });

  // group: action
  const onModalCancel = () => {
    if (!isSend) onClose(false);
  };

  const onModalSave = async () => {
    setIsSend(true);

    await onSave();

    setIsSend(false);
  };

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={onModalCancel}>
      <Box sx={{ position: 'relative' }}>
        <Box>{children}</Box>
        {isShow && (
          <Box
            id={`reminder-tooltip:${id}`}
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              width: '225px',
              p: 4,
              mb: 6,
              marginLeft: '-112.5px',
              zIndex: 10,
              background: theme => theme.palette.background.paper,
              borderRadius: '5px',
              boxShadow: '0 0 2px #888',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: '100%',
                left: '50%',
                width: '15px',
                height: '15px',
                marginTop: '2px',
                marginLeft: '-7.5px',
                borderColor: theme => theme.palette.background.paper,
                borderRadius: '100%',
                boxShadow: '0 0 3px #888'
              }
            }}
          >
            <Typography
              component="h4"
              sx={{ fontSize: '12px !important', color: theme => theme.palette.grey.A100, fontWeight: '700' }}
              variant="h4"
            >
              {title}
            </Typography>
            <Typography
              component="h5"
              sx={{ mt: 2, fontSize: '11px !important', color: theme => theme.palette.grey[100], fontWeight: '400' }}
              variant="h5"
            >
              {text}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', columnGap: 2, mt: 4 }}>
              <Button
                color={styleButtonCancel.color}
                disabled={isSend}
                size="small"
                sx={styleButtonCancel.sx}
                variant={styleButtonCancel.variant}
                onClick={() => onClose(false)}
              >
                {styleButtonCancel.label}
              </Button>
              <Button
                color={styleButtonSave.color}
                disabled={isSend}
                size="small"
                sx={styleButtonSave.sx}
                variant={styleButtonSave.variant}
                onClick={onModalSave}
              >
                {isSend && <CircularProgress size="14px" sx={{ mr: 2 }} />}
                {styleButtonSave.label}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

ModalReminderTooltip.propTypes = {
  id: string,
  children: node,
  isShow: bool,
  title: string,
  text: string,
  buttonCancel: shape({
    label: string,
    color: string,
    variant: string,
    sx: object
  }),
  buttonSave: shape({
    label: string,
    color: string,
    variant: string,
    sx: object
  }),
  onClose: func,
  onSave: func
};

export default ModalReminderTooltip;
