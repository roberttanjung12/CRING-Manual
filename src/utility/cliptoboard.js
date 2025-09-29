import jungAlert from './jung-alert';

const onCopyClipboard = text => {
  navigator.clipboard.writeText(text);
  jungAlert({ type: 'success', text: 'Telah disalin' });
};

export default onCopyClipboard;
