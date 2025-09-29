'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import onCopyClipboard from '@/utility/cliptoboard';
import type { TypeModalDetailShare } from '../type';

/**
 * A component that's designed for show share the modal.
 *
 * @returns {React.JSX}
 */
const ModalDetailShare = ({ share }: TypeModalDetailShare): Readonly<ReactNode> => {
  const getUrlOrigin = new URL(window.location.href).origin;

  return (
    <Box data-testid="ModalDetailShare">
      {share?.copy && (
        <Button
          variant="text"
          title="Copy to Clipboard"
          onClick={() => onCopyClipboard(`${getUrlOrigin}${share?.copy?.path}`)}
          sx={{ minWidth: 0 }}
        >
          <Image priority alt="Share with Telegram" src="/share/share-copy.png" height={16} width={16} />
        </Button>
      )}
      {share?.telegram && (
        <Button
          variant="text"
          title="Share with Telegram"
          target="_blank"
          href={`https://t.me/share/url?url=${encodeURIComponent(`${getUrlOrigin}${share.telegram.path}`)}&text=${encodeURIComponent(share.telegram.title)}`}
          sx={{ minWidth: 0 }}
        >
          <Image priority alt="Share with Telegram" src="/share/share-telegram.png" height={18} width={18} />
        </Button>
      )}
      {share?.teams && (
        <Button
          variant="text"
          title="Share with Teams"
          target="_blank"
          href={`https://teams.microsoft.com/share?href=${encodeURIComponent(`${getUrlOrigin}${share.teams.path}`)}`}
          sx={{ minWidth: 0 }}
        >
          <Image priority alt="Share with Telegram" src="/share/share-teams.png" height={18} width={18} />
        </Button>
      )}
      {share?.whatsapp && (
        <Button
          variant="text"
          title="Share with WhatsApp"
          target="_blank"
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(share.whatsapp.title)}%20${encodeURIComponent(`${getUrlOrigin}${share.whatsapp.path}`)}`}
          sx={{ minWidth: 0 }}
        >
          <Image priority alt="Share with Telegram" src="/share/share-whatsapp.png" height={18} width={18} />
        </Button>
      )}
    </Box>
  );
};

export default ModalDetailShare;
