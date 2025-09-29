interface Params {
  limit: number;
  offset: number;
}

interface PayloadParams {
  [key: string]: any;
  limit?: number;
  page?: number;
}

interface PayloadV2Params {
  limit?: number;
  page?: number;
}

export type { Params, PayloadParams, PayloadV2Params };
