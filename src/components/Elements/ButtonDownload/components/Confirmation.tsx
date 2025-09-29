import type { ReactNode } from 'react';
import ModalConfirmation from '@/components/Modal/Confirmation';

interface PropDataChild {
  textButtonCancel: string;
  textButtonSave: string;
  title: string;
  desc: string | ReactNode;
}

interface Props {
  isShow: boolean;
  data: PropDataChild;
  onCancel: () => void;
  onSave: () => Promise<void>;
}

const ButtonDownloadConfirmation = ({ isShow, data, onCancel, onSave }: Props): Readonly<ReactNode> => {
  return (
    <ModalConfirmation
      isShow={isShow}
      textButtonCancel={data.textButtonCancel}
      textButtonSave={data.textButtonSave}
      title={data.title}
      onCancel={onCancel}
      onClose={onCancel}
      onSave={onSave}
    >
      {data.desc}
    </ModalConfirmation>
  );
};

export default ButtonDownloadConfirmation;
