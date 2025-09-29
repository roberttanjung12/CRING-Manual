type BulkProgressStatusStatic = '' | 'form' | 'uploading' | 'failed' | 'processing';

interface BulkProgressIsOpen {
  isOpen: boolean;
}

interface BulkProgressJobId {
  jobId: string;
}

interface BulkProgressStatus {
  status: BulkProgressStatusStatic;
}

interface BulkProgressUrlCheck {
  urlCheck: string;
}

interface BulkProgressUrlSkip {
  urlSkip: string;
}

interface BulkProgressUrlDetail {
  urlDetail: string;
}

interface BulkProgressError {
  error: string;
}

interface BulkProgressSuccessMessage {
  successMessage?: string;
}

interface BulkProgressOnStatus {
  onStatus: (arg: BulkProgressStatusStatic) => void;
}

interface BulkProgressProps
  extends BulkProgressIsOpen,
    BulkProgressJobId,
    BulkProgressStatus,
    BulkProgressUrlCheck,
    BulkProgressUrlSkip,
    BulkProgressUrlDetail,
    BulkProgressError,
    BulkProgressSuccessMessage,
    BulkProgressOnStatus {}

interface UseBulkProgress extends BulkProgressStatus, BulkProgressOnStatus {}

export type {
  BulkProgressIsOpen,
  BulkProgressStatusStatic,
  BulkProgressStatus,
  BulkProgressJobId,
  BulkProgressOnStatus,
  BulkProgressUrlCheck,
  BulkProgressUrlSkip,
  BulkProgressUrlDetail,
  BulkProgressError,
  BulkProgressSuccessMessage,
  BulkProgressProps,
  UseBulkProgress
};
