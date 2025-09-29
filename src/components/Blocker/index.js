import { Dialog, DialogContent, Typography } from '@mui/material';
import { bool, func, string } from 'prop-types';
import BlockerButtons from './components/Buttons';
import BlockerFields from './components/Fields';
import useBlockerForm from './hooks/useForm';

/**
 * A modal dialog component that prompts the user to enter a password to access protected data.
 *
 * @component
 * @param {Object} props - The component props
 * @param {boolean} [props.isShow=false] - Controls whether the dialog is visible
 * @param {string} [props.text='Masukkan password untuk melihat data credentials.'] - The descriptive text shown to the user
 * @param {string} [props.textButtonCancel='Batal'] - Text for the cancel button
 * @param {string} [props.textButtonSave='Lihat Data'] - Text for the submit button
 * @param {Function} props.onCancel - Callback function when user cancels the action
 * @param {Function} props.onSuccess - Callback function when password is successfully validated
 * @param {Function} props.onClose - Callback function when dialog is closed
 *
 * @returns {React.JSX} A Material-UI Dialog component with password input form
 */
const Blocker = ({
  isShow = false,
  text = 'Masukkan password untuk melihat data credentials.',
  textButtonCancel = 'Batal',
  textButtonSave = 'Lihat Data',
  onCancel,
  onSuccess,
  onClose
}) => {
  const { isLoading, errors, register, reset, clearErrors, handleSubmit, onSubmit } = useBlockerForm({ onSuccess });

  const onCloseSelf = () => {
    reset();
    clearErrors();
    onClose();
  };

  const onCancelSelf = () => {
    reset();
    clearErrors();
    onCancel();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={isShow} onClose={onCloseSelf}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            component="h3"
            sx={{ textAlign: 'center', fontSize: '20px', color: ({ palette }) => palette.grey.A100, fontWeight: 700 }}
          >
            Masukkan Password
          </Typography>
          <Typography sx={{ mt: 6, textAlign: 'center', color: ({ palette }) => palette.grey[100] }}>{text}</Typography>
          <BlockerFields errors={errors} register={register} />
          <BlockerButtons
            errors={errors}
            isLoading={isLoading}
            textButtonCancel={textButtonCancel}
            textButtonSave={textButtonSave}
            onCancel={onCancelSelf}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

Blocker.propTypes = {
  isShow: bool,
  text: string,
  textButtonCancel: string,
  textButtonSave: string,
  onCancel: func,
  onSuccess: func,
  onClose: func
};

export default Blocker;
