import { useState, type ReactNode } from 'react';
import { Button, CircularProgress } from '@mui/material';
import onAddTnC from '../../services/addTnC';
import type { TnCIsService, TnCOnAgree, TnCToken } from '../../type';

interface Props extends TnCIsService, TnCToken, TnCOnAgree {
  /**
   * Status of enable the button.
   * @type {boolean}
   */
  isEnabled: boolean;
}

/**
 * A button that's designed for agreeing the Terms and Conditional.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const TnCButtonAgree = ({ isEnabled, isService, token, onAgree }: Props): Readonly<ReactNode> => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSave = async () => {
    if (!isService) {
      onAgree();

      return;
    }

    setIsSubmitting(true);

    await onAddTnC({ tncStatus: true }, token);

    setIsSubmitting(false);

    onAgree();
  };

  return (
    <>
      {!isSubmitting ? (
        <Button
          disabled={!isEnabled}
          color="primary"
          variant="contained"
          sx={{ minWidth: { xs: 0, lg: 340 } }}
          onClick={onSave}
        >
          Saya Setuju
        </Button>
      ) : (
        <Button
          disabled
          color="primary"
          variant="contained"
          startIcon={<CircularProgress size={14} />}
          sx={{ minWidth: { xs: 0, lg: 340 } }}
        >
          Sedang menyetujui...
        </Button>
      )}
    </>
  );
};

export default TnCButtonAgree;
