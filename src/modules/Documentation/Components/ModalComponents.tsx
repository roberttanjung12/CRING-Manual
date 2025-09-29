'use client';

import React from 'react';
import {
  Typography,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Stack,
  Chip,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

/**
 * Comprehensive Modal Components Documentation
 *
 * Documentation for all modal components available in the CRING application
 * including OTPConfirmation, Detail, Confirmation, and DetailBasic modals
 * with their usage patterns and API references.
 */

const ModalComponentsDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Modal Components Documentation
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Complete reference for all modal components in the CRING application, including their props, usage patterns, and
        integration with forms and data display.
      </Alert>

      {/* OTPConfirmation Modal */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            ModalOTPConfirmation
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>OTP Verification modal</strong> with form integration, resend functionality, and security
            validation.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Required</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>isOpen</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Controls modal visibility</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>service</TableCell>
                  <TableCell>ServiceConfig</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>OTP service configuration</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>OTPLength</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>OTP code length (default: 6)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>string | ReactNode</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal title (default: 'Verifikasi Keamanan')</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>text</TableCell>
                  <TableCell>string | ReactNode</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal description text</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>resendAt</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Resend cooldown timestamp</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>buttonSubmitLabel</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Submit button text (default: 'Masuk')</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>buttonResendLabel</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Resend button text (default: 'Kirim Ulang OTP')</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onClose</TableCell>
                  <TableCell>() =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal close handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onResendAt</TableCell>
                  <TableCell>(timestamp: number) =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Resend cooldown handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onError</TableCell>
                  <TableCell>(error: Error) =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Error handling callback</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onSucess</TableCell>
                  <TableCell>(data: any) =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Success handling callback</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Form Integration" color="primary" size="small" />
            <Chip label="OTP Input Field" color="secondary" size="small" />
            <Chip label="Resend Cooldown" color="info" size="small" />
            <Chip label="Error Handling" color="error" size="small" />
            <Chip label="Custom Service" color="success" size="small" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic OTP confirmation modal
const [isOTPOpen, setIsOTPOpen] = useState(false);
const [resendAt, setResendAt] = useState(0);

<ModalOTPConfirmation
  isOpen={isOTPOpen}
  service={{
    submit: {
      endpoint: '/auth/verify-otp',
      method: 'POST'
    },
    resend: {
      endpoint: '/auth/resend-otp',
      method: 'POST'
    }
  }}
  OTPLength={6}
  resendAt={resendAt}
  onClose={() => setIsOTPOpen(false)}
  onResendAt={(timestamp) => setResendAt(timestamp)}
  onError={(error) => {
    toast.error('OTP verification failed');
  }}
  onSucess={(data) => {
    toast.success('Verification successful');
    // Redirect or update state
    router.push('/dashboard');
  }}
/>

// Custom title and description
<ModalOTPConfirmation
  isOpen={showOTP}
  service={otpService}
  title="Konfirmasi Transaksi"
  text={
    <>
      Untuk keamanan transaksi Anda, silakan masukkan kode OTP 
      yang telah dikirim ke nomor telepon yang terdaftar.
    </>
  }
  buttonSubmitLabel="Konfirmasi Transaksi"
  buttonResendLabel="Kirim Ulang Kode"
  onClose={() => setShowOTP(false)}
  onSucess={handleTransactionConfirmation}
/>`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            Service Configuration
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`interface ServiceConfig {
  submit: {
    endpoint: string;
    method: 'POST' | 'PUT';
    params?: object;
  };
  resend: {
    endpoint: string;
    method: 'POST' | 'PUT';
    params?: object;
  };
}

// Example service configuration
const otpService: ServiceConfig = {
  submit: {
    endpoint: '/auth/verify-otp',
    method: 'POST'
  },
  resend: {
    endpoint: '/auth/resend-otp', 
    method: 'POST',
    params: {
      type: 'sms' // or 'email'
    }
  }
};`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Modal Detail */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            ModalDetail
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Data display modal</strong> with flexible layouts, loading states, and sharing functionality.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Default</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>isShow</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Controls modal visibility</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isLoading</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Shows loading state with skeletons</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>mode</TableCell>
                  <TableCell>'style-1' | 'style-2'</TableCell>
                  <TableCell>'style-1'</TableCell>
                  <TableCell>Layout mode (single/dual column)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>'Detail'</TableCell>
                  <TableCell>Modal title</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>list</TableCell>
                  <TableCell>ModalDetailItem[]</TableCell>
                  <TableCell>[]</TableCell>
                  <TableCell>Array of detail items to display</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>share</TableCell>
                  <TableCell>ShareConfig</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Share functionality configuration</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>children</TableCell>
                  <TableCell>ReactNode</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Custom footer content</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onClose</TableCell>
                  <TableCell>() =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal close handler</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Layout Modes
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Style-1: Single Column" color="primary" size="small" />
            <Chip label="Style-2: Dual Column" color="secondary" size="small" />
            <Chip label="Flexible Grid" color="info" size="small" />
            <Chip label="Conditional Display" color="success" size="small" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic detail modal (style-1)
const detailItems = [
  {
    key: 'transactionId',
    label: 'Transaction ID',
    value: 'TXN-123456789',
    config: { type: 'text' }
  },
  {
    key: 'amount',
    label: 'Amount',
    value: 150000,
    config: { type: 'currency' }
  },
  {
    key: 'status',
    label: 'Status',
    value: <Chip label="Success" color="success" />,
    config: { type: 'custom' }
  },
  {
    key: 'date',
    label: 'Transaction Date',
    value: new Date(),
    config: { type: 'date' },
    grid: { lg: 12, xs: 12 } // Full width
  }
];

<ModalDetail
  isShow={isDetailOpen}
  isLoading={isLoading}
  title="Transaction Details"
  list={detailItems}
  onClose={() => setIsDetailOpen(false)}
/>

// Dual column layout (style-2)
const dualColumnItems = [
  {
    key: 'merchantName',
    label: 'Merchant Name',
    value: 'ACME Store',
    side: 'left',
    config: { type: 'text' }
  },
  {
    key: 'merchantId',
    label: 'Merchant ID', 
    value: 'MER-001',
    side: 'right',
    config: { type: 'text' }
  },
  {
    key: 'amount',
    label: 'Total Amount',
    value: 275000,
    side: 'left',
    config: { type: 'currency' }
  },
  {
    key: 'fee',
    label: 'Admin Fee',
    value: 2500,
    side: 'right',
    config: { type: 'currency' }
  }
];

<ModalDetail
  isShow={showDetails}
  mode="style-2"
  title="Payment Details"
  list={dualColumnItems}
  onClose={() => setShowDetails(false)}
/>

// With sharing functionality
<ModalDetail
  isShow={isOpen}
  title="Transaction Receipt"
  list={receiptItems}
  share={{
    filename: 'transaction-receipt',
    data: transactionData,
    formats: ['pdf', 'excel']
  }}
  onClose={() => setIsOpen(false)}
/>`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            ModalDetailItem Interface
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`interface ModalDetailItem {
  key: string;                    // Unique identifier
  label: string;                  // Display label
  value: any;                     // Value to display
  config: {
    type: 'text' | 'currency' | 'date' | 'custom' | 'link';
  };
  side?: 'left' | 'right';       // For style-2 layout
  grid?: {                       // Grid size configuration
    lg?: number;                 // Large screen grid (1-12)
    xs?: number;                 // Small screen grid (1-12)
  };
  isHide?: boolean;              // Conditionally hide item
  isHidden?: boolean;            // Alternative hide property
}

// Example with different data types
const detailItems: ModalDetailItem[] = [
  {
    key: 'description',
    label: 'Description',
    value: 'Payment for premium subscription',
    config: { type: 'text' }
  },
  {
    key: 'amount',
    label: 'Amount',
    value: 99000,
    config: { type: 'currency' }
  },
  {
    key: 'date',
    label: 'Created At',
    value: '2024-01-15T10:30:00Z',
    config: { type: 'date' }
  },
  {
    key: 'receipt',
    label: 'Receipt',
    value: '/downloads/receipt-123.pdf',
    config: { type: 'link' }
  },
  {
    key: 'status',
    label: 'Status',
    value: <StatusChip status="completed" />,
    config: { type: 'custom' }
  }
];`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Modal Confirmation */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            ModalConfirmation
          </Typography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Confirmation dialog</strong> for user actions with customizable buttons, icons, and loading states.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Default</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>isShow</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Controls modal visibility</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isLoading</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Shows loading spinner</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal title</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>children</TableCell>
                  <TableCell>ReactNode</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal content/description</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>icon</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>'/giff/question.gif'</TableCell>
                  <TableCell>Modal icon/image path</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>textButtonCancel</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>'Batal'</TableCell>
                  <TableCell>Cancel button text</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>textButtonSave</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>'Ya, Ubah'</TableCell>
                  <TableCell>Confirm button text</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>colorButtonCancel</TableCell>
                  <TableCell>MUI Color</TableCell>
                  <TableCell>'secondary'</TableCell>
                  <TableCell>Cancel button color</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>colorButtonSave</TableCell>
                  <TableCell>MUI Color</TableCell>
                  <TableCell>'primary'</TableCell>
                  <TableCell>Confirm button color</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isHideButtonCancel</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Hide cancel button</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isHideButtonSave</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Hide confirm button</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onCancel</TableCell>
                  <TableCell>() =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Cancel button handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onSave</TableCell>
                  <TableCell>(event: MouseEvent) =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Confirm button handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onClose</TableCell>
                  <TableCell>() =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Modal close handler</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic confirmation dialog
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);

<ModalConfirmation
  isShow={showDeleteConfirm}
  isLoading={isDeleting}
  title="Konfirmasi Hapus Data"
  icon="/giff/warning.gif"
  textButtonCancel="Batal"
  textButtonSave="Ya, Hapus"
  colorButtonSave="error"
  onCancel={() => setShowDeleteConfirm(false)}
  onSave={async () => {
    setIsDeleting(true);
    try {
      await deleteItem(selectedId);
      toast.success('Data berhasil dihapus');
      setShowDeleteConfirm(false);
      refetch();
    } catch (error) {
      toast.error('Gagal menghapus data');
    } finally {
      setIsDeleting(false);
    }
  }}
  onClose={() => setShowDeleteConfirm(false)}
>
  <div>
    Apakah Anda yakin ingin menghapus data ini?<br />
    Tindakan ini tidak dapat dibatalkan.
  </div>
</ModalConfirmation>

// Success notification modal
<ModalConfirmation
  isShow={showSuccess}
  title="Berhasil!"
  icon="/giff/berhasil.gif"
  isHideButtonCancel={true}
  textButtonSave="Tutup"
  onSave={() => setShowSuccess(false)}
  onClose={() => setShowSuccess(false)}
>
  Data telah berhasil disimpan ke sistem.
</ModalConfirmation>

// Custom action confirmation
<ModalConfirmation
  isShow={showActivateConfirm}
  title="Konfirmasi Aktivasi Akun"
  textButtonCancel="Tidak"
  textButtonSave="Ya, Aktifkan"
  colorButtonSave="success"
  onCancel={() => setShowActivateConfirm(false)}
  onSave={async () => {
    await activateAccount(userId);
    setShowActivateConfirm(false);
  }}
>
  <div>
    Mengaktifkan akun akan memberikan akses penuh kepada pengguna.
    Lanjutkan proses aktivasi?
  </div>
</ModalConfirmation>

// Information only modal
<ModalConfirmation
  isShow={showInfo}
  title="Informasi Penting"
  icon="/giff/info.gif"
  isHideButtonCancel={true}
  textButtonSave="Mengerti"
  onSave={() => setShowInfo(false)}
>
  <div>
    Sistem akan melakukan maintenance pada tanggal 15 Januari 2024
    mulai pukul 02:00 - 06:00 WIB.
  </div>
</ModalConfirmation>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>📋 Modal Component Best Practices</AlertTitle>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          <li>Always provide appropriate loading states for better UX</li>
          <li>Use semantic icons that match the modal purpose (warning, success, question)</li>
          <li>Implement proper error handling in confirmation actions</li>
          <li>Keep modal content concise and focused</li>
          <li>Provide clear and descriptive button labels</li>
          <li>Use appropriate color schemes for action severity</li>
          <li>Ensure keyboard navigation and accessibility compliance</li>
          <li>Handle modal close events consistently across all modals</li>
        </Box>
      </Alert>

      <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
        For more specific examples and advanced usage patterns, refer to the individual modal source files in
        <code> src/components/Modal/</code>
      </Typography>
    </Box>
  );
};

export default ModalComponentsDocumentation;
