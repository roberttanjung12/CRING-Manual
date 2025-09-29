import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { string } from 'prop-types';
import ReactDOM from 'react-dom';

// group: icon

const ModalDocShow = ({ id, mimeType, url }) => {
  const [isShow, setIsShow] = useState(false);

  const onSetup = () => {
    setTimeout(() => {
      setIsShow(true);
    }, 500);
  };

  const onClose = () => {
    const getEl = document.getElementById(id);

    if (getEl) getEl.remove();
  };

  const onCheckType = data => {
    let set = '';

    if (data) {
      const type = data.substring(0, data.lastIndexOf('/'));

      if (type) {
        if (type === 'image') set = 'image';
        else if (type === 'video') set = 'video';
        else if (type === 'application') set = 'application';
      }
    }

    return set;
  };

  // group: watch
  useEffect(() => {
    onSetup();
  }, []);

  return (
    <Box className="modal--doc-show" data-testid="DocShow-img">
      <Box className="modal--doc-show-close">
        <IconButton color="secondary" title="Tutup" onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box className="modal--doc-show-inner">
        {isShow && <div>{onCheckType(mimeType) === 'image' && <img alt="Document" src={url} />}</div>}
      </Box>
    </Box>
  );
};

const onDocShow = ({ mimeType, url }) => {
  const getElement = document.getElementById('adding-element');

  if (getElement) {
    const uniq = `id${new Date().getTime()}`;
    const create = document.createElement('div');

    create.setAttribute('id', uniq);
    getElement.appendChild(create);

    const box = <ModalDocShow key={`${uniq}--key`} id={uniq} mimeType={mimeType} url={url} />;
    const container = React.createElement('div', {}, [box]);

    ReactDOM.render(container, document.getElementById(uniq));
  }
};

ModalDocShow.propTypes = {
  id: string.isRequired,
  mimeType: string.isRequired,
  url: string.isRequired
};

export default onDocShow;
