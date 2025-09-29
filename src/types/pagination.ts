interface PaginationTotal {
  /**
   * total of data
   * @type {Number}
   */
  total: number;
}

interface TypePagination extends PaginationTotal {
  /**
   * limit of data
   * @type {Number}
   */
  limit: number;
  /**
   * rows of data
   * @type {Number}
   */
  rows: number;
  /**
   * current page
   * @type {Number}
   */
  page: number;
}

export type { PaginationTotal, TypePagination };
