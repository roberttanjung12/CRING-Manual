/**
 * Maps transaction status strings to their corresponding color identifiers.
 *
 * - 'gagal' maps to 'secondary' (typically used for failed transactions).
 * - 'berhasil' maps to 'success' (typically used for successful transactions).
 *
 * The color identifiers are used for UI status indication.
 */
export const RECON_STATUS_COLOR: Record<string, 'warning' | 'secondary' | 'success'> = {
  gagal: 'secondary',
  berhasil: 'success'
};
