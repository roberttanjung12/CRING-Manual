import { onDownloadProductQrBni, onDownloadProductQrBtn } from '@/services/products';

const varQr = [
  {
    idProduct: 'qrbnist',
    bank: { code: '', name: 'BANK BNI' },
    endpoint: ({ merchantId = '', mimeType = 'image/png', ext = 'png', params }) =>
      onDownloadProductQrBni(merchantId, { mimeType, ext, params }),
    pathId: { field: 'merchantId', set: 'merchantId' }
  },
  {
    idProduct: 'qrdkist',
    bank: { code: '', name: 'BANK DKI' },
    endpoint: ({ merchantId = '', mimeType = 'image/png', params }) =>
      onDownloadProductQrBtn({
        mimeType,
        params,
        data: { merchantId, acquirerCode: '111', type: 'S', amount: { currency: 'IDR', value: '00.00' } }
      }),
    pathId: { field: 'merchantId', set: 'merchantId' }
  },
  {
    idProduct: 'qrbtnst',
    bank: { code: '', name: 'BANK BTN' },
    endpoint: ({ merchantId = '', mimeType = 'image/png', params }) =>
      onDownloadProductQrBtn({
        mimeType,
        params,
        data: { merchantId, acquirerCode: '200', type: 'S', amount: { currency: 'IDR', value: '00.00' } }
      }),
    pathId: { field: 'merchantId', set: 'merchantId' }
  },
  {
    idProduct: 'speedcashst',
    bank: { code: '', name: 'SPEEDCASH' },
    endpoint: ({ merchantId = '', mimeType = 'image/png', params }) =>
      onDownloadProductQrBtn({
        mimeType,
        params,
        data: { merchantId, acquirerCode: '0001', type: 'S', amount: { currency: 'IDR', value: '00.00' } }
      }),
    pathId: { field: 'merchantId', set: 'merchantId' }
  }
];

export default varQr;
