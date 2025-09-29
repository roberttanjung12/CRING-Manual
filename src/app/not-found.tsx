'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';

const NotFound = () => {
  const { replace } = useRouter();

  return (
    <>
      <Typography component="header" className="not-found--header">
        <Link href="/">
          <img alt="CRING!" src="/logo-2/CRING-LOGO-(COLOR).png" />
        </Link>
      </Typography>
      <Box
        data-testid="Error404"
        sx={{
          py: { xl: 8 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Box sx={{ color: '#091B4D' }}>
          <Box display="flex" id="box:image" justifyContent="center">
            <Box position="relative" sx={{ width: { md: '707px' } }}>
              <div className="not-found--bg">
                <img alt="Not Found" src="/images/not-found/not-found.svg" />
              </div>
              <div className="not-found--people">
                <img alt="Not Found" src="/images/not-found/not-found.gif" />
              </div>
            </Box>
          </Box>
          <Box id="box:text" mt={4}>
            <Box id="text:title" sx={{ fontSize: { md: '48px', sm: '24px' }, fontWeight: '900' }}>
              Ooppss... Halaman Tidak Ditemukan
            </Box>
            <Box id="text:desc" mt={2} sx={{ fontSize: { md: '20px', sm: '16px' } }}>
              Halaman tujuan kamu mungkin sudah dihapus atau tidak ada, silahkan kembali ke halaman utama.
            </Box>
          </Box>
          <Box display="flex" id="box:button" justifyContent="center" mt={5}>
            <Box id="button:back">
              <Button color="primary" variant="contained" onClick={() => replace('/')}>
                Kembali ke halaman sebelumnya
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
