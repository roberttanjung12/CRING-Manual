import { useState, useEffect, type ReactNode } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonDownloadConfirmation from '../../Confirmation';

interface ItemReminderChild {
  textButtonCancel: string;
  textButtonSave: string;
  title: string;
  desc: string | ReactNode;
}

interface Item {
  label: string;
  onDownload: () => Promise<void>;
  reminder?: ItemReminderChild;
}

interface Props {
  id: string;
  data: Item;
  index: number;
  onSuccess: (arg: boolean) => void;
}

const ButtonDownloadMultiItem = ({ id, data, index, onSuccess }: Props): Readonly<ReactNode> => {
  // group: state
  const [isSend, setIsSend] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // group: action
  const onDownload = async (cb: () => Promise<void>) => {
    setIsShow(false);
    setIsSend(true);
    await cb();
    setIsSend(false);
    onSuccess(false);
  };

  const onClick = (cb: () => Promise<void>) => {
    if (!data?.reminder?.title) onDownload(cb);
    else setIsShow(true);
  };

  // group: mount
  useEffect(() => {
    return () => {
      setIsSend(false);
      setIsShow(false);
    };
  }, []);

  return (
    <>
      <ListItem sx={{ paddingTop: '0', paddingBottom: '0' }}>
        <ListItemButton
          component="a"
          data-testid={`${id}:plural:button-download--${index}`}
          id={`${id}:plural:button-download--${index}`}
          sx={{ color: ({ palette }) => palette.common.black }}
          onClick={() => onClick(data.onDownload)}
        >
          {isSend && (
            <ListItemIcon sx={{ minWidth: '0', marginRight: '10px' }}>
              <CircularProgress color="primary" size="14px" />
            </ListItemIcon>
          )}
          <ListItemText primary={data.label} />
        </ListItemButton>
      </ListItem>
      {data?.reminder?.title && (
        <ButtonDownloadConfirmation
          data={data.reminder}
          isShow={isShow}
          onCancel={() => setIsShow(false)}
          onSave={() => onDownload(data.onDownload)}
        />
      )}
    </>
  );
};

export default ButtonDownloadMultiItem;
