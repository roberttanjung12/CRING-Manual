import React, { useState, useEffect, useCallback } from 'react';
import MuiAlert from '@mui/material/Alert';
import { string } from 'prop-types';
import { createRoot } from 'react-dom/client';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} elevation={6} {...props} />;
});

const CustomizedSnackbars = ({ id, status, msg }) => {
  // group: state
  const [autoClose, setAutoClose] = useState(null);
  const [timeStart] = useState(Date.now());
  const [timeDelay, setTimeDelay] = useState(5000);

  // group: action
  const onClose = useCallback(() => {
    const getEl = document.getElementById(id);

    if (getEl) getEl.remove();
  }, [id]);

  const onAutoClose = useCallback(() => {
    setAutoClose(
      setTimeout(() => {
        onClose();
      }, timeDelay)
    );
  }, [onClose, timeDelay]);

  const onHover = () => {
    clearTimeout(autoClose);
    setTimeDelay(timeDelay - (Date.now() - timeStart));
  };

  // group: watch
  useEffect(() => {
    onAutoClose();
  }, [onAutoClose]);

  return (
    <div
      style={{ marginBottom: '15px' }}
      onMouseEnter={onHover}
      onMouseLeave={onAutoClose}
      role="button"
      tabIndex={0}
      onFocus={onHover}
      onBlur={onAutoClose}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <Alert severity={status} sx={{ width: '100%' }} onClose={onClose}>
        {msg}
      </Alert>
    </div>
  );
};

const jungAlert = params => {
  const getSnackWrap = document.getElementById('adding-element');

  if (getSnackWrap) {
    const uniq = `id${new Date().getTime()}`;
    const create = document.createElement('div');

    create.setAttribute('id', uniq);
    getSnackWrap.appendChild(create);

    const box = <CustomizedSnackbars key={params.text} id={uniq} msg={params.text} status={params.type} />;
    const container = React.createElement('div', {}, [box]);

    const root = createRoot(document.getElementById(uniq));

    root.render(container);
  }
};

CustomizedSnackbars.propTypes = {
  id: string.isRequired,
  status: string.isRequired,
  msg: string.isRequired
};

export default jungAlert;
