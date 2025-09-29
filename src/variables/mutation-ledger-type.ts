import type { Option } from '@/types/option';

type MutationLedgerTypeValue =
  | 'TOPUP'
  | 'LOAN_DISBURSEMENT'
  | 'REPAYMENT'
  | 'WITHDRAWAL'
  | 'FEE'
  | 'RDL_DISBURSE_TO_ESCROW';

type MutationLedgerTypeText = 'Top-up' | 'Loan Disbursement' | 'Repayment' | 'Withdrawal' | 'Fee' | 'Rdl Disbursement';

const varMutationLedgerType: Option<MutationLedgerTypeValue, MutationLedgerTypeText>[] = [
  { value: 'TOPUP', text: 'Top-up' },
  { value: 'LOAN_DISBURSEMENT', text: 'Loan Disbursement' },
  { value: 'REPAYMENT', text: 'Repayment' },
  { value: 'WITHDRAWAL', text: 'Withdrawal' },
  { value: 'FEE', text: 'Fee' },
  { value: 'RDL_DISBURSE_TO_ESCROW', text: 'Rdl Disbursement' }
];

export type { MutationLedgerTypeValue, MutationLedgerTypeText };

export default varMutationLedgerType;
